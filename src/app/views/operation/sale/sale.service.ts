import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../../../_services/ConfigService";
import { SaleDto } from "./dtos/sale-dto";
import { RequestResult } from "../../../../_models/RequestResult";
import { FilterSaleDto } from "./dtos/filter-sale-dto";
import { GetSalesByMonthDto } from "./dtos/sale-by-month-dto";
import { SaleChartFilterDto, SaleChartPointDto } from "./dtos/sale-chart-point-dto";
import { SaleRouteQuantityFilterDto, SaleRouteQuantityReportDto } from "./dtos/sale-route-quantity-dto";
import { GeneratePendingBillingDto } from "./dtos/generate-pending-billing-dto";

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

    getChartReport(filter: SaleChartFilterDto): Promise<SaleChartPointDto[]> {
      return this.http.post<SaleChartPointDto[]>(`${this._config.config.data}Sale/GetChartReport`, filter).toPromise();
    }

    getRouteQuantityReport(filter: SaleRouteQuantityFilterDto): Promise<SaleRouteQuantityReportDto> {
      return this.http.post<SaleRouteQuantityReportDto>(`${this._config.config.data}Sale/GetRouteQuantityReport`, filter).toPromise();
    }

    getPendingBillingReport(filterModel: FilterSaleDto): Promise<SaleDto[]> {
      return this.http.post<SaleDto[]>(`${this._config.config.data}Sale/GetPendingBillingReport`, filterModel).toPromise();
    }

    generatePendingBilling(model: GeneratePendingBillingDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Sale/GeneratePendingBilling`, model).toPromise();
    }

    getConsolidateAvailability(model): Promise<any[]> {
      return this.http.post<any[]>(`${this._config.config.data}Sale/GetConsolidateAvailability`, model).toPromise();
    }

    consolidate(model): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Sale/Consolidate`, model).toPromise();
    }
}