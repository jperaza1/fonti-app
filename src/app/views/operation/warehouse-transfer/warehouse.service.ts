import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { WarehouseDto } from './dtos/warehouse-transfer-dto';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<WarehouseDto[]> {
    return this.http
      .get<WarehouseDto[]>(`${this._config.config.data}Warehouse/GetAll`)
      .toPromise();
  }
}
