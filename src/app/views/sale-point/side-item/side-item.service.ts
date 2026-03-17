import { HttpClient } from '@angular/common/http';
import { ConfigService } from "../../../../_services/ConfigService";
import { Injectable } from "@angular/core";
import { RequestResult } from "../../../../_models/RequestResult";
import { SideItemDto } from './dtos/side-item.dto';

@Injectable({ providedIn: 'root' })
export class SideItemService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

    getAll(): Promise<SideItemDto[]> {
      return this.http.get<SideItemDto[]>(`${this._config.config.data}SideItem/GetAll`).toPromise();
    }

    getById(id: number): Promise<SideItemDto> {
      return this.http.get<SideItemDto>(`${this._config.config.data}SideItem/GetById?id=${id}`).toPromise();
    }

    create(model: SideItemDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}SideItem/Create`, model).toPromise();
    }

    update(model: SideItemDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}SideItem/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}SideItem/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}SideItem/Enable?id=${id}`).toPromise();
    }

}