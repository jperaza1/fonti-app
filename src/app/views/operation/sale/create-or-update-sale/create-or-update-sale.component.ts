import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../../shared/models/option-button';
import { ProductDto } from '../../../data/product/dtos/product-dto';
import { SaleDto } from '../dtos/sale-dto';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { TypeService } from '../../../data/type/type.service';
import { SaleService } from '../sale.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { User } from '../../../../../_models/user';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { CafeteriaDto } from '../../../data/cafeteria/dtos/cafeteria-dto';
import { RegisterService } from '../../../data/register/register.service';
import { CustomerService } from '../../../data/customer/customer.service';

@Component({
  selector: 'app-create-or-update-sale',
  templateUrl: './create-or-update-sale.component.html',
  styleUrls: ['./create-or-update-sale.component.css']
})
export class CreateOrUpdateSaleComponent extends AppComponentBase implements OnInit {
  Model: SaleDto = new SaleDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = "Producto";

  DxDataSourceCafeteria: any = {};
  DxDataSourceSaleType: any = {};
  DxDataSourceCategory: any = {};
  DxDataSourceProductType: any = {};
  DxDataSourceRegister: any = {};
  DxDataSourceServicePeriod: any = {};
  DxDataSourceCustomer: any = {};
  currentUser: User;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _saleService: SaleService,
    private _typeService: TypeService,
    private _cafeteriaService: CafeteriaService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _authenticationService: AuthenticationService,
    private _registerService: RegisterService,
    private _customerService: CustomerService
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

  async getCafeterias() {
    const response = await this._cafeteriaService.getAll();
    this.DxDataSourceCafeteria = this.getDataSourceDx(response);
  }

  async getSaleTypes() {
    const response = await this._enumDefinitionsService.getSaleType();
    this.DxDataSourceSaleType = this.getDataSourceDx(response);
  }

  async getCategories() {
    const response = await this._typeService.getAciteTypesByGroupCode("SALE_CATEGORY");
    this.DxDataSourceCategory = this.getDataSourceDx(response);
  }

  async getProductTypes() {
    const response = await this._typeService.getAciteTypesByGroupCode("SALE_PRODUCT_TYPE");
    this.DxDataSourceProductType = this.getDataSourceDx(response);
  }

  async getServicePeriods() {
    const response = await this._typeService.getAciteTypesByGroupCode("SERVICE_PERIOD");
    this.DxDataSourceServicePeriod = this.getDataSourceDx(response);
  }

  async getCustomers(cafeteriaId: number) {
    const response = await this._customerService.getByCafeteriaId(cafeteriaId);
    this.DxDataSourceCustomer = this.getDataSourceDx(response);
  }

  async initializeView() {
    this.errors = {};
    await this.getCafeterias();
    await this.getSaleTypes();
    await this.getCategories();
    await this.getProductTypes();
    await this.getServicePeriods();
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

  async showUpdate(data: SaleDto) {
    this.title = "Editar Venta";
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._saleService.getById(data.id);
    await this.loadRegisters(this.Model.cafeteriaId);
    await this.getCustomers(this.Model.cafeteriaId);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = "Registrar Venta";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new SaleDto();
    this.Model.cafeteriaId = this.currentUser.cafeteriaId == null ? 0 : this.currentUser.cafeteriaId;
    if(this.Model.cafeteriaId > 0){
      await this.loadRegisters(this.Model.cafeteriaId);
      await this.getCustomers(this.Model.cafeteriaId);
    }
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

  async validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.Model = new SaleDto();
      this.Model.cafeteriaId = this.currentUser.cafeteriaId == null ? 0 : this.currentUser.cafeteriaId;
      if(this.Model.cafeteriaId > 0){
        await this.loadRegisters(this.Model.cafeteriaId);
        await this.getCustomers(this.Model.cafeteriaId);
      }
      //this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  async save() {
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      let createResponse = await this._saleService.create(this.Model);
      await this.validResponse(createResponse);

    } else {

      let updateResponse = await this._saleService.update(this.Model, this.Model.id);
      await this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }

  async onCafeteriaItemClick(itemData: CafeteriaDto) {
    this.Model.registerId = 0;
    this.Model.register = "";
    await this.loadRegisters(itemData.id);
    await this.getCustomers(itemData.id);
  }

  async loadRegisters(cafeteriaId: number) {
    let registers = await this._registerService.getByCafeteriaId(cafeteriaId);
    console.log(registers);
    this.DxDataSourceRegister = this.getDataSourceDx(registers);
  }
  
  
}
