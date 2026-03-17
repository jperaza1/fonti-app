import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from '../../../../_models/RequestResult';
import { ConfigService } from '../../../../_services/ConfigService';
import { TenantDto } from './dtos/tenant-dto';

@Injectable({ providedIn: 'root' })
export class TenantService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getById(id: number): Promise<TenantDto> {
        return this.http.get<TenantDto>(`${this._config.config.auth}Tenant/GetById?id=${id}`).toPromise();
    }

    getAll(): Promise<TenantDto[]> {
        return this.http.get<TenantDto[]>(`${this._config.config.auth}Tenant/GetAll`).toPromise();
    }

    create(model: TenantDto): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.auth}Tenant/Create`, model).toPromise();
    }

    update(model: TenantDto, id: number): Promise<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.auth}Tenant/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.auth}Tenant/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.auth}Tenant/Enable?id=${id}`).toPromise();
    }
}
