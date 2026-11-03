import { ExpenseInvoiceDto } from './expense-invoice.dto';

export class ExpenseDto {
  id: number;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  notes: string;
  date: Date;
  isInvoice: boolean;
  invoiceId: number;
  invoiceNumber: string;
  paymentType: number;
  truckId: number;
  truckName: string;
  total: number;
  isActive: boolean;
  vendorId: number;
  vendorName: string;
  routeId: number;
  routeName: string;
  documentId: number;
  /** Con datos cuando isInvoice es true; en API puede ir null si no aplica. */
  expenseInvoice: ExpenseInvoiceDto | null;

  constructor() {
    this.id = 0;
  }
}
