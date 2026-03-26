import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { ProductRoutePricesDto, RouteDto } from './dtos/route-dto';

@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<RouteDto[]> {
    return this.http
      .get<RouteDto[]>(`${this._config.config.data}Route/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<RouteDto> {
    return this.http
      .get<RouteDto>(`${this._config.config.data}Route/GetById?id=${id}`)
      .toPromise();
  }

  getProductRoutePrices(routeId: number): Promise<ProductRoutePricesDto[]> {
    return this.http
      .get<ProductRoutePricesDto[]>(`${this._config.config.data}Route/GetProductRoutePrices?routeId=${routeId}`)
      .toPromise();
  }

  getActives(): Promise<RouteDto[]> {
    return this.http
      .get<RouteDto[]>(`${this._config.config.data}Route/GetAllActive`)
      .toPromise();
  }

  create(model: RouteDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Route/Create`, model)
      .toPromise();
  }

  update(model: RouteDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Route/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Route/Disable?id=${id}`)
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Route/Enable?id=${id}`)
      .toPromise();
  }
}
