export class InvoicePaymentDto {
  id: number;
  invoiceId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: number;
  paymentMethodName: string;
}