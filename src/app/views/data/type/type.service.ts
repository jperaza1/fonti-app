import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { GetTypesByGroupCodeListDto } from './dtos/group-codes-dto';
import { TypeDto } from './dtos/type-dto';
import { RequestResult } from '../../../../_models/RequestResult';

@Injectable({ providedIn: 'root' })
export class TypeService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getTypesByGroupCode(groupCode: string): Promise<TypeDto[]> {
        return this.http.get<TypeDto[]>(`${this._config.config.data}Type/GetTypesByGroupCode?groupCode=${groupCode}`).toPromise();
    }
    getAciteTypesByGroupCode(groupCode: string): Promise<TypeDto[]> {
      return this.http.get<TypeDto[]>(`${this._config.config.data}Type/GetAciteTypesByGroupCode?groupCode=${groupCode}`).toPromise();
    }
    getTypesByGroupCodeList(codes: GetTypesByGroupCodeListDto[]): Promise<any> {
        return this.http.post<any>(`${this._config.config.data}Type/GetTypesByGroupCodeList`, codes).toPromise();
    }


    getAll(): Promise<TypeDto[]> {
      return this.http.get<TypeDto[]>(`${this._config.config.data}Type/GetAll`).toPromise();
  }


  getActives(): Promise<TypeDto[]> {
    return this.http.get<TypeDto[]>(`${this._config.config.data}Type/GetActives`).toPromise();
}

  create(model: TypeDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Type/Create`, model).toPromise();
  }

  update(model: TypeDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Type/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Type/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Type/Enable?id=${id}`).toPromise();
  }


}

