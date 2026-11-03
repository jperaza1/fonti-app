export class ProductStockDto {
  productId: number;
  product: string;
  productType: number;
  productTypeName: string;
  unitOfMeasure: string;
  cost: number;
  quantity: number;
  isActive: boolean;
}

export class KardexDto {
  id: number;
  productId: number;
  product: string;
  unitOfMeasure: string;
  movementDate: Date;
  movementType: number;
  movementTypeName: string;
  quantity: number;
  balance: number;
  unitCost: number;
  dispatchControlId: number;
  sourceProductId: number;
  sourceProduct: string;
  note: string;
}

export class KardexFilterDto {
  productId: number;
  dateFrom: Date;
  dateTo: Date;
}

export class KardexEntryDto {
  productId: number;
  quantity: number;
  movementDate: Date;
  note: string;
}
