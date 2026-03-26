import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { CorrelativeDto } from './dtos/correlative-dto';

@Injectable({ providedIn: 'root' })
export class CorrelativeService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<CorrelativeDto[]> {
    return this.http
      .get<CorrelativeDto[]>(`${this._config.config.data}Correlative/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<CorrelativeDto> {
    return this.http
      .get<CorrelativeDto>(
        `${this._config.config.data}Correlative/GetById?id=${id}`
      )
      .toPromise();
  }

  create(model: CorrelativeDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(
        `${this._config.config.data}Correlative/Create`,
        model
      )
      .toPromise();
  }

  update(model: CorrelativeDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Correlative/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(
        `${this._config.config.data}Correlative/Disable?id=${id}`
      )
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(
        `${this._config.config.data}Correlative/Enable?id=${id}`
      )
      .toPromise();
  }
}
