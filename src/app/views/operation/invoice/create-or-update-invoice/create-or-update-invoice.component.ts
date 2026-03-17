import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PurchaseOrderInvoiceDto } from '../dtos/purchase-order-invoice.dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { InvoiceService } from '../invoice.service';
import { TypeService } from '../../../data/type/type.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { User } from '../../../../../_models/user';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { VendorService } from '../../../data/vendor/vendor.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { VendorDto } from '../../../data/vendor/dtos/vendor-dto';

@Component({
  selector: 'app-create-or-update-invoice',
  templateUrl: './create-or-update-invoice.component.html',
  styleUrls: ['./create-or-update-invoice.component.css']
})
export class CreateOrUpdateInvoiceComponent extends AppComponentBase implements OnInit {
  Model: PurchaseOrderInvoiceDto = new PurchaseOrderInvoiceDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = "Agregar Factura";
  orderStatus: number;
  DxDataSourceInvoiceType: any = {};
  DxDataSourceCategoryType: any = {};
  DxDataSourcePaymentMethod: any = {};
  DxDataSourceCafeteria: any = {};
  DxDataSourceVendor: any = {};

  currentUser: User;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _enumService: EnumDefinitionsService,
    private _invoiceService: InvoiceService,
    private _cafeteriaService: CafeteriaService,
    private _vendorService: VendorService,
    private _typeService: TypeService,
    private _authenticationService: AuthenticationService
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
  }

  ngOnInit(): void {
  }

  async initializeView() {
    this.errors = {};
    await this.getInvoiceType();
    await this.getCategoryType();
    await this.getPaymentMethod();
    await this.getCafeterias();
    await this.getVendors();
  }

  async getInvoiceType() {
    const response = await this._enumService.getPaymentType();
    this.DxDataSourceInvoiceType = this.getDataSourceDx(response);
  }

  async getPaymentMethod() {
    const response = await this._enumService.getPaymentMethod();
    console.log(response);
    this.DxDataSourcePaymentMethod = this.getDataSourceDx(response);
  }

  async getCategoryType() {
    let response = await this._typeService.getAciteTypesByGroupCode("EXPENSE_INVOICE_CATEGORY");
    response = response.filter(x => x.name != "Contado");
    console.log(response);
    this.DxDataSourceCategoryType = this.getDataSourceDx(response);
  }

  async getCafeterias() {
    const response = await this._cafeteriaService.getActives();
    this.DxDataSourceCafeteria = this.getDataSourceDx(response);
  }

  async getVendors() {
    const response = await this._vendorService.getActives();
    this.DxDataSourceVendor = this.getDataSourceDx(response);
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
    this.title = "Agregar Factura";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new PurchaseOrderInvoiceDto();
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
    var response = await this._invoiceService.addInvoice(this.Model);
    this.validResponse(response);
  }

  close() {
    this.entityComponent.close();
  }

  onAmountChanged(e: any) {
    this.Model.taxAmount = this.Model.taxableAmount * 0.15;
    this.Model.subTotal = this.Model.taxableAmount + this.Model.exemptAmount - this.Model.discount;
    this.Model.total = this.Model.subTotal + this.Model.taxAmount;
  }

  onTaxAmountChanged(e: any) {
    this.Model.subTotal = this.Model.taxableAmount + this.Model.exemptAmount - this.Model.discount;
    this.Model.total = this.Model.subTotal + this.Model.taxAmount;
  }

  onVendorItemClick(item: VendorDto) {
    console.log(item);
    this.Model.hasInvoice = item.hasInvoice;
    if(!this.Model.hasInvoice) {
      this.Model.invoiceNumber = "";
    }
  }

}
