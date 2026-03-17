import { Injectable } from "@angular/core";
import { ConfigService } from "../../../../_services/ConfigService";
import { HttpClient } from "@angular/common/http";
import { PaymentDto } from "./dtos/payment.dto";
import { RequestResult } from "../../../../_models/RequestResult";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

  addPayment(model: PaymentDto): Promise<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}Payment/AddPayment`, model).toPromise();
  }
}