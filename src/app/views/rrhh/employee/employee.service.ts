import { HttpClient } from '@angular/common/http';
import { ConfigService } from "../../../../_services/ConfigService";
import { Injectable } from "@angular/core";
import { RequestResult } from "../../../../_models/RequestResult";
import { EmployeeDto } from "./dtos/employee.dto";
import { RequestVacationDto } from './dtos/request-vacation.dto';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient,
  private _config: ConfigService) { }

  getAll(): Promise<EmployeeDto[]> {
    return this.http.post<EmployeeDto[]>(`${this._config.config.data}Employee/GetAll`, {}).toPromise();
  }

  getById(id: number): Promise<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this._config.config.data}Employee/GetById?id=${id}`).toPromise();
  }

  create(model: EmployeeDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}Employee/Create`, model).toPromise();
  }

  update(model: EmployeeDto, id: number): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}Employee/Update?id=${id}`, model).toPromise();
  }

  createRequestVacation(model: RequestVacationDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}Employee/RequestVacation`, model).toPromise();
  }

  getRequestVacatioFile(id: number): Promise<string> {
    return this.http.get(`${this._config.config.data}Employee/GetRequestVacatioFile?id=${id}`, { responseType: 'text' }).toPromise();
  }
}