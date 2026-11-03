import { UserTypeEnum } from "../../../../../_enums/user-type.enum";

export class FilterPurchaseOrderDto {
  userType: UserTypeEnum;
  orderStatus: number;
  vendorId: number;
  startDate: Date;
  endDate: Date;

  constructor() {
    this.orderStatus = 0;
    this.vendorId = 0;
    this.startDate = new Date();
    this.endDate = new Date();
  }
}