/**
 * Respuesta JSON de GenerateFilePayment, p. ej. en C# propiedades FileName y File (base64).
 * System.Text.Json suele serializar en camelCase (fileName, file); aceptamos también PascalCase.
 */
export class GenerateFilePaymentResponseDto {
  fileName: string;
  file: string;
}
