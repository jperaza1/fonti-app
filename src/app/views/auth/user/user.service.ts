import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from '../../../../_models/RequestResult';
import { ConfigService } from '../../../../_services/ConfigService';
import { UserAlertDataDto } from './dtos/user-alert-data-dto';
import { UserAlertInfoDto } from './dtos/user-alert-info-dto';
import { UserAlertPreviewDto } from './dtos/user-alert-preview-dto';
import { UserChartDataDto } from './dtos/user-chart-data-dto';
import { UserChartDto } from './dtos/user-chart-info-dto';
import { UserDto } from './dtos/user-dto';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getById(id: number): Promise<UserDto> {
        return this.http.get<UserDto>(`${this._config.config.auth}User/GetById?id=${id}`).toPromise();
    }

    getAll(): Promise<UserDto[]> {
        return this.http.get<UserDto[]>(`${this._config.config.auth}User/GetAll`).toPromise();
    }

    getActives(): Promise<UserDto[]> {
      return this.http.get<UserDto[]>(`${this._config.config.auth}User/GetActives`).toPromise();
    }

    create(model: UserDto): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.auth}User/Create`, model).toPromise();
    }

    update(model: UserDto, id: number): Promise<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.auth}User/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.auth}User/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.auth}User/Enable?id=${id}`).toPromise();
    }

    getAlertsInfo(): Promise<UserAlertInfoDto[]> {
      return this.http.get<UserAlertInfoDto[]>(`${this._config.config.data}Alert/GetAlertsInfo`).toPromise();
    }

    getAlertsData(): Promise<UserAlertDataDto[]> {
      return this.http.get<UserAlertDataDto[]>(`${this._config.config.data}Alert/GetAlertsData`).toPromise();
    }

    getNotification(): Promise<UserAlertDataDto[]> {
      return this.http.get<UserAlertDataDto[]>(`${this._config.config.auth}User/GetNotification`).toPromise();
    }

    getCharts(): Promise<UserChartDto[]> {
      return this.http.get<UserChartDto[]>(`${this._config.config.auth}User/GetCharts`).toPromise();
    }
    getAlertsPreview(userAlert: number): Promise<UserAlertPreviewDto> {
        return this.http.get<UserAlertPreviewDto>(`${this._config.config.data}Alert/GetAlertsPreview?userAlert=${userAlert}`).toPromise();
    }
}
