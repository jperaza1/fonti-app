import { Injectable } from "@angular/core";
import { ConfigService } from "../../../../_services/ConfigService";
import { HttpClient } from "@angular/common/http";
import { PaymentDto } from "./dtos/payment.dto";
import { RequestResult } from "../../../../_models/RequestResult";
import { InvoicePaymentDto } from "./dtos/invoice-payment.dto";
import { FilterPaymentDto } from "./dtos/filter-payment.dto";
import { GenerateFilePaymentResponseDto } from "./dtos/generate-file-payment-response.dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

    getAll(filter: FilterPaymentDto): Promise<PaymentDto[]> {
      return this.http.post<PaymentDto[]>(`${this._config.config.data}Payment/GetAll`, filter).toPromise();
    }
  
    getById(id: number): Promise<PaymentDto> {
      return this.http.get<PaymentDto>(`${this._config.config.data}Payment/GetById?id=${id}`).toPromise();
    }

  addPayment(model: InvoicePaymentDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}Payment/AddPayment`, model).toPromise();
  }

  create(model: PaymentDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}Payment/Create`, model).toPromise();
  }

  update(id: number, model: PaymentDto): Promise<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}Payment/Update?id=${id}`, model).toPromise();
  }

  delete(id: number): Promise<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}Payment/DeletePayment?id=${id}`).toPromise();
  }

  getPaymentReceipt(paymentId: number, vendorId: number): Promise<string> {
    return this.http.get(`${this._config.config.data}Payment/GetPaymentReceiptFile?paymentId=${paymentId}&vendorId=${vendorId}`, { responseType: 'text' }).toPromise();
  }

    /**
   * El API devuelve JSON con nombre de archivo y contenido en base64, p. ej.:
   * `{ "fileName": "...", "file": "<base64>" }` (o PascalCase FileName / File).
   */
    generateFilePayment(id: number): Promise<void> {
      return this.http
        .post<GenerateFilePaymentResponseDto>(
          `${this._config.config.data}Payment/GenerateFilePayment?id=${id}`,
          null
        )
        .toPromise()
        .then((raw) => {
          const parsed = this.parseGenerateFilePaymentResponse(raw);
          const { fileName, base64 } = parsed;
          if (!fileName || !base64) {
            throw new Error('Respuesta inválida: faltan fileName o contenido base64');
          }
          const bytes = this.base64ToUint8Array(base64);
          const blob = new Blob([bytes as unknown as BlobPart], {
            type: this.resolveMimeType(fileName),
          });
          const objectUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = objectUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(objectUrl);
        });
    }
  
    /** MIME según extensión del nombre que envía el API (.txt, .xlsx, .xls, etc.). */
    private resolveMimeType(fileName: string): string {
      const ext = (fileName.split('.').pop() || '').toLowerCase();
      switch (ext) {
        case 'xlsx':
          return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case 'xlsm':
          return 'application/vnd.ms-excel.sheet.macroEnabled.12';
        case 'xls':
          return 'application/vnd.ms-excel';
        case 'csv':
          return 'text/csv;charset=utf-8';
        case 'txt':
        default:
          return 'text/plain;charset=utf-8';
      }
    }
  
    private parseGenerateFilePaymentResponse(
      raw: GenerateFilePaymentResponseDto
    ): { fileName: string; base64: string } {
      const anyRaw = raw as GenerateFilePaymentResponseDto & {
        FileName?: string;
        File?: string;
        fileBase64?: string;
        FileBase64?: string;
        content?: string;
        Content?: string;
      };
      const fileName = String(anyRaw.fileName ?? anyRaw.FileName ?? '').trim();
      let b64 = String(
        anyRaw.file ??
          anyRaw.File ??
          anyRaw.fileBase64 ??
          anyRaw.FileBase64 ??
          anyRaw.content ??
          anyRaw.Content ??
          ''
      ).trim();
      b64 = b64.replace(/^data:[^;]+;base64,/i, '').replace(/\s/g, '');
      return { fileName, base64: b64 };
    }
  
    private base64ToUint8Array(b64: string): Uint8Array {
      const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), '=');
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    }
  
    finishPayment(id: number, model: PaymentDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Payment/FinishPayment?id=${id}`, model).toPromise();
    }
  
    updateNotes(id: number, model: PaymentDto): Promise<RequestResult> {
      return this.http.post<RequestResult>(`${this._config.config.data}Payment/UpdateNote?id=${id}`, model).toPromise();
    }
}