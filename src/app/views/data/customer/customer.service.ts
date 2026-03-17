import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { CustomerDto } from './dtos/customer-dto';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(): Promise<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this._config.config.data}Customer/GetAll`).toPromise();
  }

  getAllActive(): Promise<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this._config.config.data}Customer/GetAllActive`).toPromise();
  }

  getById(id: number): Promise<CustomerDto> {
    return this.http.get<CustomerDto>(`${this._config.config.data}Customer/GetById?id=${id}`).toPromise();
  }

  getByCafeteriaId(cafeteriaId: number): Promise<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this._config.config.data}Customer/GetByCafeteria?cafeteriaId=${cafeteriaId}`).toPromise();
  }

  create(model: CustomerDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Customer/Create`, model).toPromise();
  }

  update(model: CustomerDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Customer/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Customer/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Customer/Enable?id=${id}`).toPromise();
  }


}