import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppComponentBase } from '../../../../AppComponentBase';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderInvoiceDto } from '../dtos/purchase-order-invoice.dto';
import { Subscription } from 'rxjs';
import { AddPaymentComponent } from '../../payment/add-payment/add-payment.component';
import { ConfigService } from '../../../../../_services/ConfigService';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent extends AppComponentBase implements OnInit {

  id: number;
  Model: PurchaseOrderInvoiceDto = new PurchaseOrderInvoiceDto();
  title: string = 'Factura';
  columns: any[] = [];
  routeSub: Subscription;
  showImageLightbox = false;

  @ViewChild("addPayment") addPayment: AddPaymentComponent;

  constructor(
    private _invoiceService: InvoiceService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _configService: ConfigService,
    private _sanitizer: DomSanitizer
  ) { 
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id']
    });
  }

  async ngOnInit() {
    this.initializeColumns();
    this.routeSub.unsubscribe();
    if(this.id > 0) await this.showUpdate();
  }

  async showUpdate() {
    await this.loadInvoiceInfo();
  }

  async loadInvoiceInfo() {
    let result = await this._invoiceService.getById(this.id);
    this.Model = result;
    this.title = 'Factura # ' +this.formatInvoiceNumber(this.Model.invoiceNumber);
  }

  return() {
    this._router.navigate(['/invoice']);
  }

  addPaymentClick() {
    this.addPayment.showAdd(this.Model.id);
  }

  getDocumentUrl(id: number): SafeResourceUrl {
    if (!this._configService?.config?.document || !id) return this._sanitizer.bypassSecurityTrustResourceUrl('');
    const url = `${this._configService.config.document}Attachment/GetAttachmentById?id=${id}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openImageLightbox() {
    this.showImageLightbox = true;
  }

  closeImageLightbox() {
    this.showImageLightbox = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showImageLightbox) this.closeImageLightbox();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'paymentDate',
        caption: 'Fecha de Pago',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'amount',
        caption: 'Monto',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'paymentMethodName',
        caption: 'Método de Pago',
      }
    ]
  }
}
