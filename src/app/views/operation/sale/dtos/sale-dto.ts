export class SaleDto {
  id: number;
  cafeteriaId: number;
  cafeteria: string;
  saleType: number;
  saleTypeName: string;
  categoryId: number;
  category: string;
  productTypeId: number;
  productType: string;
  saleDate: Date;
  amount: number;
  isActive: boolean;
  registerId: number;
  register: string;
  servicePeriodId: number;
  servicePeriod: string;
  customerId: number;
  customer: string;

  constructor() {
    this.id = 0;
    this.cafeteriaId = 0;
    this.saleType = 0; 
    this.categoryId = 0;
    this.productTypeId = 0;
    this.servicePeriodId = 0;
    this.registerId = 0;
    this.amount = 0;
    this.customerId = 0;
  }
  
}