import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from '../../../../_models/RequestResult';
import { ConfigService } from '../../../../_services/ConfigService';
import { RoleDto } from './dtos/role-dto';

@Injectable({ providedIn: 'root' })
export class RoleService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getById(id: number): Promise<RoleDto> {
        return this.http.get<RoleDto>(`${this._config.config.auth}Role/GetById?id=${id}`).toPromise();
    }

    getAll(): Promise<RoleDto[]> {
        return this.http.get<RoleDto[]>(`${this._config.config.auth}Role/GetAll`).toPromise();
    }

    create(model: RoleDto): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.auth}Role/Create`, model).toPromise();
    }

    update(model: RoleDto): Promise<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.auth}Role/Update`, model).toPromise();
    }
}
