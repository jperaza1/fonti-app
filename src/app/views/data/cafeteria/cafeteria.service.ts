import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { CafeteriaDto } from './dtos/cafeteria-dto';

@Injectable({ providedIn: 'root' })
export class CafeteriaService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }


  getAll(): Promise<CafeteriaDto[]> {
    return this.http.get<CafeteriaDto[]>(`${this._config.config.data}Cafeteria/GetAll`).toPromise();
  }

  getById(id: number): Promise<CafeteriaDto> {
    return this.http.get<CafeteriaDto>(`${this._config.config.data}Cafeteria/GetById?id=${id}`).toPromise();
  }

  getActives(): Promise<CafeteriaDto[]> {
    return this.http.get<CafeteriaDto[]>(`${this._config.config.data}Cafeteria/GetAllActive`).toPromise();
  }

  create(model: CafeteriaDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Cafeteria/Create`, model).toPromise();
  }

  update(model: CafeteriaDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Cafeteria/Update?id=${id}`, model).toPromise();
  }

  disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Cafeteria/Disable?id=${id}`).toPromise();
  }

  enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Cafeteria/Enable?id=${id}`).toPromise();
  }


}