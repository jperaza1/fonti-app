import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../../../_services/ConfigService";
import { RequestResult } from "../../../../_models/RequestResult";
import { InvoiceFilterDto } from "../invoice/dtos/invoice-filter.dto";
import { GeneratePendingBillingDto } from "../sale/dtos/generate-pending-billing-dto";
import { FilterInvoiceSaleDto } from "./dto/filter-invoice-sale.dto";
import { InvoiceSaleDto } from "./dto/invoice-sale.dto";

@Injectable({
  providedIn: 'root'
})
export class InvoiceSaleService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }


  getAll(filter: FilterInvoiceSaleDto): Promise<InvoiceSaleDto[]> {
    return this.http.post<InvoiceSaleDto[]>(`${this._config.config.data}InvoiceSale/GetAll`, filter).toPromise();
  }

  getById(id: number): Promise<InvoiceSaleDto> {
    return this.http.get<InvoiceSaleDto>(`${this._config.config.data}InvoiceSale/GetById?id=${id}`).toPromise();
  }

  generatePendingBilling(payload: GeneratePendingBillingDto): Promise<RequestResult> {
    console.log(payload);
    return this.http.post<RequestResult>(`${this._config.config.data}InvoiceSale/CreateSaleInvoice`, payload).toPromise();
  }

  getPaymentReceipt(invoiceId: number): Promise<string> {
    return this.http.get(`${this._config.config.data}InvoiceSale/GetInvoiceFile?invoiceId=${invoiceId}`, { responseType: 'text' }).toPromise();
  }

  markPaid(invoiceId: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}InvoiceSale/MarkAsPaid?id=${invoiceId}`, null).toPromise();
  }
}