export class OfficeRequisitionDto {
  id: number;
  reference: string;
  date: Date;
  description: string;
  approvedAt: Date;
  cafeteria: string;
  cafeteriaId: number;
  statusName: string;
  approvedUser: string;
  creatorUser: string;
  creationTime: Date;
  status: number;
  reasonRejection: string;
  details: OfficeRequisitionDetailDto[];

  constructor() {
    this.details = [];
    this.status = 1;
  }
}

export class OfficeRequisitionDetailDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
}