export class ProductionDto {
  id: number;
  productionDate: Date;
  shiftTypeId: number;
  shift: string;
  products: string;
  status: string;
  isActive: boolean;
  isClosed: boolean;
  lines: ProductionLineDto[];
}

export class ProductionLineDto {
  id: number;
  productId: number;
  product: string;
  quantity: number;
  note: string;
  losses: string;
  status: string;
  isActive: boolean;
}

export class ProductionFilterDto {
  dateFrom: Date;
  dateTo: Date;
}

export class CreateProductionDto {
  productionShiftId: number;
  productionDate: Date;
  shiftTypeId: number;
  lines: CreateProductionLineDto[];
}

export class CreateProductionLineDto {
  productId: number;
  quantity: number;
  note: string;
  losses: ProductionLossDto[];
  consumption: ProductionConsumptionDto[];
}

export class ProductionLossDto {
  productId: number;
  product: string;
  unitOfMeasure: string;
  quantity: number;
  note: string;
}

export class ProductionProductDto {
  productId: number;
  product: string;
}

export class ProductionConsumptionDto {
  productId: number;
  product: string;
  unitOfMeasure: string;
  quantity: number;
}
