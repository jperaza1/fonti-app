import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CreateOrUpdatePoInvoicesComponent } from '../create-or-update-po-invoices/create-or-update-po-invoices.component';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrderInvoiceDto } from '../../invoice/dtos/purchase-order-invoice.dto';
import { InvoiceService } from '../../invoice/invoice.service';

@Component({
  selector: 'app-list-purchase-order-invoices',
  templateUrl: './list-purchase-order-invoices.component.html',
  styleUrls: ['./list-purchase-order-invoices.component.css']
})
export class ListPurchaseOrderInvoicesComponent extends AppComponentBase implements OnInit {

  @Input() purchaseOrderId: number;
  @Input() orderStatus: number;
  @Input() vendorId: number;
  @Input() typeInoice: string;
  columns: any[] = [];
  DataSource: PurchaseOrderInvoiceDto[] = [];

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdatePoInvoicesComponent;

  constructor(private _invoiceService: InvoiceService) { 
    super();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'invoiceNumber',
        caption: 'Número de Factura',
        cellTemplate: 'invoiceNumberTemplate'
      },
      {
        dataField: 'paymentTypeName',
        caption: 'Tipo de Pago'
      },
      {
        dataField: 'invoiceDate',
        caption: 'Fecha de Factura',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'dueDate',
        caption: 'Fecha de Vencimiento',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
    ];
  }

  async ngOnInit() {
    await this.getAll();
    this.initializeColumns();
    
  }

  async getAll() {
    this.DataSource = await this._invoiceService.getByPurchaseOrder(this.purchaseOrderId);
  }

  addInvoice() {
    this.createOrUpdateModal.showAdd(this.purchaseOrderId, this.orderStatus, this.vendorId, this.typeInoice);
  }

  update(data: PurchaseOrderInvoiceDto) {
    this.createOrUpdateModal.showUpdate(data.id, this.orderStatus, this.vendorId);
  }

  async deleteInvoice(data: PurchaseOrderInvoiceDto) {
    let confirmResult = await this.confirm();
    if (confirmResult.value) {
      let disableResponse = await this._invoiceService.delete(data.id);
      if (disableResponse.success) {
        await this.getAll();
      }
    }
  }

  formatInvoiceNumber(value: string | number): string {
    if (value == null) {
      return '';
    }

    // Convierte el valor a string
    let strValue = value.toString();

    // Asegúrate de que el valor tenga al menos 12 caracteres
    strValue = strValue.padStart(12, '0');

    // Formatea el valor en el formato deseado
    return `${strValue.slice(0, 3)}-${strValue.slice(3, 6)}-${strValue.slice(6, 8)}-${strValue.slice(8)}`;
  }

}
