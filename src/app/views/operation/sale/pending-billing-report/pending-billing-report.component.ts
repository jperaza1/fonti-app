import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleDto } from '../dtos/sale-dto';
import { FilterSaleDto } from '../dtos/filter-sale-dto';
import { AppComponentBase } from '../../../../AppComponentBase';
import { SaleService } from '../sale.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { DefinitionValuesDto } from '../../../../../_models/definitions/definition-values-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { GeneratePendingBillingCustomerDto, GeneratePendingBillingDto } from '../dtos/generate-pending-billing-dto';
import { InvoiceSaleService } from '../../invoice-sale/invoice-sale.service';

type BillingKind = 'none' | 'cash' | 'credit' | 'mixed';

interface BillingCustomerGroup {
  customerId: number;
  customerName: string;
  salesCount: number;
  total: number;
  saleIds: number[];
  invoiceDate: Date;
}

@Component({
  selector: 'app-pending-billing-report',
  templateUrl: './pending-billing-report.component.html',
  styleUrls: ['./pending-billing-report.component.css']
})
export class PendingBillingReportComponent extends AppComponentBase implements OnInit {

  DataSource: SaleDto[] = [];
  columns: any[] = [];
  title: string = "Reporte de Ventas Pendientes de Facturación";
  filterModel: FilterSaleDto = new FilterSaleDto();
  totalAmountToBill: number = 0;
  selectedSalesCount: number = 0;
  selectedSales: SaleDto[] = [];
  selectionKind: BillingKind = 'none';

  DxDataSourceSaleType: any = {};
  saleTypes: DefinitionValuesDto[] = [];
  cashSaleTypeValue = 1;
  creditSaleTypeValue = 2;

  billingMode: 'cash' | 'credit' = 'cash';
  invoiceModalTitle = 'Generar factura';
  invoiceOptionButtons: OptionButton[] = [];
  cashInvoiceDate: Date = null;
  customerGroups: BillingCustomerGroup[] = [];

  @ViewChild('GridView') GridView: DxDataGridComponent;
  @ViewChild('invoiceModal') invoiceModal: ModalWithOptionButtonsComponent;

  private generateButton: OptionButton;

