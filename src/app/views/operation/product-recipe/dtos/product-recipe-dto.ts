export class ProductRecipeDetailDto {
  id: number;
  rawMaterialProductId: number;
  rawMaterial: string;
  unitOfMeasure: string;
  quantity: number;
  producedUnits: number;
  perPackage: boolean;
  quantityPerUnit: number;
}

export class ProductRecipeDto {
  id: number;
  productId: number;
  product: string;
  unitsPerPackage: number;
  details: ProductRecipeDetailDto[];
}
