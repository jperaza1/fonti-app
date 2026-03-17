import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResult } from '../../_models/RequestResult';
import { ConfigService } from '../../_services/ConfigService';
import { VapidPublicKeyDto } from './dtos/vapid-public-key-dto';

@Injectable({ providedIn: 'root' })
export class PwaService {

    constructor(private http: HttpClient,
        private _config: ConfigService) {
    }

    getPublicKey(): Promise<VapidPublicKeyDto> {
        return this.http.get<VapidPublicKeyDto>(`${this._config.config.auth}Pwa/GetPublicKey`).toPromise();
    }

    createSubscription(subscription: any): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.auth}Pwa/InsertSubscription`, subscription).toPromise();
    }
}