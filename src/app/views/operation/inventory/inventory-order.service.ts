import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { FilterInventoryDto } from './dtos/filter-inventory.dto';
import { InventoryDto } from './dtos/inventory.dto';
import { ResumeInventoryDto } from './dtos/resume-inventory.dto';

@Injectable({ providedIn: 'root' })
export class InventoryService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(filter: FilterInventoryDto): Promise<InventoryDto[]> {
    return this.http.post<InventoryDto[]>(`${this._config.config.data}Inventory/GetAll`, filter).toPromise();
  }

  getAllResume(id: number): Promise<ResumeInventoryDto[]> {
    return this.http.get<ResumeInventoryDto[]>(`${this._config.config.data}Inventory/GetResume?id=${id}`).toPromise();
  }

  getLastInventoryByCafeteria(cafeteriaId: number): Promise<InventoryDto> {
    return this.http.get<InventoryDto>(`${this._config.config.data}Inventory/GetLastInventoryByCafeteria?cafeteriaId=${cafeteriaId}`).toPromise();
  }

  getById(id: number): Promise<InventoryDto> {
    return this.http.get<InventoryDto>(`${this._config.config.data}Inventory/GetById?id=${id}`).toPromise();
  }

  create(model: InventoryDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}Inventory/Create`, model).toPromise();
  }

  update(model: InventoryDto, id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}Inventory/Update?id=${id}`, model).toPromise();
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