export class DishDto {
  id: number;
  name: string;
  dishType: number;
  dishTypeName: string;
  saleTypeDish: number;
  saleTypeDishName: string;
  noAddOns: boolean;
  freeAddOnsQuantity: number;
  priceWithCarnet: number;
  priceWithOutCarnet: number;
  isActive: boolean;

  constructor() {
    this.id = 0;
    this.noAddOns = false;
    this.freeAddOnsQuantity = 0;
    this.priceWithCarnet = 0;
    this.priceWithOutCarnet = 0;
    this.dishType = 1;
    this.saleTypeDish = 1;
  }
}