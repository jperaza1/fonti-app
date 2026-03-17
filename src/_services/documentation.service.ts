import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentationDto } from '../app/views/shared/models/documentation-dto';
import { LocalDocumentationDto } from '../app/views/shared/models/local-documentation-dto';
import { RequestResult } from '../_models/RequestResult';
import { ConfigService } from './ConfigService';

@Injectable({ providedIn: 'root' })
export class DocumentationService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getDocuments(tenantId: number,
        entityId: number,
        entity: string
    ): Promise<DocumentationDto[]> {
        return this
            .http
            .get<DocumentationDto[]>
            (`${this._config.config.document}Attachment/GetAttachmentByTenant?idTenant=${tenantId}&key=${entityId}&entity=${entity}&loadData=true`).
            toPromise();
    }

    delete(id: number): Promise<any> {
        return this.http.get<any>(`${this._config.config.document}Attachment/ArchiveAttachment?key=${id}`).toPromise();
    }

    createLocal(model: LocalDocumentationDto): Promise<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.data}Documentation/Create`, model).toPromise();
    }

    deleteLocal(entity: string, entityId: number, documentType: string, fileName: string): Promise<any> {
        let url = `${this._config.config.data}Documentation/Delete?entity=${entity}&entityId=${entityId}&documentType=${documentType}&fileName=${fileName}`;
        return this.http.delete<any>(url).toPromise();
    }
    
}
