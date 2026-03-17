import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from '../../../../_models/RequestResult';
import { ConfigService } from '../../../../_services/ConfigService';
import { GroupRoleDto } from './dtos/group-role-dto';
import { PermissionDto } from './dtos/permission-dto';
import { PermissionGroupedDto } from './dtos/permission-grouped-dto';

@Injectable({ providedIn: 'root' })
export class GroupRoleService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getById(id: number): Promise<GroupRoleDto> {
        return this.http.get<GroupRoleDto>(`${this._config.config.auth}GroupRole/GetById?id=${id}`).toPromise();
    }

    getPermissionsGroupedByTenant(): Promise<PermissionGroupedDto[]> {
        return this.http.get<PermissionGroupedDto[]>(`${this._config.config.auth}GroupRole/GetPermissionsGroupedByTenant`).toPromise();
    }

    getPermissionsGrouped(): Promise<PermissionGroupedDto[]> {
        return this.http.get<PermissionGroupedDto[]>(`${this._config.config.auth}GroupRole/GetPermissionsGrouped`).toPromise();
    }

    getAllPermissions(): Promise<PermissionDto[]> {
        return this.http.get<PermissionDto[]>(`${this._config.config.auth}GroupRole/GetAllPermissions`).toPromise();
    }

    getAll(): Promise<GroupRoleDto[]> {
        return this.http.get<GroupRoleDto[]>(`${this._config.config.auth}GroupRole/GetAll`).toPromise();
    }

    create(model: GroupRoleDto): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.auth}GroupRole/Create`, model).toPromise();
    }

    update(model: GroupRoleDto): Promise<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.auth}GroupRole/Update`, model).toPromise();
    }
}
