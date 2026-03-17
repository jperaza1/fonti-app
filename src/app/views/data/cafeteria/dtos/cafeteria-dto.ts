export class CafeteriaDto 
{
  id: number;
  name: string;
  code: string;
  purchaseOrderCorelative: number;
  specialServicesCorelative: number;
  officeRequisitionCorelative: number;
  isActive: boolean;
  customers: CustomerCafeteriaDto[];

  constructor() {
    this.customers = [];
  }
}

export class CustomerCafeteriaDto
{
  id: number;
  customerId: number;
  customer: string;
  cafeteriaId: number;
}
