import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CafeteriaDto } from '../dtos/cafeteria-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { CafeteriaService } from '../cafeteria.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-create-or-update-cafeteria',
  templateUrl: './create-or-update-cafeteria.component.html',
  styleUrls: ['./create-or-update-cafeteria.component.css']
})
export class CreateOrUpdateCafeteriaComponent extends AppComponentBase implements OnInit {
  Model: CafeteriaDto = new CafeteriaDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  customerId: number;

  DxDatasourceCustomers:{};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();
  
  constructor(
    private _cafeteriaService: CafeteriaService,
    private _customerService: CustomerService
  ) { 
    super();
  }

  async ngOnInit() {
    await this.initializeView();
  }

  async getAllCustomers() {
    let result = await this._customerService.getAllActive();
    this.DxDatasourceCustomers = this.getDataSourceDx(result);
  }

  async initializeView() {
    this.errors = {};
    this.getAllCustomers();
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

  async showUpdate(data: CafeteriaDto) {
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._cafeteriaService.getById(data.id);
    this.customerId = 0;
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new CafeteriaDto();
    this.customerId = 0;
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

  async save() {
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      let createResponse = await this._cafeteriaService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._cafeteriaService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }

  onItemClickCustomer(item: any) {
    console.log(item);
    console.log(this.Model.customers);
    if(!this.any(this.Model.customers, (c: any) => c.customerId == item.id)){
      this.Model.customers.push({
        id: 0,
        customerId: item.id,
        customer: item.name,
        cafeteriaId: this.Model.id
      });
    }
  }

  removeItemCustomer(customer: any) {
    this.Model.customers = this.Model.customers.filter(c => c.customerId !== customer.customerId);
  }
    
}
