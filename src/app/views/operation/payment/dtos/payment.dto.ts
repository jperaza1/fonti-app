export class PaymentDto {
  id: number;
  invoiceId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: number;
  paymentMethodName: string;
}