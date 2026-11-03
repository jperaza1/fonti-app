import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { ExpenseDto } from './dtos/expense-dto';
import { ExpenseFilterDto } from './dtos/expense-filter.dto';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(filter: ExpenseFilterDto): Promise<ExpenseDto[]> {
    return this.http
      .post<ExpenseDto[]>(`${this._config.config.data}Expense/GetAll`, filter)
      .toPromise();
  }

  getById(id: number): Promise<ExpenseDto> {
    return this.http
      .get<ExpenseDto>(`${this._config.config.data}Expense/GetById?id=${id}`)
      .toPromise();
  }

  create(formData: FormData): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Expense/Create`, formData)
      .toPromise();
  }

  update(model: ExpenseDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Expense/Update?id=${id}`,
        model
      )
      .toPromise();
  }
}
