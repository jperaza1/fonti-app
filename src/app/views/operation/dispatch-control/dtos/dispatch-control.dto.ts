export class DispatchControlDto {
  id: number;
  routeId: number;
  route: string;
  vendor: string;
  dispatchControlDate: Date;
  creationTime: Date;
  creatorUser: string;
  dispatchControlDetails: DispatchControlDetailDto[];
  status: number;
  statusName: string;
  truckId: number;
  truck: string;

  constructor() {
    this.dispatchControlDetails = [];
  }
}

export class DispatchControlDetailDto {
  id: number;
  dispatchControlId: number;
  dispatchControlType: number;
  dispatchControlTypeName: string;
  bottleQuantity: number;
  crateQuantity: number;
  missingBottleQuantity: number;
  dispatchTransferId: number;
  counterpartRouteId: number;
  counterpartRoute: string;
  productMovements: ProductMovementDto[];

  constructor() {
    this.productMovements = [];
  }
}

export class ProductMovementDto {
  id: number;
  dispatchControlDetailId: number;
  productId: number;
  product: string;
  quantity: number;
}

export class DispatchTransferSettingDto {
  enabled: boolean;
}

export class DispatchTransferDto {
  fromDispatchControlId: number;
  toRouteId: number;
  productId: number;
  quantity: number;
}

export class GenerateFileDispatchControlResponseDto {
  fileName: string;
  file: string;
}