export class FilterInvoiceSaleDto {
  paymentType: number;
  paymentStatus: number;
  dateFrom: Date;
  dateTo: Date;
  customerId: number;

  constructor() {
    this.paymentType = 0;
    this.paymentStatus = 0;
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.customerId = 0;
  }
}