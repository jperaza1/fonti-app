import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { WarehouseTransferDto, WarehouseTransferFilterDto } from './dtos/warehouse-transfer-dto';

@Injectable({ providedIn: 'root' })
export class WarehouseTransferService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(filter: WarehouseTransferFilterDto): Promise<WarehouseTransferDto[]> {
    let params = new HttpParams();
    if (filter && filter.dateFrom) {
      params = params.set('dateFrom', this.formatDate(filter.dateFrom));
    }
    if (filter && filter.dateTo) {
      params = params.set('dateTo', this.formatDate(filter.dateTo));
    }
    return this.http
      .get<WarehouseTransferDto[]>(`${this._config.config.data}WarehouseTransfer/GetAll`, { params })
      .toPromise();
  }

  private formatDate(date: Date) {
    const value = new Date(date);
    const month = value.getMonth() + 1;
    const day = value.getDate();
    return value.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  }

  getById(id: number): Promise<WarehouseTransferDto> {
    return this.http
      .get<WarehouseTransferDto>(`${this._config.config.data}WarehouseTransfer/GetById?id=${id}`)
      .toPromise();
  }

  create(model: WarehouseTransferDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}WarehouseTransfer/Create`, model)
      .toPromise();
  }

  accept(id: number): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}WarehouseTransfer/Accept?id=${id}`, {})
      .toPromise();
  }

  reject(id: number, reason: string): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}WarehouseTransfer/Reject`, { id, reason })
      .toPromise();
  }
}
