export class FilterOfficeRequisitionDto {
  cafeteriaId: number;
  status: number;
  startDate: Date;
  endDate: Date;

  constructor() {
    this.cafeteriaId = 0;
    this.status = 0;
    this.startDate = new Date();
    this.endDate = new Date();
  }
}