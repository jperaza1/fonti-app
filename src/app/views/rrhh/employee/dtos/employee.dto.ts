import { RequestVacationDto } from "./request-vacation.dto";

export class EmployeeDto {
  id: number;
  firstName: string;
  lastName: string;
  identification: string;
  birthDay: Date;
  gender: number;
  genderName: string;
  phoneNumber: string;
  birthPlace: string;
  profession: string;
  address: string;
  employmentStatus: number;
  employmentStatusName: string;
  employmentType: number;
  employmentTypeName: string;
  salary: number;
  positionId: number;
  position: string;
  cafeteriaId: number;
  cafeteria: string;
  uniformSizeId: number;
  uniformSize: string;
  shift: number;
  shiftName: string;
  payFrequency: number;
  payFrequencyName: string;

  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactAddress: string;
  emergencyContactRelationship: string;

  startDate: Date;
  endDate: Date;
  permanentStartDate: Date;
  terminationDate: Date;
  totalVacation: number;

  vacationRequested: RequestVacationDto[] = [];
}