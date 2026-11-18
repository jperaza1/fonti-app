export class ProductStockDto {
  productId: number;
  product: string;
  productType: number;
  productTypeName: string;
  unitOfMeasure: string;
  cost: number;
  quantity: number;
  warehouseId: number;
  warehouse: string;
  isActive: boolean;
}

export class KardexDto {
  id: number;
  productId: number;
  product: string;
  warehouseId: number;
  warehouse: string;
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
  warehouseId: number;
  dateFrom: Date;
  dateTo: Date;
}

export class KardexEntryDto {
  warehouseId: number;
  productId: number;
  quantity: number;
  movementDate: Date;
  note: string;
}
