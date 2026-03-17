import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { SideItemDto } from '../dtos/side-item.dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { SideItemService } from '../side-item.service';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-create-or-update-side-item',
  templateUrl: './create-or-update-side-item.component.html',
  styleUrls: ['./create-or-update-side-item.component.css']
})
export class CreateOrUpdateSideItemComponent extends AppComponentBase implements OnInit {
  title: string = 'Nuevo Complemento';
  Model: SideItemDto = new SideItemDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  
  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _sideItemService: SideItemService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  async initializeView() {
    this.errors = {};
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    // else
    //   permission.push("TYPES.CREATE");

    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showAdd() {
    this.title = "Nuevo Complemento";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new SideItemDto();
    this.entityComponent.show();
  }

  async showEdit(id: number) {
    this.title = "Editar Complemento";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = await this._sideItemService.getById(id);
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.save();
        break;
      case "close":
        this.close();
        break;
    }
  }

  async save() {
    if(this.Model.id > 0) {
      const response = await this._sideItemService.update(this.Model, this.Model.id);
      this.validResponse(response);
    } else {
      const response = await this._sideItemService.create(this.Model);
      this.validResponse(response);
    }
  }

  close() {
    this.entityComponent.close();
  }

}
