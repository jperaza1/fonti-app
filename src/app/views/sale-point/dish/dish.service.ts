import { HttpClient } from '@angular/common/http';
import { ConfigService } from "../../../../_services/ConfigService";
import { Injectable } from "@angular/core";
import { RequestResult } from "../../../../_models/RequestResult";
import { DishDto } from './dtos/dish.dto';

@Injectable({ providedIn: 'root' })
export class DishService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

    getAll(): Promise<DishDto[]> {
      return this.http.get<DishDto[]>(`${this._config.config.data}Dish/GetAll`).toPromise();
    }

    getById(id: number): Promise<DishDto> {
      return this.http.get<DishDto>(`${this._config.config.data}Dish/GetById?id=${id}`).toPromise();
    }

    create(model: DishDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Dish/Create`, model).toPromise();
    }

    update(model: DishDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Dish/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Dish/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Dish/Enable?id=${id}`).toPromise();
    }
}