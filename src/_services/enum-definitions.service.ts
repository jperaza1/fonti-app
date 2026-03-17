import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefinitionValuesDto } from '../_models/definitions/definition-values-dto';
import { ConfigService } from './ConfigService';

@Injectable({ providedIn: 'root' })
export class EnumDefinitionsService {


  constructor(private http: HttpClient,
    private _config: ConfigService) { }

  getAlerts(): Promise<DefinitionValuesDto[]> {
    return this.http
      .get<DefinitionValuesDto[]>(
        `${this._config.config.data}EnumDefinition/GetAlerts`
      )
      .toPromise();
  }
  getPayBy(): Promise<DefinitionValuesDto[]> {
    return this.http
      .get<DefinitionValuesDto[]>(
        `${this._config.config.data}EnumDefinition/GetPayBy`
      )
      .toPromise();
  }
  getEscrowBy(): Promise<DefinitionValuesDto[]> {
    return this.http
      .get<DefinitionValuesDto[]>(
        `${this._config.config.data}EnumDefinition/GetEscrowBy`
      )
      .toPromise();
  }
  getWeightType(): Promise<DefinitionValuesDto[]> {
    return this.http
      .get<DefinitionValuesDto[]>(
        `${this._config.config.data}EnumDefinition/GetWeightType`
      )
      .toPromise();
  }
  getDocumentType(): Promise<DefinitionValuesDto[]> {
    return this.http
      .get<DefinitionValuesDto[]>(
        `${this._config.config.data}EnumDefinition/GetDocumentType`
      )
      .toPromise();
  }
  getDriveTypeOperator(): Promise<DefinitionValuesDto[]> {
    return this.http
      .get<DefinitionValuesDto[]>(
        `${this._config.config.data}EnumDefinition/GetDriveTypeOperator`
      )
      .toPromise();
  }
  getUserType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetUserType`).toPromise();
  }
  getPersonType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPersonType`).toPromise();
  }
  getIdentificationType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetIdentificationType`).toPromise();
  }

  getDriverType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetDriverType`).toPromise();
  }

  getCheckListStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetCheckListStatus`).toPromise();
  }

  getApplicationStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetApplicationStatus`).toPromise();
  }

  getFilterDriverApplicationReport(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetFilterDriverApplicationReport`).toPromise();
  }

  getCarrierType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetCarrierType`).toPromise();
  }

  getPhoneCallType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPhoneCallType`).toPromise();
  }

  getLeadCustomerType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetLeadCustomerType`).toPromise();
  }

  getTaskFilterCriteria(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetTaskFilterCriteria`).toPromise();
  }

  getDigitalDocumentType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetDigitalDocumentType`).toPromise();
  }

  getFuelType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetFuelType`).toPromise();
  }

  getPaymentStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPaymentStatus`).toPromise();
  }

  getLanguageType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetLanguageType`).toPromise();
  }

  getAndobaStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetAndobaStatus`).toPromise();
  }

  getTaskStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetTaskStatus`).toPromise();
  }

  getTruckType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetTruckType`).toPromise();
  }

  getTypeApplicationTruck(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetTypeApplicationTruck`).toPromise();
  }

  getTransportZone(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetTransportZone`).toPromise();
  }

  getPaymentFilterDate(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPaymentFilterDate`).toPromise();
  }

  getPurchaseOrderStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPurchaseOrderStatus`).toPromise();
  }

  getDetailStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetDetailStatus`).toPromise();
  }

  getPurchaseOrderInvoiceType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPurchaseOrderInvoiceType`).toPromise();
  }

  getSpecialServiceStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetSpecialServiceStatus`).toPromise();
  }

  getInvoiceType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetInvoiceType`).toPromise();
  }

  getPaymentType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPaymentType`).toPromise();
  }

  getPaymentMethod(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPaymentMethod`).toPromise();
  }

  getSaleType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetSaleType`).toPromise();
  }

  getGenderType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetGenderType`).toPromise();
  }

  getEmploymentStatus(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetEmploymentStatus`).toPromise();
  }

  getEmploymentType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetEmploymentType`).toPromise();
  }

  getShiftType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetShiftType`).toPromise();
  }

  getPayFrequency(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetPayFrequency`).toPromise();
  }

  getDishType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetDishType`).toPromise();
  }

  getSaleTypeDish(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetSaleTypeDish`).toPromise();
  }

  getRequestType(): Promise<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(`${this._config.config.data}EnumDefinition/GetRequestType`).toPromise();
  }
  
}
