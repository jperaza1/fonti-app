export class InvoiceSaleDto {
  id: number;
  customerId: number;
  customer: string;
  correlativeId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  taxableAmount: number;
  taxableAmount18: number;
  exemptAmount: number;
  discount: number;
  subTotal: number;
  taxAmount: number;
  tax18Amount: number;
  total: number;
  balance: number;
  dueDate: Date;
  paid: boolean;
  paidAt: Date;
  paidUser: string;
  paymentType: number;
  paymentTypeName: string;
  paymentStatus: number;
  paymentStatusName: string;
  details: SaleInvoiceDetailDto[];
  creationTime: Date;
  creatorUser: string;
}

export class SaleInvoiceDetailDto
{
    id: number;
    saleInvoiceId: number;
    saleId: number;
    routeId: number;
    routeName: string;
    saleTypeName: string;
    saleDate: Date;
    amount: number;
    isActive: boolean;
}