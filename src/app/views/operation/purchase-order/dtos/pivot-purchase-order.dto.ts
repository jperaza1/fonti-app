export class PivotPurchaseOrderDto {
  id: number;
  reference: string;
  date: Date;
  vendor: string;
  cafeteria: string;  
  product: string;
  quantityRecived: number;
  costRecived: number;
  totalRecived: number;
}