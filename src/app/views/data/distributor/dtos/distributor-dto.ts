export class DistributorDto {
  id: number;
  name: string;
  isActive: boolean;
  productDistributorPrices: ProductDistributorPricesDto[];

  constructor() {
    this.productDistributorPrices = [];
  }
}

export class ProductDistributorPricesDto {
  id: number;
  distributorId: number;
  productId: number;
  productName: string;
  price: number;
}
