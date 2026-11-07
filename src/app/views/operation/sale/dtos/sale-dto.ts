export class SaleDto {
 id: number;
 customerId: number;
 customer: string;
 customerName: string;
 routeId: number;
 route: string;
 vendor: string;
 saleType: number;
 saleTypeName: string;
 saleDate: Date;
 amount: number;
 isActive: boolean;
 saleInvoiceId: number;
 invoiceNumber: string;
 saleDetails: SaleDetailModel[];
 hasDispatchControl: boolean;
 dispatchSummary: SaleDispatchProductModel[];

  constructor() {
    this.id = 0;
    this.saleType = 0; 
    this.amount = 0;
    this.saleDetails = [];
    this.dispatchSummary = [];
    this.hasDispatchControl = false;
    this.vendor = '';
    this.saleDate = new Date(); 
  }
  
}

export class SaleDetailModel {
  id: number;
  saleId: number;
  productId: number;
  product: string;
  price: number;
  quantity: number;
  total: number;

  constructor() {
    this.id = 0;
    this.quantity = 0;
    this.total = 0;
  }
}

export class SaleDispatchProductModel {
  product: string;
  quantity: number;
}