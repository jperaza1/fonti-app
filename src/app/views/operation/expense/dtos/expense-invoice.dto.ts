/**
 * Datos de factura asociados a un gasto (montos e ISV alineados con PurchaseOrderInvoiceDto).
 */
export class ExpenseInvoiceDto {
  invoiceNumber: string;
  invoiceDate: Date;
  taxableAmount: number;
  exemptAmount: number;
  discount: number;
  subTotal: number;
  taxAmount: number;
  total: number;

  constructor() {
    this.invoiceNumber = '';
    this.taxableAmount = 0;
    this.exemptAmount = 0;
    this.discount = 0;
    this.subTotal = 0;
    this.taxAmount = 0;
    this.total = 0;
  }
}
