export class CorrelativeDto {
  id: number;
  cai: string;
  start: number;
  end: number;
  startDate: Date;
  endDate: Date;
  current: number;
  emissionPoint: string;
  establishment: string;
  documentType: string;
  isActive: boolean;

  constructor() {
    this.id = 0;
    this.cai = '';
    this.start = 0;
    this.end = 0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.current = 0;
    this.emissionPoint = '';
    this.establishment = '';
    this.documentType = '';
    this.isActive = true;
  }
}
