export class InvoiceFilterDto {
  paymentType: number;
  paymentStatus: number;
  routeId: number;
  vendorId: number;
  dateFrom: Date;
  dateTo: Date;

  constructor() {
    this.paymentType = 0;
    this.paymentStatus = 0;
    this.routeId = 0;
    this.vendorId = 0;
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }
}
