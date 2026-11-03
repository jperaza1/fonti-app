import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { ProductRecipeDto } from './dtos/product-recipe-dto';

@Injectable({ providedIn: 'root' })
export class ProductRecipeService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<ProductRecipeDto[]> {
    return this.http
      .get<ProductRecipeDto[]>(`${this._config.config.data}ProductRecipe/GetAll`)
      .toPromise();
  }

  getByProduct(productId: number): Promise<ProductRecipeDto> {
    return this.http
      .get<ProductRecipeDto>(`${this._config.config.data}ProductRecipe/GetByProduct?productId=${productId}`)
      .toPromise();
  }

  save(model: ProductRecipeDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}ProductRecipe/Save`, model)
      .toPromise();
  }
}
