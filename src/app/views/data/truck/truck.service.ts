import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { TruckDto } from './dtos/truck-dto';

@Injectable({ providedIn: 'root' })
export class TruckService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<TruckDto[]> {
    return this.http
      .get<TruckDto[]>(`${this._config.config.data}Truck/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<TruckDto> {
    return this.http
      .get<TruckDto>(`${this._config.config.data}Truck/GetById?id=${id}`)
      .toPromise();
  }

  getActives(): Promise<TruckDto[]> {
    return this.http
      .get<TruckDto[]>(`${this._config.config.data}Truck/GetActive`)
      .toPromise();
  }

  create(model: TruckDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Truck/Create`, model)
      .toPromise();
  }

  update(model: TruckDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Truck/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  inactive(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Truck/Inactive?id=${id}`)
      .toPromise();
  }

  active(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Truck/Active?id=${id}`)
      .toPromise();
  }
}
