import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { ProductDto, VendorProductDto } from './dtos/product-dto';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(): Promise<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this._config.config.data}Product/GetAll`).toPromise();
  }

  getBySpecialService(): Promise<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this._config.config.data}Product/GetBySpecialService`).toPromise();
  }

  getById(id: number): Promise<ProductDto> {
    return this.http.get<ProductDto>(`${this._config.config.data}Product/GetById?id=${id}`).toPromise();
  }

  getByVendorId(vendorId: number): Promise<VendorProductDto[]> {
    return this.http.get<VendorProductDto[]>(`${this._config.config.data}Product/GetByVendor?vendorId=${vendorId}`).toPromise();
  }

  getActives(productType: number): Promise<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this._config.config.data}Product/GetAllActive?productType=${productType}`).toPromise();
  }

  create(model: ProductDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Product/Create`, model).toPromise();
  }

  update(model: ProductDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Product/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Product/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Product/Enable?id=${id}`).toPromise();
  }


}