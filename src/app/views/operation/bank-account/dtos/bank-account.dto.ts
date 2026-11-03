export class BankAccountDto {
  id: number;
  bankId: number;
  bankName: string;
  name: string;
  balance: number;
  isActive: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.balance = 0;
    this.isActive = true;
  }
}

/** Cuerpo de alta: el saldo lo define el backend. */
export interface CreateBankAccountDto {
  bankId: number;
  name: string;
  isActive: boolean;
}
