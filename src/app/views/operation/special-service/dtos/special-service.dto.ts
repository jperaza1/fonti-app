export class SpecialServiceDto {
  id: number;
  reference: string;
  date: Date;
  approvedAt: Date;
  cafeteria: string;
  cafeteriaId: number;
  statusName: string;
  approvedUser: string;
  creatorUser: string;
  creationTime: Date;
  status: number;
  reasonRejection: string;
  details: SpecialServiceDetailDto[];

  constructor() {
    this.details = [];
    this.status = 1;
  }
}

export class SpecialServiceDetailDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
}