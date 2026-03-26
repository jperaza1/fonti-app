export class CategoryDto {
  id: number;
  name: string;
  isActive: boolean;
  subCategories: SubCategoryDto[];

  constructor() {
    this.subCategories = [];
  }
}

export class SubCategoryDto {
  id: number;
  categoryId: number;
  name: string;
}
