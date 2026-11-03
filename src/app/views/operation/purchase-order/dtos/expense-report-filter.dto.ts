export class ExpenseReportFilterDto {
  startDate: Date;
  endDate: Date;
  filterType: number;
  vendors: number[];
  constructor() {
    this.filterType = 1;
    this.startDate = new Date();
    this.endDate = new Date();
    this.vendors = [];
  }
}

