import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { VendorDto } from './dtos/vendor-dto';

@Injectable({ providedIn: 'root' })
export class VendorService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(): Promise<VendorDto[]> {
    return this.http.get<VendorDto[]>(`${this._config.config.data}Vendor/GetAll`).toPromise();
  }

  getById(id: number): Promise<VendorDto> {
    return this.http.get<VendorDto>(`${this._config.config.data}Vendor/GetById?id=${id}`).toPromise();
  }

  getActives(): Promise<VendorDto[]> {
    return this.http.get<VendorDto[]>(`${this._config.config.data}Vendor/GetAllActive`).toPromise();
  }

  create(model: VendorDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Vendor/Create`, model).toPromise();
  }

  update(model: VendorDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Vendor/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Vendor/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Vendor/Enable?id=${id}`).toPromise();
  }


}