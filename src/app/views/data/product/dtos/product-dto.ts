export class ProductDto {
  id: number;
  name: string;
  productType: number;
  productTypeName: string;
  isActive: boolean;
  tax: boolean;
  cost: number | null;
  unitOfMeasureId: number | null;
  unitOfMeasureName: string;
  productVendors: ProductVendorDto[];

  constructor() {
    this.productVendors = [];
  }
}

export class VendorProductDto {
  id: number;
  productId: number;
  name: string;
  cost: number;
  discount: number;
  taxRate: number;
  unit: number;
}

export class ProductVendorDto {
  id: number;
  vendorId: number;
  vendorName: string;
  productId: number;
  unitOfMeasureId: number;
  unitOfMeasureName: string;
  unit: number;
  cost: number;
  unitCost: number;
  discount: number;
  isActive: boolean;

  constructor() {
    this.isActive = true;
    this.discount = 0;
    this.cost = 0;
    this.unitCost = 0;
    this.unit = 0;
  }
}
