import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { WarehouseTransferDto } from './dtos/warehouse-transfer-dto';

@Injectable({ providedIn: 'root' })
export class WarehouseTransferService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<WarehouseTransferDto[]> {
    return this.http
      .get<WarehouseTransferDto[]>(`${this._config.config.data}WarehouseTransfer/GetAll`)
      .toPromise();
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
