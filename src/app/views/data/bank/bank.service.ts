import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { BankDto } from './dtos/bank-dto';

@Injectable({ providedIn: 'root' })
export class BankService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<BankDto[]> {
    return this.http
      .get<BankDto[]>(`${this._config.config.data}Bank/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<BankDto> {
    return this.http
      .get<BankDto>(`${this._config.config.data}Bank/GetById?id=${id}`)
      .toPromise();
  }

  getActives(): Promise<BankDto[]> {
    return this.http
      .get<BankDto[]>(`${this._config.config.data}Bank/GetAllActive`)
      .toPromise();
  }

  create(model: BankDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Bank/Create`, model)
      .toPromise();
  }

  update(model: BankDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Bank/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Bank/Disable?id=${id}`)
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Bank/Enable?id=${id}`)
      .toPromise();
  }
}
