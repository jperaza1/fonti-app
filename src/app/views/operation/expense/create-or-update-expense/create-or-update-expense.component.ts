import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  HostListener,
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from '../../../../../_services/ConfigService';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { RouteDto } from '../../../data/route/dtos/route-dto';


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
  DxDataSourcePaymentType: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  invoiceAttachmentFile: File | null = null;
  invoiceUploaderFiles: any[] = [];

  private invoicePreviewBlobUrl: string | null = null;
  invoicePreviewSafeUrl: SafeResourceUrl | null = null;
  invoicePreviewIsImage = true;

  showImageLightbox = false;
  lightboxUrl: SafeResourceUrl | null = null;
  lightboxIsImage = true;

  documentUrl: SafeResourceUrl | null = null;
  documentIsImage = true;

  constructor(
    private _expenseService: ExpenseService,
    private _categoryService: CategoryService,
    private _vendorService: VendorService,
    private _routeService: RouteService,
    private _configService: ConfigService,
    private _sanitizer: DomSanitizer,
    private _enumDefinitionsService: EnumDefinitionsService
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

  onExpenseDateChanged(e?: any) {
    if (e && 'value' in e) {
      this.Model.date = e.value;
    }
    if (this.Model.isInvoice) {
      this.syncInvoiceDateFromExpenseDate();
    }
  }

  onInvoiceDateChanged(e?: any) {
    const inv = this.ensureExpenseInvoice();
    if (e && 'value' in e) {
      inv.invoiceDate = e.value;
    }
    this.syncExpenseDateFromInvoiceDate();
  }

  private syncInvoiceDateFromExpenseDate() {
    const inv = this.ensureExpenseInvoice();
    const expenseDate = this.toDateOrNull(this.Model.date);
    if (!this.areSameDateValue(inv.invoiceDate, expenseDate)) {
      inv.invoiceDate = expenseDate as any;
    }
  }

  private syncExpenseDateFromInvoiceDate() {
    const inv = this.ensureExpenseInvoice();
    const invoiceDate = this.toDateOrNull(inv.invoiceDate);
    if (!this.areSameDateValue(this.Model.date, invoiceDate)) {
      this.Model.date = invoiceDate as any;
    }
  }

  private toDateOrNull(value: Date | string | null | undefined): Date | null {
    if (!value) {
      return null;
    }
    const date = new Date(value as any);
    return isNaN(date.getTime()) ? null : date;
  }

  private areSameDateValue(
    first: Date | string | null | undefined,
    second: Date | string | null | undefined
  ): boolean {
    const firstDate = this.toDateOrNull(first);
    const secondDate = this.toDateOrNull(second);
    if (!firstDate && !secondDate) {
      return true;
    }
    if (!firstDate || !secondDate) {
      return false;
    }
    return firstDate.getFullYear() === secondDate.getFullYear()
      && firstDate.getMonth() === secondDate.getMonth()
      && firstDate.getDate() === secondDate.getDate();
  }

  onInvoiceAttachmentChanged(e: any) {
    const files = e?.value as File[];
    this.invoiceAttachmentFile = files?.length ? files[0] : null;
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
      this.ensureExpenseInvoice();
      this.syncInvoiceDateFromExpenseDate();
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
    await this.loadPaymentTypes();
  }

  async loadPaymentTypes() {
    const response = await this._enumDefinitionsService.getPaymentType();
    this.DxDataSourcePaymentType = this.getDataSourceDx(response);
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

  onRouteItemClick(route: RouteDto) {
    console.log(route);
    this.Model.truckId = route.truckId;
    this.Model.truckName = route.truck;
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
    m.paymentType = 0;
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
      inv.invoiceNumber = inv.invoiceNumber || this.Model.invoiceNumber || '';
      inv.invoiceId = inv.invoiceId || this.Model.invoiceId || 0;
      this.Model.invoiceId = inv.invoiceId;
      this.Model.invoiceNumber = inv.invoiceNumber;
      inv.paymentType = inv.paymentType || this.Model.paymentType || 0;
      inv.isRefund = !!inv.isRefund;
      this.Model.paymentType = inv.paymentType;
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
    this.refreshDocumentPreview();
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
      payload.paymentType = payload.expenseInvoice.paymentType;
      payload.expenseInvoice.isRefund = !!payload.expenseInvoice.isRefund;
    } else {
      payload.expenseInvoice = null;
      payload.paymentType = 0;
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
      this.syncInvoiceDateFromExpenseDate();
      this.onInvoiceAmountChanged();
      if (this.isEmptyOrNullString((inv.invoiceNumber || '').trim())) {
        this.error('Validación', 'El número de factura es requerido');
        return;
      }
      if (!inv.invoiceDate) {
        this.error('Validación', 'La fecha de factura es requerida');
        return;
      }
      if (this.isEmptyOrNullNumber(inv.paymentType)) {
        this.error('Validación', 'El tipo de pago es requerido');
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

    const formData = this.buildCreateExpenseFormData();

    if (this.isEmptyOrNullNumber(this.Model.id)) {
      const res = await this._expenseService.create(formData);
      if (res.success) {
        this.resetInvoiceUploader();
      }
      this.validResponse(res);
    } else {
      //const res = await this._expenseService.update(payload, this.Model.id);
      //this.validResponse(res);
    }
  }

  private appendFormField(
    fd: FormData,
    key: string,
    value: string | number | boolean | null | undefined
  ) {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value === 'string' && value === '') {
      return;
    }
    fd.append(key, String(value));
  }

  private appendFormDate(fd: FormData, key: string, d: Date | null | undefined) {
    if (!d) {
      return;
    }
    const dt = new Date(d);
    if (isNaN(dt.getTime())) {
      return;
    }
    fd.append(key, dt.toISOString());
  }

  private buildCreateExpenseFormData(): FormData {
    const fd = new FormData();
    const e = this.Model;

    if (e.vendorId != null && !this.isEmptyOrNullNumber(Number(e.vendorId))) {
      fd.append('VendorId', String(e.vendorId));
    }

    fd.append('CategoryId', String(e.categoryId));
    fd.append('SubCategoryId', String(e.subCategoryId));
    fd.append('RouteId', String(e.routeId));
    if (e.truckId != null && !this.isEmptyOrNullNumber(Number(e.truckId))) {
      fd.append('TruckId', String(e.truckId));
    }
    if (e.notes != null && e.notes !== '') {
      fd.append('Notes', e.notes);
    }
    this.appendFormDate(fd, 'Date', e.date);
    this.appendFormField(fd, 'IsInvoice', e.isInvoice);
    fd.append('Total', String(e.total));

    if (e.isInvoice) {
      const inv = e.expenseInvoice;
      const prefix = 'ExpenseInvoice.';
      e.paymentType = inv.paymentType;
      this.appendFormField(fd, 'PaymentType', inv.paymentType);
      this.appendFormDate(fd, `${prefix}InvoiceDate`, inv.invoiceDate);
      this.appendFormField(fd, `${prefix}InvoiceNumber`, inv.invoiceNumber);
      this.appendFormField(fd, `${prefix}PaymentType`, inv.paymentType);
      this.appendFormField(fd, `${prefix}IsRefund`, !!inv.isRefund);
      this.appendFormField(fd, `${prefix}TaxableAmount`, inv.taxableAmount);
      this.appendFormField(fd, `${prefix}ExemptAmount`, inv.exemptAmount);
      this.appendFormField(fd, `${prefix}Discount`, inv.discount ?? 0);
      this.appendFormField(fd, `${prefix}SubTotal`, inv.subTotal);
      this.appendFormField(fd, `${prefix}TaxAmount`, inv.taxAmount);
      this.appendFormField(fd, `${prefix}Total`, inv.total);
    }

    if (this.invoiceAttachmentFile) {
      fd.append('invoiceFile', this.invoiceAttachmentFile, this.invoiceAttachmentFile.name);
    }

    return fd;
  }


  onInvoiceLinkClick(event: Event): void {
    event.preventDefault();
    const invoiceId = this.Model?.invoiceId || this.Model?.expenseInvoice?.invoiceId;
    window.open(`/invoice/view/${invoiceId}`, '_blank');
  }

  close() {
    this.entityComponent.close();
  }

  @ViewChild('vendorModal') vendorModal: CreateOrUpdateVendorComponent;

  showNewVendorModal() {
    this.vendorModal.showAdd();
  }

  private resetInvoiceUploader() {
    this.invoiceAttachmentFile = null;
    this.invoiceUploaderFiles = [];
  }

  get hasDocumentPreview(): boolean {
    const docId = this.Model?.documentId;
    return docId != null && Number(docId) > 0;
  }

  private refreshDocumentPreview(): void {
    if (this.hasDocumentPreview) {
      this.documentUrl = this.getDocumentUrl(Number(this.Model.documentId));
      this.documentIsImage = true;
    } else {
      this.documentUrl = null;
    }
  }

  getDocumentUrl(id: number): SafeResourceUrl {
    if (!this._configService?.config?.document || !id) {
      return this._sanitizer.bypassSecurityTrustResourceUrl('');
    }
    const url = `${this._configService.config.document}Attachment/GetAttachmentById?id=${id}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onDocumentImageError(): void {
    this.documentIsImage = false;
  }

  onLightboxImageError(): void {
    this.lightboxIsImage = false;
  }

  openDocumentLightbox(): void {
    if (!this.documentUrl) {
      return;
    }
    this.lightboxUrl = this.documentUrl;
    this.lightboxIsImage = this.documentIsImage;
    this.showImageLightbox = true;
  }

  openInvoiceDraftLightbox(): void {
    if (!this.invoicePreviewSafeUrl) {
      return;
    }
    this.lightboxUrl = this.invoicePreviewSafeUrl;
    this.lightboxIsImage = this.invoicePreviewIsImage;
    this.showImageLightbox = true;
  }

  closeImageLightbox(): void {
    this.showImageLightbox = false;
    this.lightboxUrl = null;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showImageLightbox) {
      this.closeImageLightbox();
    }
  }

}
