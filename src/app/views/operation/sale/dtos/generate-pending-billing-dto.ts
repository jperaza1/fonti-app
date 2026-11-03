export class GeneratePendingBillingCustomerDto {
  customerId: number;
  customerName: string;
  invoiceDate: Date;
  saleIds: number[];
}

export class GeneratePendingBillingDto {
  saleType: number;
  invoiceDate: Date;
  saleIds: number[];
  customers: GeneratePendingBillingCustomerDto[];
}
