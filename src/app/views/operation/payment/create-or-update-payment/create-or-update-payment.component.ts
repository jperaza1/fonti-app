import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentDetailDto, PaymentDto } from '../dtos/payment.dto';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../invoice/invoice.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { PaymentService } from '../payment.service';
import { BankAccountService } from '../../bank-account/bank-account.service';
import { User } from '../../../../../_models/user';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { CafeteriaDto } from '../../../data/cafeteria/dtos/cafeteria-dto';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { PurchaseOrderInvoiceDto } from '../../invoice/dtos/purchase-order-invoice.dto';
import { PendingInvoiceFilterDto } from '../../invoice/dtos/pending-invoice-filter.dto';

@Component({
  selector: 'app-create-or-update-payment',
  templateUrl: './create-or-update-payment.component.html',
  styleUrls: ['./create-or-update-payment.component.css']
})
export class CreateOrUpdatePaymentComponent extends AppComponentBase implements OnInit {
  filterModel: PendingInvoiceFilterDto = new PendingInvoiceFilterDto();
  Model: PaymentDto = new PaymentDto();
  errors: any = {};
  title: string = 'Nuevo Pago';


  DxDataSourceCafeteria: any = {};
  DxDataSourceInvoice: any = {};
  DxDataSourceBankAccount: any = {};

  routeSub: Subscription;
  id: number;

  currentUser: User;

  updatePaymentFlag: boolean = false;

  constructor(
    private _invoiceService: InvoiceService,
    private _paymentService: PaymentService,
    private _bankAccountService: BankAccountService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService) { 
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.currentUser = this._authenticationService.currentUserValue;
    this.updatePaymentFlag = this._authenticationService.IsInRole('OPERATION.PAYMENT.UPDATE');
  }

  async ngOnInit() {
    await this.init();
    if (this.id) {
      await this.getPayment();
    } else {
      this.Model = new PaymentDto();
      this.Model.paymentDate = new Date();
      await this.getBankAccounts();
      this.Model.invoiceCount = 0;
      this.Model.details = [];
    }
    this.routeSub.unsubscribe();
  }

  async getPayment() {
    let result = await this._paymentService.getById(this.id);
    await this.getBankAccountsByCafeteriaId(result.cafeteriaId);
    this.Model = result;
    this.title = 'Pago ' + this.Model.reference;
  }

  async onItemClickCafeteria(item: CafeteriaDto) {
    this.Model.bankAccountId = 0;
    await this.getBankAccountsByCafeteriaId(item.id);
  }

  async getBankAccountsByCafeteriaId(cafeteriaId: number) {
    let result = await this._bankAccountService.getByCafeteriaId(cafeteriaId);
    this.DxDataSourceBankAccount = this.getDataSourceDx(result);
  }

  async init() {
    await this.getBankAccounts();
  }

  async getBankAccounts() {
    let result = await this._bankAccountService.getActives();
    this.DxDataSourceBankAccount = this.getDataSourceDx(result);
  }

  /** Suma de saldos (balance) de las filas seleccionadas en la grilla de alta */
  selectedInvoicesTotal = 0;
  selectedInvoicesCount = 0;

  /** Selección del modal para sumar facturas a un pago ya creado */
  modalSelectedInvoices: PurchaseOrderInvoiceDto[] = [];
  modalSelectedCount = 0;
  modalSelectedTotal = 0;
  addInvoicesFiltered = false;

  @ViewChild('addInvoicesModal') addInvoicesModal: ModalWithOptionButtonsComponent;

  async getPendingInvoices() {
    const result = await this._invoiceService.getPendingPaid(this.filterModel);
    this.DxDataSourceInvoice = result;
    this.resetInvoiceSelectionTotals();
  }

  @ViewChild('invoiceGrid') invoiceGrid: DxDataGridComponent;

  private resetInvoiceSelectionTotals(): void {
    this.selectedInvoicesTotal = 0;
    this.selectedInvoicesCount = 0;
  }

  onInvoiceSelectionChanged(): void {
    const rows = (this.invoiceGrid?.instance?.getSelectedRowsData() ?? []) as Array<{ balance?: number }>;
    this.selectedInvoicesCount = rows.length;
    this.selectedInvoicesTotal = rows.reduce((sum, row) => sum + (Number(row.balance) || 0), 0);
  }

  async createPayment(): Promise<void> {
    if (!this.invoiceGrid?.instance) {
      return;
    }
    const selectedRows = this.invoiceGrid.instance.getSelectedRowsData();
    if (!selectedRows?.length) {
      return;
    }

    this.Model.invoiceCount = selectedRows.length;
    this.Model.details = selectedRows.map(row => {
      return {
        invoiceId: row.id,
        invoiceNumber: row.invoiceNumber,
        amount: row.balance,
        remainingDays: row.remainingDays,
        vendorName: row.vendorName,
        invoiceDate: row.invoiceDate
      } as PaymentDetailDto;
    });

    this.Model.amount = this.Model.details.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

    var result = await this._paymentService.create(this.Model);
    if (result.success) {
      this.success(result.title, result.messageResponse);
      this._router.navigate(['/payment/update/' + result.data]);
    } else {
      this.errors = result.errors;
    }
  }

