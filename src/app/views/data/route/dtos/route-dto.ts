export class RouteDto {
  id: number;
  name: string;
  isActive: boolean;
  productRoutePrices: ProductRoutePricesDto[];

  constructor() {
    this.productRoutePrices = [];
  }
}

export class ProductRoutePricesDto {
  id: number;
  routeId: number;
  productId: number;
  productName: string;
  price: number;
}
