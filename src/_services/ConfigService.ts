import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export class Config {
    auth: string;
    report: string;
    data: string;
    document: string;
    payment: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    config: Config;

    constructor(private http: HttpClient) { }

    async loadConfig() {
        const config = await this.http
            .get<Config>(environment.configUrl)
            .toPromise();
        this.config = config;
    }
}