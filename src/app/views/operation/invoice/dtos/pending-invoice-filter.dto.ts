export class PendingInvoiceFilterDto {
  startDate: Date;
  endDate: Date;

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
  }
}