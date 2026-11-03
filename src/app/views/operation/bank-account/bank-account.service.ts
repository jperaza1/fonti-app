import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { BankAccountDto, CreateBankAccountDto } from './dtos/bank-account.dto';

@Injectable({ providedIn: 'root' })
export class BankAccountService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<BankAccountDto[]> {
    return this.http
      .get<BankAccountDto[]>(`${this._config.config.data}BankAccount/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<BankAccountDto> {
    return this.http
      .get<BankAccountDto>(`${this._config.config.data}BankAccount/GetById?id=${id}`)
      .toPromise();
  }

  getActives(): Promise<BankAccountDto[]> {
    return this.http
      .get<BankAccountDto[]>(`${this._config.config.data}BankAccount/GetAllActive`)
      .toPromise();
  }

  getByCafeteriaId(cafeteriaId: number): Promise<BankAccountDto[]> {
    return this.http
      .get<BankAccountDto[]>(`${this._config.config.data}BankAccount/GetByCafeteria?cafeteriaId=${cafeteriaId}`)
      .toPromise();
  }

  create(model: CreateBankAccountDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}BankAccount/Create`, model)
      .toPromise();
  }

  update(model: BankAccountDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(`${this._config.config.data}BankAccount/Update?id=${id}`, model)
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}BankAccount/Disable?id=${id}`)
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}BankAccount/Enable?id=${id}`)
      .toPromise();
  }
}
