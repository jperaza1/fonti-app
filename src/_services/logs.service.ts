import { Injectable } from "@angular/core";
import { ConfigService } from './ConfigService';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LogsService {

  constructor(private http: HttpClient,
    private _config: ConfigService) { }


    getByEntity(entity: string, entityId: number): Promise<any[]> {
      return this.http
        .get<any[]>(
          `${this._config.config.data}DataChangeLog/GetByEntity?entity=${entity}&entityId=${entityId}`
        )
        .toPromise();
    }

}