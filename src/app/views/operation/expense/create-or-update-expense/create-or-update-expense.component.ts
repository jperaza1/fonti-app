import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ExpenseDto } from '../dtos/expense-dto';
import { ExpenseInvoiceDto } from '../dtos/expense-invoice.dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { ExpenseService } from '../expense.service';
import { CategoryService } from '../../../data/category/category.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import {
  CategoryDto,
  SubCategoryDto,
} from '../../../data/category/dtos/category-dto';
import { VendorService } from '../../../data/vendor/vendor.service';
import { CreateOrUpdateVendorComponent } from '../../../data/vendor/create-or-update-vendor/create-or-update-vendor.component';
import { RouteService } from '../../../data/route/route.service';

@Component({
  selector: 'app-create-or-update-expense',
  templateUrl: './create-or-update-expense.component.html',
  styleUrls: ['./create-or-update-expense.component.css'],
})
export class CreateOrUpdateExpenseComponent extends AppComponentBase implements OnInit {
  Model: ExpenseDto;
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Gasto';
  DxDataSourceCategory: any = {};
  DxDataSourceSubCategory: any = {};
  DxDataSourceVendor: any = {};
  DxDataSourceRoute: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _expenseService: ExpenseService,
    private _categoryService: CategoryService,
    private _vendorService: VendorService,
    private _routeService: RouteService
  ) {
    super();
    this.Model = this.newModel();
  }

  ngOnInit(): void {}

  ensureExpenseInvoice(): ExpenseInvoiceDto {
    if (!this.Model.expenseInvoice) {
      this.Model.expenseInvoice = new ExpenseInvoiceDto();
    }
    return this.Model.expenseInvoice;
  }

  /** Igual que create-or-update-invoice: ISV = 15% del gravado; total = subtotal + ISV */
  onInvoiceAmountChanged(_e?: any) {
    const inv = this.ensureExpenseInvoice();
    inv.taxAmount = (inv.taxableAmount || 0) * 0.15;
    inv.subTotal =
      (inv.taxableAmount || 0) + (inv.exemptAmount || 0) - (inv.discount || 0);
    inv.total = inv.subTotal + (inv.taxAmount || 0);
    this.syncRootTotalFromInvoice();
  }

  /** Permite ajustar manualmente el ISV y recalcular el total */
  onInvoiceTaxAmountChanged(_e?: any) {
    const inv = this.ensureExpenseInvoice();
    inv.subTotal =
      (inv.taxableAmount || 0) + (inv.exemptAmount || 0) - (inv.discount || 0);
    inv.total = inv.subTotal + (inv.taxAmount || 0);
    this.syncRootTotalFromInvoice();
  }

  syncRootTotalFromInvoice() {
    if (this.Model.isInvoice && this.Model.expenseInvoice) {
      this.Model.total = this.Model.expenseInvoice.total;
    }
  }

  onIsInvoiceChanged() {
    if (this.Model.isInvoice) {
      const inv = this.ensureExpenseInvoice();
      if (!inv.invoiceDate) {
        inv.invoiceDate = this.Model.date ? new Date(this.Model.date as any) : new Date();
      }
      this.onInvoiceAmountChanged();
    } else {
      this.Model.expenseInvoice = new ExpenseInvoiceDto();
    }
  }

  async initializeView() {
    this.errors = {};
    await this.loadCategories();
    await this.loadSubCategoriesForModel();
    await this.loadVendors();
    await this.loadRoutes();
  }

  async loadRoutes() {
    const response = await this._routeService.getActives();
    this.DxDataSourceRoute = this.getDataSourceDx(response);
  }

  async loadCategories() {
    const response = await this._categoryService.getActives();
    this.DxDataSourceCategory = this.getDataSourceDx(response);
  }

  async loadVendors() {
    const response = await this._vendorService.getActives();
    this.DxDataSourceVendor = this.getDataSourceDx(response);
  }

  async loadSubCategoriesForModel() {
    if (!this.Model.categoryId) {
      this.DxDataSourceSubCategory = this.getDataSourceDx([]);
      return;
    }
    const cat = await this._categoryService.getById(this.Model.categoryId);
    if (cat?.name) {
      this.Model.categoryName = cat.name;
    }
    const subs = cat.subCategories || [];
    this.DxDataSourceSubCategory = this.getDataSourceDx(subs);
    const match = subs.find((s) => s.id === this.Model.subCategoryId);
    if (match?.name) {
      this.Model.subCategoryName = match.name;
    }
    if (
      this.Model.subCategoryId &&
      !subs.some((s) => s.id === this.Model.subCategoryId)
    ) {
      this.Model.subCategoryId = 0;
      this.Model.subCategoryName = '';
    }
  }

  async onCategoryItemClick(item: CategoryDto) {
    if (item) {
      this.Model.subCategoryId = 0;
      this.Model.subCategoryName = '';
      const cat = await this._categoryService.getSubCategories(this.Model.categoryId);
      this.DxDataSourceSubCategory = this.getDataSourceDx(cat);
    }
  }

  onSubCategoryItemClick(item: SubCategoryDto) {
    if (item) {
      this.Model.subCategoryName = item.name;
    }
  }

  setButtonOptions() {
    const permission: string[] = [];
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', permission),
    ];
  }

  newModel(): ExpenseDto {
    const m = new ExpenseDto();
    m.isInvoice = false;
    m.isActive = true;
    m.date = new Date();
    m.total = 0;
    m.notes = '';
    m.categoryId = 0;
    m.subCategoryId = 0;
    m.categoryName = '';
    m.subCategoryName = '';
    m.expenseInvoice = new ExpenseInvoiceDto();
    m.expenseInvoice.invoiceDate = new Date();
    return m;
  }

  normalizeExpenseInvoiceFromApi() {
    if (this.Model.isInvoice) {
      if (!this.Model.expenseInvoice) {
        this.Model.expenseInvoice = new ExpenseInvoiceDto();
      }
      const inv = this.Model.expenseInvoice;
      inv.taxableAmount = inv.taxableAmount ?? 0;
      inv.exemptAmount = inv.exemptAmount ?? 0;
      inv.discount = inv.discount ?? 0;
      inv.subTotal = inv.subTotal ?? 0;
      inv.taxAmount = inv.taxAmount ?? 0;
      inv.total = inv.total ?? 0;
      inv.invoiceNumber = inv.invoiceNumber ?? '';
      if (!inv.invoiceDate) {
        inv.invoiceDate = this.Model.date
          ? new Date(this.Model.date as any)
          : new Date();
      }
      this.onInvoiceAmountChanged();
    } else {
      this.Model.expenseInvoice = this.Model.expenseInvoice || new ExpenseInvoiceDto();
    }
  }

  async showAdd() {
    this.title = 'Nuevo gasto';
    this.Model = this.newModel();
    this.setButtonOptions();
    await this.initializeView();
    this.entityComponent.show();
  }

  async showUpdate(data: ExpenseDto) {
    this.title = 'Editar gasto';
    this.setButtonOptions();
    this.Model = await this._expenseService.getById(data.id);
    this.normalizeExpenseInvoiceFromApi();
    await this.initializeView();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'save':
        this.save();
        break;
      case 'close':
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

  buildPayload(): ExpenseDto {
    const payload = { ...this.Model } as ExpenseDto;
    if (payload.isInvoice) {
      this.syncRootTotalFromInvoice();
      payload.total = payload.expenseInvoice.total;
    } else {
      payload.expenseInvoice = null;
    }
    return payload;
  }

  async save() {
    if (this.isEmptyOrNullNumber(this.Model.categoryId)) {
      this.error('Validación', 'La categoría es requerida');
      return;
    }
    if (this.isEmptyOrNullNumber(this.Model.subCategoryId)) {
      this.error('Validación', 'La subcategoría es requerida');
      return;
    }

    if (this.Model.isInvoice) {
      const inv = this.ensureExpenseInvoice();
      this.onInvoiceAmountChanged();
      if (this.isEmptyOrNullString((inv.invoiceNumber || '').trim())) {
        this.error('Validación', 'El número de factura es requerido');
        return;
      }
      if (!inv.invoiceDate) {
        this.error('Validación', 'La fecha de factura es requerida');
        return;
      }
      if (this.isEmptyOrNullNumber(inv.total)) {
        this.error('Validación', 'El total de la factura debe ser mayor a cero');
        return;
      }
    } else {
      if (this.isEmptyOrNullNumber(this.Model.total)) {
        this.error('Validación', 'El total debe ser mayor a cero');
        return;
      }
    }

    const payload = this.buildPayload();

    if (this.isEmptyOrNullNumber(this.Model.id)) {
      const res = await this._expenseService.create(payload);
      this.validResponse(res);
    } else {
      const res = await this._expenseService.update(payload, this.Model.id);
      this.validResponse(res);
    }
  }

  close() {
    this.entityComponent.close();
  }

  @ViewChild('vendorModal') vendorModal: CreateOrUpdateVendorComponent;

  showNewVendorModal() {
    this.vendorModal.showAdd();
  }

}
