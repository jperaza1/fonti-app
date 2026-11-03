export class VendorDto {
  id: number;
  name: string;
  bankId: number;
  bank: string;
  bankAccount: string;
  typeAccountId: number;
  typeAccount: string;
  bankAccountHolder: string;
  identificationHolder: string;
  c1: string;
  c2: string;
  email: string;
  isActive: boolean;

  constructor() {
    this.bankId = 0;
    this.bankAccount = '';
    this.typeAccountId = 0;
    this.email = '';
  }
}