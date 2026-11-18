export class WarehouseDto {
  id: number;
  name: string;
  kind: number;
  kindName: string;
}

export class WarehouseTransferDetailDto {
  id: number;
  productId: number;
  product: string;
  quantity: number;
}

export class WarehouseTransferDto {
  id: number;
  date: Date;
  fromWarehouseId: number;
  fromWarehouse: string;
  toWarehouseId: number;
  toWarehouse: string;
  note: string;
  status: number;
  statusName: string;
  sentUser: string;
  reason: string;
  details: WarehouseTransferDetailDto[];

  constructor() {
    this.details = [];
  }
}
