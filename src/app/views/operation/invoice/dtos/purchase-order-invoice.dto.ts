import { PaymentType } from "../../../../../_enums/payment-type.enum";
import { PaymentDto } from "../../payment/dtos/payment.dto";


export class PurchaseOrderInvoiceDto {
  id: number;
  purchaseOrderId: number;
  invoiceNumber: string;
  description: string;
  invoiceDate: Date;
  taxableAmount: number;
  exemptAmount: number;
  discount: number;
  subTotal: number;
  taxAmount: number;
  total: number;
  balance: number;
  dueDate: Date;
  paid: boolean;
  paidAt: Date;
  paidUser: string;
  paymentType: PaymentType;
  paymentTypeName: string;
  vendorName: string;
  paymentStatus: number;
  paymentStatusName: string;
  routeId: number;
  route: string;
  vendorId: number;
  remainingDays: number;
  payments: PaymentDto[];
  categoryId: number;
  category: string;
  paymentMethod: number;
  hasInvoice: boolean;
  hasFile: boolean;
  documentId: number;
  fileUploadedUser: string;
  fileUploadedAt: Date;
  isRefound: boolean;
  truckName: string;
  truckId: number;
  bankName: string;
  bankAccount: string;


  constructor() {
    this.payments = [];
    this.taxableAmount = 0;
    this.exemptAmount = 0;
    this.discount = 0;
    this.subTotal = 0;
    this.taxAmount = 0;
    this.total = 0;
    this.balance = 0;
    this.hasInvoice = true;
  }
}