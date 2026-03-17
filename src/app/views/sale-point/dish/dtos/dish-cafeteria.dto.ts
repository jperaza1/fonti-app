export class DishCafeteriaDto {
  id: number;
  dishId: number;
  dishName: string;
  cafeteriaId: number;
  cafeteria: string;
  saleTypeDish: number;
  saleTypeDishName: string;
  noAddOns: boolean;
  freeAddOnsQuantity: number;
  priceWithCarnet: number;
  priceWithOutCarnet: number;
}