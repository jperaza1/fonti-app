import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ConfigService } from "../../../../_services/ConfigService";
import { RequestResult } from "../../../../_models/RequestResult";
import { FilterOfficeRequisitionDto } from "./dtos/filter-special-service.dto";
import { OfficeRequisitionDto } from "./dtos/office-requisition.dto";

@Injectable({ providedIn: 'root' })
export class OfficeRequisitionService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

  getAll(filter: FilterOfficeRequisitionDto): Promise<OfficeRequisitionDto[]> {
    return this.http.post<OfficeRequisitionDto[]>(`${this._config.config.data}OfficeRequisition/GetAll`, filter).toPromise();
  }

  getById(id: number): Promise<OfficeRequisitionDto> {
    return this.http.get<OfficeRequisitionDto>(`${this._config.config.data}OfficeRequisition/GetById?id=${id}`).toPromise();
  }

  create(model: OfficeRequisitionDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}OfficeRequisition/Create`, model).toPromise();
  }

  update(model: OfficeRequisitionDto, id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}OfficeRequisition/Update?id=${id}`, model).toPromise();
  }

  updateStatus(id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}OfficeRequisition/UpdateStatus?id=${id}`, null).toPromise();
  }

  getOfficeRequisitionFile(id: number): Promise<string> {
    return this.http.get(`${this._config.config.data}OfficeRequisition/GetOfficeRequisitionFile?id=${id}`, { responseType: 'text' }).toPromise();
  }

  rejectOfficeRequisition(model: any): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}OfficeRequisition/Reject`, model).toPromise();
  }
    

}
