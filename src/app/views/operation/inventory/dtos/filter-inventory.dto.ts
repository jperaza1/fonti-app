export class FilterInventoryDto {
  cafeteriaId: number;
  startDate: Date;
  endDate: Date;

  constructor() {
    this.cafeteriaId = 0;
    this.startDate = new Date();
    this.endDate = new Date();
  }
}