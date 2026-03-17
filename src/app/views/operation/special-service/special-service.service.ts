import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from "../../../../_services/ConfigService";
import { FilterSpecialServiceDto } from "./dtos/filter-special-service.dto";
import { SpecialServiceDto } from "./dtos/special-service.dto";
import { RequestResult } from "../../../../_models/RequestResult";

@Injectable({ providedIn: 'root' })
export class SpecialServiceService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

  getAll(filter: FilterSpecialServiceDto): Promise<SpecialServiceDto[]> {
    return this.http.post<SpecialServiceDto[]>(`${this._config.config.data}SpecialServices/GetAll`, filter).toPromise();
  }

  getById(id: number): Promise<SpecialServiceDto> {
    return this.http.get<SpecialServiceDto>(`${this._config.config.data}SpecialServices/GetById?id=${id}`).toPromise();
  }

  create(model: SpecialServiceDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}SpecialServices/Create`, model).toPromise();
  }

  update(model: SpecialServiceDto, id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}SpecialServices/Update?id=${id}`, model).toPromise();
  }

  updateStatus(id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}SpecialServices/UpdateStatus?id=${id}`, null).toPromise();
  }

  getSpecialServiceFile(id: number): Promise<string> {
    return this.http.get(`${this._config.config.data}SpecialServices/getSpecialServiceFile?id=${id}`, { responseType: 'text' }).toPromise();
  }

  rejectSpecialService(model: any): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}SpecialServices/Reject`, model).toPromise();
  }
    

}
