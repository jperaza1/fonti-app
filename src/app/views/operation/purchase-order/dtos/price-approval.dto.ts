export class PriceApprovalDto {
  id: number;
  purchaseOrderId: number;
  vendor: string;
  status: number;
  statusName: string;
  reference: string;
  token: string;
  rejectedUser: string;
  rejectedAt: Date;
  approvedUser: string;
  approvedAt: Date;
  details: PriceApprovalDetailDto[];
}

export class PriceApprovalDetailDto {
  product: string;
  oldCost: number;
  newCost: number;
}

export class ApprovePriceRequestDto {
  id: number;
  status: number;
  note: string;
}
