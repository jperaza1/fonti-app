import { DetailStatusEnum } from "../../../../../_enums/detail-status.enum";

export class PurchaseOrderDto {
  id: number;
  reference: string;
  vendor: string;
  vendorId: number;
  cafeteria: string;
  cafeteriaId: number;
  total: number;
  quantity: number;
  date: Date;
  orderStatusName: string;
  orderStatus: number;
  reason: string;
  reasonCanceled: string;
  canceledUser: string;
  canceledAt: Date;
  hasInvoice: boolean;
  details: PurchaseOrderDetailDto[];
  typeInoice: string;

  constructor() {
    this.details = [];
    this.date = new Date();
    this.orderStatus = 1;
  }
}

export class PurchaseOrderDetailDto {
  id: number;
  purchaseOrderId: number;
  productId: number;
  product: string;
  cost: number;
  quantity: number;
  subTotal: number;
  tax: number;
  taxPercentage: number;
  discount: number;
  discountPercentage: number;
  total: number;
  detailStatus: DetailStatusEnum;
  costRecived: number;
  taxRecived: number;
  quantityRecived: number;
  discountRecived: number;
  totalRecived: number;
  subTotalRecived: number;
}