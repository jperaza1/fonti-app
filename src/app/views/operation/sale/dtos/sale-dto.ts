export class SaleDto {
 id: number;
 routeId: number;
 route: string;
 saleType: number;
 saleTypeName: string;
 saleDate: Date;
 amount: number;
 isActive: boolean;
 saleDetails: SaleDetailModel[];

  constructor() {
    this.id = 0;
    this.saleType = 0; 
    this.amount = 0;
    this.saleDetails = [];
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