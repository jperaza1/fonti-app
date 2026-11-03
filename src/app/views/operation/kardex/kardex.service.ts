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

  getStock(): Promise<ProductStockDto[]> {
    return this.http
      .get<ProductStockDto[]>(`${this._config.config.data}Kardex/GetStock`)
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
