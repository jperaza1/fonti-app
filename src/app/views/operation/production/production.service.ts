import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import {
  CreateProductionDto,
  ProductionConsumptionDto,
  ProductionDto,
  ProductionFilterDto,
  ProductionProductDto,
} from './dtos/production-dto';

@Injectable({ providedIn: 'root' })
export class ProductionService {
  constructor(private http: HttpClient, private _config: ConfigService) {}

  getAll(filter: ProductionFilterDto): Promise<ProductionDto[]> {
    return this.http
      .post<ProductionDto[]>(`${this._config.config.data}Production/GetAll`, filter)
      .toPromise();
  }

  getByDay(date: string, shiftTypeId: number): Promise<ProductionDto> {
    return this.http
      .get<ProductionDto>(`${this._config.config.data}Production/GetByDay?date=${date}&shiftTypeId=${shiftTypeId}`)
      .toPromise();
  }

  getOpen(): Promise<ProductionDto> {
    return this.http
      .get<ProductionDto>(`${this._config.config.data}Production/GetOpen`)
      .toPromise();
  }

  getProducts(): Promise<ProductionProductDto[]> {
    return this.http
      .get<ProductionProductDto[]>(`${this._config.config.data}Production/GetProducts`)
      .toPromise();
  }

  getConsumption(productId: number, quantity: number): Promise<ProductionConsumptionDto[] | RequestResult> {
    return this.http
      .post<ProductionConsumptionDto[] | RequestResult>(`${this._config.config.data}Production/GetConsumption`, {
        productId,
        quantity,
      })
      .toPromise();
  }

  create(model: CreateProductionDto): Promise<RequestResult> {
    const lines = (model.lines || []).map((line) => ({
      productId: line.productId,
      quantity: line.quantity,
      note: line.note,
      losses: (line.losses || [])
        .filter((loss) => loss.quantity > 0)
        .map((loss) => ({
          productId: loss.productId,
          quantity: loss.quantity,
          note: loss.note,
        })),
    }));
    return this.http
      .post<RequestResult>(`${this._config.config.data}Production/Create`, {
        productionShiftId: model.productionShiftId || 0,
        productionDate: model.productionDate,
        shiftTypeId: model.shiftTypeId,
        lines,
      })
      .toPromise();
  }

  cancel(id: number): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Production/Cancel?id=${id}`, {})
      .toPromise();
  }

  cancelShift(id: number): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Production/CancelShift?id=${id}`, {})
      .toPromise();
  }

  closeShift(id: number): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Production/CloseShift?id=${id}`, {})
      .toPromise();
  }
}
