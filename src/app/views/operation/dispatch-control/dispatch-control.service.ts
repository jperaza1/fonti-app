import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { ExpenseDto } from '../expense/dtos/expense-dto';
import { DispatchControlDto, DispatchTransferDto, DispatchTransferSettingDto, GenerateFileDispatchControlResponseDto } from './dtos/dispatch-control.dto';
import { DispatchControlFilterDto } from './dtos/dispatch-control-filter.dto';

@Injectable({ providedIn: 'root' })
export class DispatchControlService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  

  getAll(filter: DispatchControlFilterDto): Promise<DispatchControlDto[]> {
    return this.http
      .post<DispatchControlDto[]>(`${this._config.config.data}DispatchControl/GetAll`, filter)
      .toPromise();
  }

  getTransferSetting(): Promise<DispatchTransferSettingDto> {
    return this.http
      .get<DispatchTransferSettingDto>(`${this._config.config.data}DispatchControl/GetTransferSetting`)
      .toPromise();
  }

  getById(id: number): Promise<DispatchControlDto> {
    return this.http
      .get<DispatchControlDto>(`${this._config.config.data}DispatchControl/GetById?id=${id}`)
      .toPromise();
  }

  create(model: DispatchControlDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}DispatchControl/Create`, model)
      .toPromise();
  }

  transfer(model: DispatchTransferDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}DispatchControl/Transfer`, model)
      .toPromise();
  }

  cancelTransfer(id: number): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}DispatchControl/CancelTransfer?id=${id}`, {})
      .toPromise();
  }

  update(model: DispatchControlDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}DispatchControl/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  generateReport(filter: DispatchControlFilterDto): Promise<void> {
    return this.http
      .post<GenerateFileDispatchControlResponseDto>(`${this._config.config.data}DispatchControl/GenerateReport`, filter)
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

  private base64ToUint8Array(b64: string): Uint8Array {
    const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  private parseGenerateFilePaymentResponse(
    raw: GenerateFileDispatchControlResponseDto
  ): { fileName: string; base64: string } {
    const anyRaw = raw as GenerateFileDispatchControlResponseDto & {
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
}
