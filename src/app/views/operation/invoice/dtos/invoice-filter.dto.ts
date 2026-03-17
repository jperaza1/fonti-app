export class InvoiceFilterDto {
  invoiceType: number;
  paymentType: number;
  paymentStatus: number;
  cafeteriaId: number;
  vendorId: number;
  dateFrom: Date;
  dateTo: Date;

  constructor() {
    this.invoiceType = 0;
    this.paymentType = 0;
    this.paymentStatus = 0;
    this.cafeteriaId = 0;
    this.vendorId = 0;
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }
}
