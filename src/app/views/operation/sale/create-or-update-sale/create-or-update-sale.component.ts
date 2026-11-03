import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../../shared/models/option-button';
import { ProductDto } from '../../../data/product/dtos/product-dto';
import { SaleDetailModel, SaleDto } from '../dtos/sale-dto';
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
import { RouteDto } from '../../../data/route/dtos/route-dto';
import { RouteService } from '../../../data/route/route.service';
import { DxDataGridComponent } from 'devextreme-angular';

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

  DxDataSourceRoute: any = {};
  DxDataSourceSaleType: any = {};
  DxDataSourceCustomer: any = {};
  currentUser: User;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  @ViewChild('dataGrid', { static: false }) dataGrid: DxDataGridComponent;

  constructor(
    private _saleService: SaleService,
    private _routeService: RouteService,
    private _customerService: CustomerService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _authenticationService: AuthenticationService,
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
  }

  refreshDataGrid() {
    if (this.dataGrid) {
      this.dataGrid.instance.refresh();
    }
  }

  ngOnInit(): void {
  }

  async getSaleTypes() {
    const response = await this._enumDefinitionsService.getSaleType();
    this.DxDataSourceSaleType = this.getDataSourceDx(response);
  }

  async getRoutes() {
    const response = await this._routeService.getActives();
    this.DxDataSourceRoute = this.getDataSourceDx(response);
  }


  async initializeView() {
    this.errors = {};
    await this.getRoutes();
    await this.getSaleTypes();
    await this.getCustomers();
  }

  async getCustomers() {
    const response = await this._customerService.getAllActive();
    this.DxDataSourceCustomer = this.getDataSourceDx(response);
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
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = "Registrar Venta";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new SaleDto();
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

  async onRouteItemClick(itemData: RouteDto) {
    this.Model.saleDetails = [];
    var products = await this._routeService.getProductRoutePrices(itemData.id);
    console.log(products);

    for(var product of products) {
      var detail = new SaleDetailModel();
      detail.productId = product.productId;
      detail.product = product.productName;
      detail.price = product.price;
      detail.quantity = 0;
      detail.total = 0;
      this.Model.saleDetails.push(detail);
    }
  }

  onQuantityChange(e: any, data: SaleDetailModel) {
    data.total = this.roundTo(data.price * data.quantity, 3);
    this.Model.amount = this.roundTo(this.Model.saleDetails.reduce((total, detail) => total + detail.total, 0), 3);
    this.refreshDataGrid();
  }

  removeDetail(saleDetails: SaleDetailModel) {
    console.log(saleDetails);
    let result = this.Model.saleDetails.filter(item => item !== saleDetails);
    this.Model.saleDetails = result;
    this.Model.amount = this.roundTo(this.Model.saleDetails.reduce((total, detail) => total + detail.total, 0), 3);
    this.refreshDataGrid();
  }
  
}
