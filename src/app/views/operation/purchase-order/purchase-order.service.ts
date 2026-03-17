import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { PurchaseOrderDto } from './dtos/purchase-order.dto';
import { FilterPurchaseOrderDto } from './dtos/filter-purchase-order.dto';
import { PurchaseOrderInvoiceDto } from '../invoice/dtos/purchase-order-invoice.dto';
import { PivotPurchaseOrderDto } from './dtos/pivot-purchase-order.dto';
import { ExpenseReportFilterDto } from './dtos/expense-report-filter.dto';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(filter: FilterPurchaseOrderDto): Promise<PurchaseOrderDto[]> {
    return this.http.post<PurchaseOrderDto[]>(`${this._config.config.data}PurchaseOrder/GetAll`, filter).toPromise();
  }

  getExpenseReport(filter: ExpenseReportFilterDto): Promise<any[]> {
    return this.http.post<any[]>(`${this._config.config.data}PurchaseOrder/GetExpenseReport`, filter).toPromise();
  }

  getPivot(filter: FilterPurchaseOrderDto): Promise<PivotPurchaseOrderDto[]> {
    return this.http.post<PivotPurchaseOrderDto[]>(`${this._config.config.data}PurchaseOrder/GetPivotPurchaseOrder`, filter).toPromise();
  }

  getById(id: number): Promise<PurchaseOrderDto> {
    return this.http.get<PurchaseOrderDto>(`${this._config.config.data}PurchaseOrder/GetById?id=${id}`).toPromise();
  }

  getActives(): Promise<PurchaseOrderDto[]> {
    return this.http.get<PurchaseOrderDto[]>(`${this._config.config.data}PurchaseOrder/GetAllActive`).toPromise();
  }

  create(model: PurchaseOrderDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}PurchaseOrder/Create`, model).toPromise();
  }

  update(model: PurchaseOrderDto, id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}PurchaseOrder/Update?id=${id}`, model).toPromise();
  }

  updateStatus(id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}PurchaseOrder/UpdateStatus?id=${id}`, null).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}PurchaseOrder/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}PurchaseOrder/Enable?id=${id}`).toPromise();
  }

  getPurchaseOrderFile(id: number): Promise<string> {
    return this.http.get(`${this._config.config.data}PurchaseOrder/GetPurchaseOrderFile?id=${id}`, { responseType: 'text' }).toPromise();
  }

  getPurchaseOrderVendorFile(id: number): Promise<string> {
    return this.http.get(`${this._config.config.data}PurchaseOrder/GetPurchaseOrderVendorFile?id=${id}`, { responseType: 'text' }).toPromise();
  }

  rejectPurchaseOrder(model: any): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}PurchaseOrder/Reject`, model).toPromise();
  }

  cancelPurchaseOrder(model: any): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}PurchaseOrder/Cancel`, model).toPromise();
  }


}