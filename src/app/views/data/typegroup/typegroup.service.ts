import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from '../../../../_models/RequestResult';
import { ConfigService } from '../../../../_services/ConfigService';
import { TypeGroupModel } from './models/TypeGroupModel';

@Injectable({ providedIn: 'root' })
export class TypeGroupService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getTypeGroupByCode(code: string): Promise<TypeGroupModel> {
        return this.http.get<TypeGroupModel>(`${this._config.config.data}TypeGroup/GetTypeGroupByCode?code=${code}`).toPromise();
    }
    getAll(): Promise<TypeGroupModel[]> {
        return this.http.get<TypeGroupModel[]>(`${this._config.config.data}TypeGroup/GetAll`).toPromise();
    }

    create(model: TypeGroupModel): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.data}TypeGroup/Create`, model).toPromise();
    }

    update(model: TypeGroupModel, id: number): Promise<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.data}TypeGroup/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.data}TypeGroup/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.data}TypeGroup/Enable?id=${id}`).toPromise();
    }

    getActives(): Promise<TypeGroupModel[]> {
        return this.http.get<TypeGroupModel[]>
            (`${this._config.config.data}TypeGroup/GetActives`)
            .toPromise()
    }
}
