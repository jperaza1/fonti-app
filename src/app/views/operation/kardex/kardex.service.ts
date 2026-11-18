import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { KardexDto, KardexEntryDto, KardexFilterDto, ProductStockDto } from './dtos/kardex-dto';

@Injectable({ providedIn: 'root' })
export class KardexService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getStock(warehouseId?: number): Promise<ProductStockDto[]> {
    const warehouse = warehouseId > 0 ? `?warehouseId=${warehouseId}` : '';
    return this.http
      .get<ProductStockDto[]>(`${this._config.config.data}Kardex/GetStock${warehouse}`)
      .toPromise();
  }

  getAll(filter: KardexFilterDto): Promise<KardexDto[]> {
    return this.http
      .post<KardexDto[]>(`${this._config.config.data}Kardex/GetAll`, filter)
      .toPromise();
  }

  createEntry(model: KardexEntryDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Kardex/CreateEntry`, model)
      .toPromise();
  }

  createExit(model: KardexEntryDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Kardex/CreateExit`, model)
      .toPromise();
  }
}
