export class DispatchControlFilterDto {
  dateFrom: Date;
  dateTo: Date;
  routeId: number;

  constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.routeId = 0;
  }
}