import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../../../_services/ConfigService";
import { SaleDto } from "./dtos/sale-dto";
import { RequestResult } from "../../../../_models/RequestResult";
import { FilterSaleDto } from "./dtos/filter-sale-dto";
import { GetSalesByMonthDto } from "./dtos/sale-by-month-dto";

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

    getAll(filterModel: FilterSaleDto): Promise<SaleDto[]> {
      return this.http.post<SaleDto[]>(`${this._config.config.data}Sale/GetAll`, filterModel).toPromise();
    }
  
    getById(id: number): Promise<SaleDto> {
      return this.http.get<SaleDto>(`${this._config.config.data}Sale/GetById?id=${id}`).toPromise();
    }

    getSalesByMonth(): Promise<GetSalesByMonthDto[]> {
      return this.http.get<GetSalesByMonthDto[]>(`${this._config.config.data}Sale/GetSalesByMonth`).toPromise();
    }

    getSalesByWeek(): Promise<GetSalesByMonthDto[]> {
      return this.http.get<GetSalesByMonthDto[]>(`${this._config.config.data}Sale/GetSalesByWeek`).toPromise();
    }

    create(model: SaleDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Sale/Create`, model).toPromise();
  }

    update(model: SaleDto, id: number): Promise<RequestResult> {
      return this.http.put<RequestResult>(`${this._config.config.data}Sale/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Sale/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
      return this.http.delete<RequestResult>(`${this._config.config.data}Sale/Enable?id=${id}`).toPromise();
    }
}