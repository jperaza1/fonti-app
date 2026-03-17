import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { RegisterDto } from './dtos/register-dto';

@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(): Promise<RegisterDto[]> {
    return this.http.get<RegisterDto[]>(`${this._config.config.data}Register/GetAll`).toPromise();
  }

  getById(id: number): Promise<RegisterDto> {
    return this.http.get<RegisterDto>(`${this._config.config.data}Register/GetById?id=${id}`).toPromise();
  }

  getActives(): Promise<RegisterDto[]> {
    return this.http.get<RegisterDto[]>(`${this._config.config.data}Register/GetAllActive`).toPromise();
  }

  getByCafeteriaId(cafeteriaId: number): Promise<RegisterDto[]> {
    return this.http.get<RegisterDto[]>(`${this._config.config.data}Register/GetByCafeteria?cafeteriaId=${cafeteriaId}`).toPromise();
  }

  getByCafeteriaInventory(cafeteriaId: number): Promise<RegisterDto[]> {
    return this.http.get<RegisterDto[]>(`${this._config.config.data}Register/GetByCafeteriaInventory?cafeteriaId=${cafeteriaId}`).toPromise();
  }

  create(model: RegisterDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Register/Create`, model).toPromise();
  }

  update(model: RegisterDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Register/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Register/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Register/Enable?id=${id}`).toPromise();
  }


}