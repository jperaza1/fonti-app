import { UserTypeEnum } from "../../../../../_enums/user-type.enum";

export class FilterPurchaseOrderDto {
  userType: UserTypeEnum;
  cafeteriaId: number;
  cafeterias: number[];
  orderStatus: number;
  vendorId: number;
  startDate: Date;
  endDate: Date;

  constructor() {
    this.cafeteriaId = 0;
    this.orderStatus = 0;
    this.vendorId = 0;
    this.startDate = new Date();
    this.endDate = new Date();
  }
}