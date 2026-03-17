import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestResult } from "../../../_models/RequestResult";
import { ConfigService } from "../../../_services/ConfigService";
import { AlertEmailDto } from "./dtos/alert-email-dto";

@Injectable({ providedIn: 'root' })
export class AlerEmailService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getAll(): Promise<AlertEmailDto[]> {
        return this.http.get<AlertEmailDto[]>(`${this._config.config.data}AlertConfiguration/GetAll`).toPromise();
    }

    getById(id: number): Promise<AlertEmailDto> {
        return this.http.get<AlertEmailDto>(`${this._config.config.data}AlertConfiguration/GetById?id=${id}`).toPromise();
    }

    create(model: AlertEmailDto): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.data}AlertConfiguration/Create`, model).toPromise();
    }

    update(model: AlertEmailDto, id: number): Promise<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.data}AlertConfiguration/Update?id=${id}`, model).toPromise();
    }

    disable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.data}AlertConfiguration/Disable?id=${id}`).toPromise();
    }

    enable(id: number): Promise<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.data}AlertConfiguration/Enable?id=${id}`).toPromise();
    }

}