import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PurchaseOrderInvoiceDto } from "./dtos/purchase-order-invoice.dto";
import { ConfigService } from "../../../../_services/ConfigService";
import { RequestResult } from "../../../../_models/RequestResult";
import { InvoiceFilterDto } from "./dtos/invoice-filter.dto";

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient,
    private _config: ConfigService) {}

    getAll(filter: InvoiceFilterDto): Promise<PurchaseOrderInvoiceDto[]> {
      return this.http.post<PurchaseOrderInvoiceDto[]>(`${this._config.config.data}Invoice/GetAll`, filter).toPromise();
    }

    getById(id: number): Promise<PurchaseOrderInvoiceDto> {
      return this.http.get<PurchaseOrderInvoiceDto>(`${this._config.config.data}Invoice/GetById?id=${id}`).toPromise();
    }

    getByPurchaseOrder(id: number): Promise<PurchaseOrderInvoiceDto[]> {
      return this.http.get<PurchaseOrderInvoiceDto[]>(`${this._config.config.data}Invoice/GetByPurchaseOrder?id=${id}`).toPromise();
    }

    addInvoice(model: PurchaseOrderInvoiceDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Invoice/AddInvoice`, model).toPromise();
    }

    updateInvoiceFile(id: number, status: boolean): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Invoice/UpdateInvoiceFile?id=${id}`, status, {
        headers: { 'Content-Type': 'application/json' }
      }).toPromise();
    }
}