  constructor(
    private _saleService: SaleService, 
    private _enumDefinitionsService: EnumDefinitionsService,
    private _invoiceSaleService: InvoiceSaleService
  ) {
    super();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "route",
        caption: "Ruta",
      },
      {
        dataField: "customerName",
        caption: "Cliente",
      },
      {
        dataField: "saleDate",
        caption: "Fecha de Venta",
        cellTemplate: "dateTemplate",
      },
      {
        dataField: "saleTypeName",
        caption: "Tipo de Venta",
      },
      {
        dataField: "amount",
        caption: "Monto",
        width: "180",
        alignment: "right",
        cellTemplate: "amountTemplate",
      },
    ]
  }

  async ngOnInit() {
    this.initializeColumns();
    await this.initializeView();
    await this.getAll();
  }

  async initializeView() {
    await this.getSaleTypes();
  }

  async getSaleTypes() {
    const response = await this._enumDefinitionsService.getSaleType();
    this.saleTypes = response || [];
    this.captureSaleTypeValues();
    this.DxDataSourceSaleType = this.getDataSourceDx(response);
  }

  async getAll() {
    this.clearSelectionState();
    const response = await this._saleService.getPendingBillingReport(this.filterModel);
    this.DataSource = response;
    if (this.GridView?.instance) {
      this.GridView.instance.clearSelection();
    }
  }

  onSelectionChanged(event: any) {
    const selectedRows = (event?.selectedRowsData || []) as SaleDto[];
    this.selectedSales = selectedRows;
    this.selectedSalesCount = selectedRows.length;
    this.totalAmountToBill = selectedRows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
    this.selectionKind = this.resolveSelectionKind(selectedRows);
  }

  openGenerateModal() {
    if (this.selectionKind !== 'cash' && this.selectionKind !== 'credit') {
      return;
    }

    this.billingMode = this.selectionKind;
    this.cashInvoiceDate = null;
    this.customerGroups = this.billingMode === 'credit' ? this.buildCustomerGroups() : [];
    this.invoiceModalTitle = this.billingMode === 'cash'
      ? 'Generar factura al contado'
      : 'Generar factura al crédito';
    this.setInvoiceButtons();
    this.invoiceModal.size = this.billingMode === 'credit' ? 'xl' : 'lg';
    this.invoiceModal.show();
  }

  onCashDateChanged(event: any) {
    this.cashInvoiceDate = event?.value ?? null;
    this.refreshGenerateState();
  }

  onCustomerDateChanged(group: BillingCustomerGroup, event: any) {
    group.invoiceDate = event?.value ?? null;
    this.refreshGenerateState();
  }

  onInvoiceOption(option: OptionButton) {
    if (option.disabled) {
      return;
    }

    if (option.btnName === 'generate') {
      this.generateInvoices();
      return;
    }

    if (option.btnName === 'close') {
      this.closeInvoiceModal();
    }
  }

  closeInvoiceModal() {
    this.invoiceModal.close();
  }

  async generateInvoices() {
    if (!this.canGenerate) {
      this.warning(
        'Fecha requerida',
        this.billingMode === 'cash'
          ? 'Selecciona la fecha de la factura.'
          : 'Indica la fecha de factura de cada cliente.'
      );
      return;
    }

    const payload = new GeneratePendingBillingDto();
    payload.saleIds = this.selectedSales.map(sale => sale.id);

    if (this.billingMode === 'cash') {
      payload.saleType = this.cashSaleTypeValue;
      payload.invoiceDate = this.cashInvoiceDate;
      payload.customers = [];
    } else {
      payload.saleType = this.creditSaleTypeValue;
      payload.invoiceDate = null;
      payload.customers = this.customerGroups.map(group => {
        const customer = new GeneratePendingBillingCustomerDto();
        customer.customerId = group.customerId;
        customer.customerName = group.customerName;
        customer.invoiceDate = group.invoiceDate;
        customer.saleIds = group.saleIds;
        return customer;
      });
    }

    console.log(payload);

    try {
      const result = await this._invoiceSaleService.generatePendingBilling(payload);
      if (result?.success) {
        this.success(result.title || 'Factura', result.messageResponse || 'La factura se generó correctamente.');
        this.closeInvoiceModal();
        await this.getAll();
      } else {
        this.error(result?.title || 'No se pudo generar', result?.messageResponse || 'No se pudo generar la factura.');
      }
    } catch {
      this.error('No se pudo generar', 'No fue posible generar la factura. Intenta de nuevo.');
    }
  }

  private get canGenerate(): boolean {
    if (this.billingMode === 'cash') {
      return this.hasDate(this.cashInvoiceDate);
    }

    return this.customerGroups.length > 0 && this.customerGroups.every(group => this.hasDate(group.invoiceDate));
  }

  private setInvoiceButtons() {
    this.generateButton = new OptionButton('generate', 'Generar', 'btn btn-success pull-right', 'fa fa-check');
    this.generateButton.disabled = !this.canGenerate;
    this.invoiceOptionButtons = [
      new OptionButton('close', 'Cerrar', 'btn btn-danger pull-right', 'fa fa-times'),
      this.generateButton,
    ];
  }

  private refreshGenerateState() {
    if (!this.generateButton) {
      return;
    }

    this.generateButton.disabled = !this.canGenerate;
  }

  private buildCustomerGroups(): BillingCustomerGroup[] {
    const groups = new Map<string, BillingCustomerGroup>();

    for (const sale of this.selectedSales) {
      const customerName = this.customerLabel(sale);
      const customerId = Number(sale.customerId) || 0;
      const key = `${customerId}|${customerName}`;
      const current = groups.get(key);

      if (!current) {
        groups.set(key, {
          customerId,
          customerName,
          salesCount: 1,
          total: Number(sale.amount) || 0,
          saleIds: [sale.id],
          invoiceDate: null,
        });
        continue;
      }

      current.salesCount += 1;
      current.total += Number(sale.amount) || 0;
      current.saleIds.push(sale.id);
    }

    return Array.from(groups.values()).sort((a, b) => a.customerName.localeCompare(b.customerName));
  }

  private resolveSelectionKind(sales: SaleDto[]): BillingKind {
    if (!sales.length) {
      return 'none';
    }

    const kinds = new Set(sales.map(sale => this.resolveSaleKind(sale)));
    kinds.delete('unknown');

    if (kinds.size === 1) {
      return kinds.has('cash') ? 'cash' : 'credit';
    }

    if (kinds.size > 1) {
      return 'mixed';
    }

    const filterKind = this.kindFromType(this.filterModel.saleType, '');
    return filterKind === 'unknown' ? 'none' : filterKind;
  }

  private resolveSaleKind(sale: SaleDto): 'cash' | 'credit' | 'unknown' {
    const fromRow = this.kindFromType(sale.saleType, sale.saleTypeName);
    if (fromRow !== 'unknown') {
      return fromRow;
    }

    return this.kindFromType(this.filterModel.saleType, '');
  }

  private kindFromType(saleType: number, saleTypeName: string): 'cash' | 'credit' | 'unknown' {
    const name = this.normalize(saleTypeName);
    if (name.includes('contado')) {
      return 'cash';
    }
    if (name.includes('credit')) {
      return 'credit';
    }

    const match = this.saleTypes.find(item => String(item.value) === String(saleType));
    const enumText = this.normalize(match?.text);
    if (enumText.includes('contado')) {
      return 'cash';
    }
    if (enumText.includes('credit')) {
      return 'credit';
    }

    if (Number(saleType) === Number(this.cashSaleTypeValue)) {
      return 'cash';
    }
    if (Number(saleType) === Number(this.creditSaleTypeValue)) {
      return 'credit';
    }

    return 'unknown';
  }

  private captureSaleTypeValues() {
    for (const item of this.saleTypes) {
      const text = this.normalize(item.text);
      if (text.includes('contado')) {
        this.cashSaleTypeValue = item.value;
      }
      if (text.includes('credit')) {
        this.creditSaleTypeValue = item.value;
      }
    }
  }

  private customerLabel(sale: SaleDto): string {
    return sale.customerName || sale.customer || 'Sin cliente';
  }

  private hasDate(value: Date): boolean {
    if (value == null) {
      return false;
    }

    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  private normalize(value: string): string {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  private clearSelectionState() {
    this.selectedSales = [];
    this.selectedSalesCount = 0;
    this.totalAmountToBill = 0;
    this.selectionKind = 'none';
  }
}
