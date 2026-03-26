import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../_services/ConfigService';
import { RequestResult } from '../../../../_models/RequestResult';
import { CategoryDto, SubCategoryDto } from './dtos/category-dto';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private http: HttpClient,
    private _config: ConfigService
  ) {}

  getAll(): Promise<CategoryDto[]> {
    return this.http
      .get<CategoryDto[]>(`${this._config.config.data}Category/GetAll`)
      .toPromise();
  }

  getById(id: number): Promise<CategoryDto> {
    return this.http
      .get<CategoryDto>(`${this._config.config.data}Category/GetById?id=${id}`)
      .toPromise();
  }

  getActives(): Promise<CategoryDto[]> {
    return this.http
      .get<CategoryDto[]>(`${this._config.config.data}Category/GetAllActive`)
      .toPromise();
  }

  getSubCategories(categoryId: number): Promise<SubCategoryDto[]> {
    return this.http
      .get<SubCategoryDto[]>(`${this._config.config.data}Category/GetSubCategories?categoryId=${categoryId}`)
      .toPromise();
  }

  create(model: CategoryDto): Promise<RequestResult> {
    return this.http
      .post<RequestResult>(`${this._config.config.data}Category/Create`, model)
      .toPromise();
  }

  update(model: CategoryDto, id: number): Promise<RequestResult> {
    return this.http
      .put<RequestResult>(
        `${this._config.config.data}Category/Update?id=${id}`,
        model
      )
      .toPromise();
  }

  disable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Category/Disable?id=${id}`)
      .toPromise();
  }

  enable(id: number): Promise<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this._config.config.data}Category/Enable?id=${id}`)
      .toPromise();
  }
}
