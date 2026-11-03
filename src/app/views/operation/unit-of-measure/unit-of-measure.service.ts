import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { UnitOfMeasureDto } from './dtos/unit-of-measure-dto';

@Injectable({ providedIn: 'root' })
export class UnitOfMeasureService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<UnitOfMeasureDto[]> {
    return this.http
      .get<UnitOfMeasureDto[]>(`${this._config.config.data}UnitOfMeasure/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<UnitOfMeasureDto> {
    return this.http
      .get<UnitOfMeasureDto>(`${this._config.config.data}UnitOfMeasure/GetById?id=${id}`)
      .toPromise();
  }

  getActives(): Promise<UnitOfMeasureDto[]> {
    return this.http
      .get<UnitOfMeasureDto[]>(`${this._config.config.data}UnitOfMeasure/GetAllActive`)
      .toPromise();
  }

  create(model: UnitOfMeasureDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}UnitOfMeasure/Create`, model)
      .toPromise();
  }

  update(model: UnitOfMeasureDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(`${this._config.config.data}UnitOfMeasure/Update?id=${id}`, model)
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}UnitOfMeasure/Disable?id=${id}`)
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}UnitOfMeasure/Enable?id=${id}`)
      .toPromise();
  }
}
