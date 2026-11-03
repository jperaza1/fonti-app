/**
 * Datos de factura asociados a un gasto (montos e ISV alineados con PurchaseOrderInvoiceDto).
 */
export class ExpenseInvoiceDto {
  invoiceId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  paymentType: number;
  isRefund: boolean;
  taxableAmount: number;
  exemptAmount: number;
  discount: number;
  subTotal: number;
  taxAmount: number;
  total: number;

  constructor() {
    this.invoiceId = 0;
    this.invoiceNumber = '';
    this.paymentType = 2;
    this.isRefund = false;
    this.taxableAmount = 0;
    this.exemptAmount = 0;
    this.discount = 0;
    this.subTotal = 0;
    this.taxAmount = 0;
    this.total = 0;
  }
}
