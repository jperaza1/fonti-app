import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppComponentBase } from '../../../../AppComponentBase';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { OptionButton } from '../../../shared/models/option-button';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { PurchaseOrderInvoiceDto } from '../../invoice/dtos/purchase-order-invoice.dto';
import { PurchaseOrderService } from '../purchase-order.service';
import { InvoiceService } from '../../invoice/invoice.service';
import { PaymentType } from '../../../../../_enums/payment-type.enum';
import { TypeService } from '../../../data/type/type.service';
import { VendorService } from '../../../data/vendor/vendor.service';
import { VendorDto } from '../../../data/vendor/dtos/vendor-dto';
import { DocumentationService } from '../../../../../_services/documentation.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { ConfigService } from '../../../../../_services/ConfigService';
import { DocumentationDto } from '../../../shared/models/documentation-dto';
import { LocalDocumentationDto } from '../../../shared/models/local-documentation-dto';
import { TypeDto } from '../../../data/type/dtos/type-dto';

@Component({
  selector: 'app-create-or-update-po-invoices',
  templateUrl: './create-or-update-po-invoices.component.html',
  styleUrls: ['./create-or-update-po-invoices.component.css']
})
export class CreateOrUpdatePoInvoicesComponent extends AppComponentBase implements OnInit {
  Model: PurchaseOrderInvoiceDto = new PurchaseOrderInvoiceDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = "Agregar Factura";
  orderStatus: number;
  DxDataSourceInvoiceType: any = {};
  DxDataSourceCategoryType: any = {};
  DxDataSourcePaymentMethod: any = {};

  vendorId: number;

