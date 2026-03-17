export class VendorDto {
  id: number;
  name: string;
  rtn: string;
  address: string;
  phone: string;
  seller: string;
  isActive: boolean;
  hasCredit: boolean;
  creditDays: number;
  hasInvoice: boolean;
  requiresAdminApproval: boolean;

  constructor() {
    this.hasInvoice = true;
    this.hasCredit = false;
    this.requiresAdminApproval = false;
  }
}