export class ExpenseFilterDto {
  categoryId: number;
  subCategoryId: number;
  dateFrom: Date;
  dateTo: Date;

  constructor() {
    this.categoryId = 0;
    this.subCategoryId = 0;
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }
}