  // Documentos
  DocumentsDataSource: DocumentationDto[] = [];
  DocumentFiles: any[] = [];
  TenantId: number;
  User: string;
  EntityName: string = "INVOICE";
  selectedImageIndex: number | null = null;
  selectedDocument: DocumentationDto | null = null;
  showImageLightbox = false;
  purchaseOrderInvoiceId: number;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _enumService: EnumDefinitionsService,
    private _invoiceService: InvoiceService,
    private _typeService: TypeService,
    private _vendorService: VendorService,
    private _documentationService: DocumentationService,
    private _authenticationService: AuthenticationService,
    private _configService: ConfigService,
    private _sanitizer: DomSanitizer
  ) { 
    super();
    this.TenantId = this._authenticationService.currentUserValue.tenantId;
    this.User = this._authenticationService.currentUserValue.fullName;
  }

  ngOnInit() {
  }

  async initializeView() {
    this.errors = {};
    await this.getInvoiceType();
    await this.getCategoryType();
    await this.getPaymentMethod();
  }

  async getInvoiceType() {
    const response = await this._enumService.getPaymentType();
    this.DxDataSourceInvoiceType = this.getDataSourceDx(response);
  }

  async getPaymentMethod() {
    const response = await this._enumService.getPaymentMethod();
    this.DxDataSourcePaymentMethod = this.getDataSourceDx(response);
  }

  async getCategoryType() {
    let response = await this._typeService.getAciteTypesByGroupCode("EXPENSE_INVOICE_CATEGORY");
    response = response.filter(x => x.name != "Contado");
    console.log(response);
    this.DxDataSourceCategoryType = this.getDataSourceDx(response);
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    // else
    //   permission.push("TYPES.CREATE");

    if(this.orderStatus == 3 && !this.Model.id) {
      this.OptionButtons = [
        new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
        new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
      ];
    } else {
      this.OptionButtons = [
        new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      ];
    }
  }

  async showAdd(purchaseOrderId: number, orderStatus: number, vendorId: number) {
    this.vendorId = vendorId;
    this.title = "Agregar Factura";
    this.orderStatus = orderStatus;
    await this.initializeView();
    this.Model = new PurchaseOrderInvoiceDto();
    this.setButtonOptions();
    this.Model.purchaseOrderId = purchaseOrderId;
    await this.searchVendor(vendorId);
    // Limpiar documentos al agregar nueva factura
    this.DocumentsDataSource = [];
    this.DocumentFiles = [];
    this.entityComponent.show();
  }

  async showUpdate(purchaseOrderInvoiceId: number, orderStatus: number, vendorId: number) {
    this.vendorId = vendorId;
    this.purchaseOrderInvoiceId = purchaseOrderInvoiceId;
    this.title = "Actualizar Factura";
    this.orderStatus = orderStatus;
    await this.initializeView();
    this.setButtonOptions(true);
    await this.loadInvoiceInfo();
    this.entityComponent.show();
  }

  async loadInvoiceInfo() {
    this.Model = await this._invoiceService.getById(this.purchaseOrderInvoiceId);
    await this.searchVendor(this.vendorId);
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
    this.Model.taxAmount = this.roundTo(this.Model.taxableAmount * 0.15, 3);
    this.Model.subTotal = this.Model.taxableAmount + this.Model.exemptAmount - this.Model.discount;
    this.Model.total = this.Model.subTotal + this.Model.taxAmount;
  }

  onTaxAmountChanged(e: any) {
    this.Model.subTotal = this.Model.taxableAmount + this.Model.exemptAmount - this.Model.discount;
    this.Model.total = this.Model.subTotal + this.Model.taxAmount;
  }

  async searchVendor(vendorId: number) {
    const vendor = await this._vendorService.getById(vendorId);
    this.Model.hasInvoice = vendor.hasInvoice;
    if(!this.Model.hasInvoice) {
      this.Model.invoiceNumber = "";
    }
  }

  getDocumentImageUrl(id: number): string {
    if (!this._configService?.config?.document || !id) return '';
    return `${this._configService.config.document}Attachment/GetAttachmentById?id=${id}`;
  }

  openImageLightbox() {
    this.showImageLightbox = true;
  }

  closeImageLightbox() {
    this.showImageLightbox = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showImageLightbox) this.closeImageLightbox();
  }

  onFileChanged(file: any) {
    if (this.Model.id > 0) {
      let uploadUrl =
        `${this._configService.config.document}Attachment/Upload?attachmentType=INVOICE&tenantId=${this.TenantId}&key=${this.Model.id}&entity=${this.EntityName}&user=${this.User}`;
      uploadUrl = uploadUrl.replace(/[?&]$/, "");
      file.component.option("uploadUrl", uploadUrl);
    }
  }

  async onFileUploaded(e: any) {
    let idx = this.DocumentFiles.findIndex(c => c == e.file);
    if (idx >= 0) {
      this.DocumentFiles.splice(idx, 1);
    }
    await this.loadInvoiceInfo();
  }

  onShowDocument(id: number, data: DocumentationDto) {
    const newWindow = window.open(
      `${this._configService.config.document}Attachment/GetAttachmentById?id=${id}`,
      '_blank'
    );
    newWindow.document.title = data.name;
  }

  async deleteDocument(doc: DocumentationDto) {
    let confirmResult = await this.confirm();
    if (confirmResult.value) {
      let disableResponse = await this._documentationService.delete(doc.idAttachment);
      if (disableResponse.status === true) {
        await this._invoiceService.updateInvoiceFile(this.Model.id, false);
        this.Model.hasFile = false;
        this.Model.documentId = 0;
        if (this.selectedDocument && this.selectedDocument.idAttachment === doc.idAttachment) {
          this.closeImageModal();
        }
      }
    }
  }

  async deleteDocumentById() {
    if (!this.Model.documentId) return;
    let confirmResult = await this.confirm();
    if (confirmResult.value) {
      let disableResponse = await this._documentationService.delete(this.Model.documentId);
      if (disableResponse.status === true) {
        await this._invoiceService.updateInvoiceFile(this.Model.id, false);
        this.Model.hasFile = false;
        this.Model.documentId = 0;
        this.DocumentsDataSource = [];
        this.closeImageLightbox();
      }
    }
  }

  openImageModal(doc: DocumentationDto, index: number) {
    this.selectedImageIndex = index;
    this.selectedDocument = doc;
    // Prevenir scroll del body cuando el modal está abierto
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeImageModal() {
    this.selectedImageIndex = null;
    this.selectedDocument = null;
    // Restaurar scroll del body
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  previousImage() {
    if (this.selectedImageIndex !== null && this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
      this.selectedDocument = this.DocumentsDataSource[this.selectedImageIndex];
    }
  }

  nextImage() {
    if (this.selectedImageIndex !== null && this.selectedImageIndex < this.DocumentsDataSource.length - 1) {
      this.selectedImageIndex++;
      this.selectedDocument = this.DocumentsDataSource[this.selectedImageIndex];
    }
  }

  getImageUrl(document: DocumentationDto): SafeUrl {
    if (!document.urlDocument) {
      return null;
    }
    
    // Si urlDocument ya contiene el prefijo data:image, usarlo directamente
    if (document.urlDocument.startsWith('data:image')) {
      return this._sanitizer.bypassSecurityTrustUrl(document.urlDocument);
    }
    
    // Si solo contiene base64, construir la URL completa
    const extension = document.extension || 'jpeg';
    const imageUrl = `data:image/${extension};base64,${document.urlDocument}`;
    return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  downloadImage(document: DocumentationDto) {
    if (!document.urlDocument) {
      return;
    }

    try {
      let base64Data: string;
      let mimeType: string = 'image/jpeg';
      let extension: string = document.extension || 'jpg';

      // Extraer el base64 de urlDocument
      if (document.urlDocument.startsWith('data:image')) {
        // Si ya viene con el prefijo completo, extraer el base64 y el tipo MIME
        const parts = document.urlDocument.split(',');
        if (parts.length === 2) {
          base64Data = parts[1];
          // Extraer el tipo MIME del prefijo (ej: data:image/png;base64)
          const mimeMatch = document.urlDocument.match(/data:image\/([^;]+)/);
          if (mimeMatch && mimeMatch[1]) {
            mimeType = `image/${mimeMatch[1]}`;
            extension = mimeMatch[1];
          }
        } else {
          // Si no tiene el formato esperado, usar directamente
          base64Data = document.urlDocument;
        }
      } else {
        // Si solo contiene base64, usarlo directamente
        base64Data = document.urlDocument;
        if (document.extension) {
          mimeType = `image/${document.extension}`;
          extension = document.extension;
        }
      }

      // Convertir base64 a blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // Crear enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      
      // Usar el nombre del documento o generar uno con la extensión correcta
      let fileName = document.name;
      if (!fileName || !fileName.includes('.')) {
        fileName = `documento.${extension}`;
      } else {
        // Asegurar que tenga la extensión correcta
        const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
        fileName = `${nameWithoutExt}.${extension}`;
      }
      
      link.download = fileName;
      window.document.body.appendChild(link);
      link.click();
      
      // Limpiar
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
      this.error('Error', 'No se pudo descargar la imagen');
    }
  }

}
