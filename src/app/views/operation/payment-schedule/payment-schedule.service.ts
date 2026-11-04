import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import {
  AddPaymentScheduleDetailsDto,
  PaymentScheduleCarryForwardDto,
  PaymentScheduleDto,
  RegisterPaymentScheduleDetailDto,
} from './dtos/payment-schedule.dto';

@Injectable({ providedIn: 'root' })
export class PaymentScheduleService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<PaymentScheduleDto[]> {
    return this.http
      .get<PaymentScheduleDto[]>(`${this._config.config.data}PaymentSchedule/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<PaymentScheduleDto> {
    return this.http
      .get<PaymentScheduleDto>(`${this._config.config.data}PaymentSchedule/GetById?id=${id}`)
      .toPromise();
  }

  getCarryForward(): Promise<PaymentScheduleCarryForwardDto> {
    return this.http
      .get<PaymentScheduleCarryForwardDto>(`${this._config.config.data}PaymentSchedule/GetCarryForward`)
      .toPromise();
  }

  create(model: PaymentScheduleDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}PaymentSchedule/Create`, model)
      .toPromise();
  }

  addDetails(model: AddPaymentScheduleDetailsDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}PaymentSchedule/AddDetails`, model)
      .toPromise();
  }

  registerPayment(model: RegisterPaymentScheduleDetailDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}PaymentSchedule/RegisterPayment`, model)
      .toPromise();
  }
}
