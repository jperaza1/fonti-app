import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { InvoiceSaleDto } from '../dto/invoice-sale.dto';
import { Subscription } from 'rxjs';
import { InvoiceSaleService } from '../invoice-sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../_services/ConfigService';
import { CreateOrUpdateSaleComponent } from '../../sale/create-or-update-sale/create-or-update-sale.component';
import { SaleDto } from '../../sale/dtos/sale-dto';

@Component({
  selector: 'app-view-invoice-sale',
  templateUrl: './view-invoice-sale.component.html',
  styleUrls: ['./view-invoice-sale.component.css']
})
export class ViewInvoiceSaleComponent extends AppComponentBase implements OnInit {
  id: number;
  Model: InvoiceSaleDto = new InvoiceSaleDto();
  title: string = 'Factura de Venta';
  columns: any[] = [];
  routeSub: Subscription;

  @ViewChild('createOrUpdateSaleModal') createOrUpdateSaleModal: CreateOrUpdateSaleComponent;

  constructor(
    private _invoiceSale: InvoiceSaleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _configService: ConfigService
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
    let result = await this._invoiceSale.getById(this.id);
    this.Model = result;
    this.title = 'Factura # ' +this.Model.invoiceNumber;
  }

  return() {
    this._router.navigate(['/invoice-sale']);
  }

  async showInvoiceFile() {
    const file = await this._invoiceSale.getPaymentReceipt(this.Model.id);
    this.openPdfInNewTab(file, `Factura ${this.Model.invoiceNumber}.pdf`);
  }

  async showSale(saleId: number) {
    this.createOrUpdateSaleModal.showUpdate({ id: saleId } as SaleDto);
  }

  async payInvoice() {
    const result = await this._invoiceSale.markPaid(this.Model.id);
    
    if(result.success) {
      this.success(result.title, result.messageResponse);
      this.loadInvoiceInfo();
    } else {
      this.error(result.title, result.messageResponse);
    }
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "saleId",
        caption: "Venta",
        width: "90",
        alignment: "center",
        cellTemplate: "saleTemplate",
      },
      {
        dataField: "routeName",
        caption: "Ruta",
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
      }
    ];
  }

}
