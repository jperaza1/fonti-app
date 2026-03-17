export class InventoryDto {
  id: number;
  reference: string;
  date: Date;
  cafeteria: string;
  cafeteriaId: number;
  total: number;
  creatorUser: string;
  reasonCanceled: string;
  canceledUser: string;
  canceledAt: Date;
  details: InventoryDetailDto[];
  useRegister: boolean;
  registerId: number;
  inventoryType: number;
  inventoryTypeName: string;

  constructor() {
    this.details = [];
    this.date = new Date();
    this.cafeteriaId = 0;
    this.inventoryType = 1;
  }
}

export class InventoryDetailDto {
  id: number;
  inventoryId: number;
  product: string;
  productId: number;
  cost: number;
  unitCost: number;
  unitQuantity: number;
  quantityPack: number;
  subTotal: number;
  tax: number;
  taxPercentage: number;
  discount: number;
  discountPercentage: number;
  total: number;
}