  async generateFilePayment(): Promise<void> {
    try {
      await this._paymentService.generateFilePayment(this.id);
      this.success('Éxito', 'Archivo de pago descargado correctamente.');
      await this.getPayment();
    } catch {
      this.error('Error', 'No se pudo generar o descargar el archivo de pago.');
    }
  }

  async viewReceipt(data: PaymentDetailDto): Promise<void> {
    let file = await this._paymentService.getPaymentReceipt(this.id, data.vendorId);
    this.openPdfInNewTab(file, `Recibo de pago ${this.Model.reference}.pdf`);
  }

  async finishPayment(): Promise<void> {
    var result = await this._paymentService.finishPayment(this.id, this.Model);
    if (result.success) {
      this.success(result.title, result.messageResponse);
      await this.getPayment();
    } else {
      this.error(result.title, result.messageResponse);
    }
  }

  async updatePayment(): Promise<void> {
    var result = await this._paymentService.update(this.id, this.Model);
    if (result.success) {
      this.success(result.title, result.messageResponse);
      await this.getPayment();
    } else {
      this.error(result.title, result.messageResponse);
    }
  }

  closeTab(): void {
    try {
      window.close();
    } catch (error) {
      console.log('No se pudo cerrar la pestaña automáticamente:', error);
      // Alternativa: mostrar un mensaje al usuario para que cierre manualmente
      this.success('Información', 'Por favor, cierre esta pestaña manualmente.');
    }
  }

  openInvoice(data: any): void {
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/invoice', 'view', data.invoiceId])
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openInvoicev2(data: any): void {
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/invoice', 'view', data.id])
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  removeInvoice(data: any): void {
    this.Model.details = this.Model.details.filter(x => x !== data);
    this.syncPaymentTotals();
  }

  openAddInvoicesModal(): void {
    this.DxDataSourceInvoice = [];
    this.addInvoicesFiltered = false;
    this.clearModalInvoiceSelection();
    this.addInvoicesModal.show();
  }

  async getPendingInvoicesForAdd(): Promise<void> {
    const result = await this._invoiceService.getPendingPaid(this.filterModel);
    const existingIds = new Set((this.Model.details || []).map(detail => detail.invoiceId));
    this.DxDataSourceInvoice = (result || []).filter(row => !existingIds.has(row.id));
    this.addInvoicesFiltered = true;
    this.clearModalInvoiceSelection();
  }

  onAddInvoiceSelectionChanged(event: { selectedRowsData?: PurchaseOrderInvoiceDto[] }): void {
    const rows = event?.selectedRowsData ?? [];
    this.modalSelectedInvoices = rows;
    this.modalSelectedCount = rows.length;
    this.modalSelectedTotal = rows.reduce((sum, row) => sum + (Number(row.balance) || 0), 0);
  }

  onAddInvoicesGridReady(event: { component?: { updateDimensions: () => void } }): void {
    setTimeout(() => event?.component?.updateDimensions(), 0);
  }

  addSelectedInvoices(): void {
    if (!this.modalSelectedInvoices.length) {
      return;
    }

    const existingIds = new Set((this.Model.details || []).map(detail => detail.invoiceId));
    const details = this.modalSelectedInvoices
      .filter(row => !existingIds.has(row.id))
      .map(row => this.mapPendingInvoiceToDetail(row));

    if (!details.length) {
      this.error('Aviso', 'Las facturas seleccionadas ya están en el pago.');
      return;
    }

    this.Model.details = [...(this.Model.details || []), ...details];
    this.syncPaymentTotals();
    this.addInvoicesModal.close();
    this.success(
      'Facturas agregadas',
      'Se actualizaron la cantidad y el total. Guarde el pago para conservar los cambios.'
    );
  }

  private mapPendingInvoiceToDetail(row: PurchaseOrderInvoiceDto): PaymentDetailDto {
    return {
      invoiceId: row.id,
      invoiceNumber: row.invoiceNumber,
      amount: row.balance,
      remainingDays: row.remainingDays,
      vendorName: row.vendorName || row.vendorName,
      vendorId: row.vendorId,
      invoiceDate: row.invoiceDate,
      bankName: row.bankName,
      bankAccount: row.bankAccount,
      invoiceNote: row.description,
      description: ''
    } as PaymentDetailDto;
  }

  private syncPaymentTotals(): void {
    const details = this.Model.details || [];
    this.Model.amount = details.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
    this.Model.invoiceCount = details.length;
  }

  private clearModalInvoiceSelection(): void {
    this.modalSelectedInvoices = [];
    this.modalSelectedCount = 0;
    this.modalSelectedTotal = 0;
  }

}
