import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { InvoiceSaleDto } from '../dto/invoice-sale.dto';
import { FilterInvoiceSaleDto } from '../dto/filter-invoice-sale.dto';
import { CustomerService } from '../../../data/customer/customer.service';
import { InvoiceSaleService } from '../invoice-sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-invoice-sale',
  templateUrl: './list-invoice-sale.component.html',
  styleUrls: ['./list-invoice-sale.component.css']
})
export class ListInvoiceSaleComponent extends AppComponentBase implements OnInit {

  DataSource: InvoiceSaleDto[] = [];
  columns: any[] = [];
  title: string = "Facturas de Ventas";
  filterModel: FilterInvoiceSaleDto = new FilterInvoiceSaleDto();
  showAllInvoices: boolean = false;

  DxDataSourceCustomer : any = {};;

  constructor(
    private _customerService: CustomerService,
    private _invoiceSaleService: InvoiceSaleService,
    private _router: Router
  ) {
    super();
  }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    this.initializeColumns();
    await this.getCustomers();
    await this.search();
  }

  async getCustomers() {
    const result = await this._customerService.getAllActive();
    result.unshift({ id: 0, name: "Todos" } as any);
    this.DxDataSourceCustomer = this.getDataSourceDx(result);
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'invoiceNumber',
        caption: 'Número de Factura',
      },
      {
        dataField: 'customer',
        caption: 'Cliente'
      },
      {
        dataField: 'invoiceDate',
        caption: 'Fecha de Factura',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'subTotal',
        caption: 'Subtotal',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'taxAmount',
        caption: 'Impuesto',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'balance',
        caption: 'Saldo',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'paymentStatusName',
        caption: 'Estado de Pago',
        cellTemplate: 'paymentStatusTemplate'
      },
      {
        dataField: 'paymentTypeName',
        caption: 'Tipo de Pago',
        cellTemplate: 'paymentTypeTemplate'
      }
    ];
  }

  async search() {
    const result = await this._invoiceSaleService.getAll(this.filterModel);
    this.DataSource = result;
  }

  async showInvoiceFile(invoice: InvoiceSaleDto) {
    let file = await this._invoiceSaleService.getPaymentReceipt(invoice.id);
    this.openPdfInNewTab(file, `Factura ${invoice.invoiceNumber}.pdf`);
  }

  async viewInvoice(invoice: InvoiceSaleDto) {
    window.open(`/invoice-sale/view/${invoice.id}`, '_blank');
  }

  async payInvoice(invoice: InvoiceSaleDto) {
    const result = await this._invoiceSaleService.markPaid(invoice.id);
    if(result.success) {
      this.success(result.title, result.messageResponse);
      this.search();
    } else {
      this.error(result.title, result.messageResponse);
    }
  }

}
