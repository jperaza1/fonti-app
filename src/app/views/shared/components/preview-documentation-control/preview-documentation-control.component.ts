import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { ConfigService } from '../../../../../_services/ConfigService';
import { DocumentationService } from '../../../../../_services/documentation.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DocumentationDto } from '../../models/documentation-dto';
import { OptionButton } from '../../models/option-button';
import { ModalWithOptionButtonsComponent } from '../modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-preview-documentation-control',
  templateUrl: './preview-documentation-control.component.html',
  styleUrls: ['./preview-documentation-control.component.css']
})
export class PreviewDocumentationControlComponent extends AppComponentBase implements OnInit {
  TenantId: number;
  DataSource: DocumentationDto[] = [];
  OptionButtons: OptionButton[];
  @Input() Entity: string;
  @Input() EntityId: number;
  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;

  constructor(
    private _authenticationService: AuthenticationService,
    private _documentationService: DocumentationService,
    private _configService: ConfigService
  ) { 
    super();
    this.TenantId = this._authenticationService.currentUserValue.tenantId;
  }

  ngOnInit() {
  }

  async getDocuments() {
    this.DataSource = await this
      ._documentationService
      .getDocuments(this.TenantId, this.EntityId, this.Entity);
  }

  async showModal(){
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times")
    ]
    await this.getDocuments();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "close":
        this.close();
        break;
    }
  }

  onShowDocument(id: number) {
    window.open(`${this._configService.config.document}Attachment/GetAttachmentById?id=${id}`, '_blank');
  }

  close() {
    this.entityComponent.close();
  }

}
