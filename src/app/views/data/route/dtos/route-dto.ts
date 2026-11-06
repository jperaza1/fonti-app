export class RouteDto {
  id: number;
  name: string;
  vendor: string;
  order: number;
  deliversRegalia: boolean;
  isActive: boolean;
  truckId: number;
  truck: string;
  productRoutePrices: ProductRoutePricesDto[];

  constructor() {
    this.productRoutePrices = [];
    this.order = 0;
    this.vendor = '';
    this.deliversRegalia = false;
  }
}

export class ProductRoutePricesDto {
  id: number;
  routeId: number;
  productId: number;
  productName: string;
  price: number;
}
