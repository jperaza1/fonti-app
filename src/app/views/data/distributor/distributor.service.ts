import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { DistributorDto, ProductDistributorPricesDto } from './dtos/distributor-dto';

@Injectable({ providedIn: 'root' })
export class DistributorService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<DistributorDto[]> {
    return this.http
      .get<DistributorDto[]>(`${this._config.config.data}Distributor/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<DistributorDto> {
    return this.http
      .get<DistributorDto>(`${this._config.config.data}Distributor/GetById?id=${id}`)
      .toPromise();
  }

  getProductDistributorPrices(distributorId: number): Promise<ProductDistributorPricesDto[]> {
    return this.http
      .get<ProductDistributorPricesDto[]>(
        `${this._config.config.data}Distributor/GetProductDistributorPrices?distributorId=${distributorId}`
      )
      .toPromise();
  }

  getActives(): Promise<DistributorDto[]> {
    return this.http
      .get<DistributorDto[]>(`${this._config.config.data}Distributor/GetAllActive`)
      .toPromise();
  }

  create(model: DistributorDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Distributor/Create`, model)
      .toPromise();
  }

  update(model: DistributorDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Distributor/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Distributor/Disable?id=${id}`)
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Distributor/Enable?id=${id}`)
      .toPromise();
  }
}
