export class PaymentDto {
  id: number;
  reference: string;
  paymentDate: Date;
  cafeteria: string;
  cafeteriaId: number;
  paymentStatus: number;
  paymentStatusName: string;
  amount: number;
  invoiceCount: number;
  bankReference: string;
  notes: string;
  details: PaymentDetailDto[];
  bankAccountId: number;
  bankAccount: string;
}

export class PaymentDetailDto {
  id: number;
  paymentId: number;
  invoiceId: number;
  invoiceNumber: string;
  amount: number;
  remainingDays: number;
  vendorName: string;
  vendorId: number;
  invoiceDate: Date;
  description: string;
  invoiceNote: string;
  bankName: string;
  bankAccount: string;
}