export class RequestVacationDto {
  id: number;
  employeeId: number;
  employeeName: string;
  requestType: number;
  requestTypeName: string;
  startDate: Date;
  endDate: Date;
  notes: string;
  totalDays: number;
}