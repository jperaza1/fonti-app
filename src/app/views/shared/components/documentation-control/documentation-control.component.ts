import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { ConfigService } from '../../../../../_services/ConfigService';
import { DocumentationService } from '../../../../../_services/documentation.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { TypeDto } from '../../../data/type/dtos/type-dto';
import { TypeService } from '../../../data/type/type.service';
import { DocumentationDto } from '../../models/documentation-dto';
import { LocalDocumentationDto } from '../../models/local-documentation-dto';
import { CreateDocumentTypeComponent } from '../create-document-type/create-document-type.component';

@Component({
  selector: 'app-documentation-control',
  templateUrl: './documentation-control.component.html',
  styleUrls: ['./documentation-control.component.css']
})
export class DocumentationControlComponent extends AppComponentBase implements OnChanges {

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUpload: EventEmitter<any> = new EventEmitter<any>();

  @Input() Entity: string;
  @Input() EntityId: number;
  TenantId: number;
  User: string;
  DataSource: DocumentationDto[] = [];
  DxDataSourceTypes: any = {};
  Files: any[] = [];

  DocumentType: TypeDto;

  @ViewChild("createDocumentType") createDocumentType: CreateDocumentTypeComponent;

  constructor(private _authenticationService: AuthenticationService,
    private _typeService: TypeService,
    private _documentationService: DocumentationService,
    private _configService: ConfigService) {
    super();
    this.TenantId = this._authenticationService.currentUserValue.tenantId;
    this.User = this._authenticationService.currentUserValue.fullName;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.EntityId) {
      if (!this.isEmptyOrNullNumber(this.EntityId)) {
        this.getTypes();
        this.getDocuments();
      }
    }
  }
  async getDocuments(emit: boolean = false) {
    this.DataSource = await this
      ._documentationService
      .getDocuments(this.TenantId, this.EntityId, this.Entity);
      if(emit) this.onUpload.emit(this.DataSource.map(c => c.attachmentType));
      
  }
  async getTypes() {
    let types = await this._typeService.getAciteTypesByGroupCode(`DOCUMENT_TYPE_${this.Entity}`);
    this.DxDataSourceTypes = this.getDataSourceDx(types);
  }
  onChangeFile(file: any) {
    let uploadUrl =
      `${this._configService.config.document}Attachment/Upload?attachmentType=${this.DocumentType.code}&tenantId=${this.TenantId}&key=${this.EntityId}&entity=${this.Entity}&user=${this.User}`;
    uploadUrl = uploadUrl.replace(/[?&]$/, "");
    file.component.option("uploadUrl", uploadUrl);
  }
  onItemClickType(type: TypeDto) {
    this.DocumentType = type;
  }
  async onUploaded(e: any) {
    let idx = this.Files.findIndex(c => c == e.file);
    if (idx >= 0) {
      this.Files.splice(idx, 1);
      if (this.Files.length <= 0) {
        this.getDocuments(true);
        
      }
    }
    await this._documentationService.createLocal(new LocalDocumentationDto(this.Entity,
      this.EntityId, this.DocumentType.code, e.file.name, 0));
  }
  onShowDocument(id: number, data: DocumentationDto) {
    const newWindow = window.open(`${this._configService.config.document}Attachment/GetAttachmentById?id=${id}`, '_blank');
    newWindow.document.title = data.name;
  }
  async delete(doc: DocumentationDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._documentationService.delete(doc.idAttachment);
      if (disableResponse.status === true) {
        await this._documentationService.deleteLocal(this.Entity, this.EntityId, doc.attachmentType, doc.name);
        let idx = this.DataSource.findIndex(c => c.idAttachment == doc.idAttachment);
        this.DataSource.splice(idx, 1);
        this.onDelete.emit([doc.attachmentType]);
      }
    }
  }

  addNewDocument(){
    this.createDocumentType.quickCreate(`DOCUMENT_TYPE_${this.Entity}`)
  }
}
