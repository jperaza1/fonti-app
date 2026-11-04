export class PaymentScheduleDto {
  id: number;
  date: Date;
  descripcion: string;
  detailCount: number;
  accumulatedAmount: number;
  projectedAmount: number;
  realAmount: number;
  pendingAmount: number;
  canAddDetails: boolean;
  details: PaymentScheduleDetailDto[] = [];
}

export class PaymentScheduleDetailDto {
  id: number;
  paymentScheduleId: number;
  vendor: string;
  descripcion: string;
  accumulatedAmount: number;
  projectedAmount: number;
  realAmount: number;
  pendingAmount: number;
  status: number;
  statusName: string;
  fromPreviousSchedule: boolean;
}

export class PaymentScheduleCarryForwardDto {
  previousScheduleId: number;
  previousDate: Date;
  previousDescripcion: string;
  details: PaymentScheduleDetailDto[] = [];
}

export class RegisterPaymentScheduleDetailDto {
  detailId: number;
  realAmount: number;
}

export class AddPaymentScheduleDetailsDto {
  paymentScheduleId: number;
  details: PaymentScheduleDetailDto[] = [];
}
