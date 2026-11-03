export class DispatchControlFilterDto {
  dateFrom: Date;
  dateTo: Date;

  constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }
}