import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResult } from '../../../../_models/RequestResult';
import { ConfigService } from '../../../../_services/ConfigService';
import { ConfigurationDto } from './models/configuration-dto';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient, private _config: ConfigService) { }

  getActives(): Promise<ConfigurationDto[]> {
    return this.http.get<ConfigurationDto[]>(`${this._config.config.auth}Configuration/GetActives`).toPromise();
  }

  getAll(): Promise<ConfigurationDto[]> {
    return this.http.get<ConfigurationDto[]>(`${this._config.config.auth}Configuration/GetAll`).toPromise();
  }

  getById(id: number): Promise<ConfigurationDto> {
    return this.http.get<ConfigurationDto>(`${this._config.config.auth}Configuration/GetById?id=${id}`).toPromise();
  }

  getByKey(key: string): Promise<ConfigurationDto> {
    return this.http.get<ConfigurationDto>(`${this._config.config.auth}Configuration/GetByKey?key=${key}`).toPromise();
  }

  create(model: ConfigurationDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.auth}Configuration/Create`, model).toPromise();
  }

  update(model: ConfigurationDto, id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.auth}Configuration/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.auth}Configuration/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.auth}Configuration/Enable?id=${id}`).toPromise();
  }
}
