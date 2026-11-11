export class SaleRouteQuantityProductDto {
  productId: number;
  name: string;
}

export class SaleRouteQuantityRowDto {
  routeId: number;
  route: string;
  vendor: string;
  quantities: number[];
}

export class SaleRouteQuantityReportDto {
  products: SaleRouteQuantityProductDto[] = [];
  rows: SaleRouteQuantityRowDto[] = [];
  totals: number[] = [];
}

export class SaleRouteQuantityFilterDto {
  dateFrom: Date;
  dateTo: Date;

  constructor() {
    const today = new Date();
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    this.dateFrom = monday;
    this.dateTo = sunday;
  }
}
