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
  total: number;
  isActive: boolean;
  vendorId: number;
  vendorName: string;
  routeId: number;
  routeName: string;
  /** Con datos cuando isInvoice es true; en API puede ir null si no aplica. */
  expenseInvoice: ExpenseInvoiceDto | null;
}
