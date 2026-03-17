import { FormatInvoiceNumberPipe } from './format-invoice-number.pipe';

describe('FormatInvoiceNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatInvoiceNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
