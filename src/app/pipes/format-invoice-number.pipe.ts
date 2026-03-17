import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatInvoiceNumber'
})
export class FormatInvoiceNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (value == null) {
      return '';
    }
    // Convierte el valor a string
    let strValue = value.toString();

    // Asegúrate de que el valor tenga al menos 12 caracteres
    strValue = strValue.padStart(12, '0');

    // Formatea el valor en el formato deseado
    return `${strValue.slice(0, 3)}-${strValue.slice(3, 6)}-${strValue.slice(6, 8)}-${strValue.slice(8)}`;
  }

}
