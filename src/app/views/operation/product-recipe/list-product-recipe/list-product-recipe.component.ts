import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductRecipeDto } from '../dtos/product-recipe-dto';
import { ProductRecipeService } from '../product-recipe.service';
import { CreateOrUpdateProductRecipeComponent } from '../create-or-update-product-recipe/create-or-update-product-recipe.component';

@Component({
  selector: 'app-list-product-recipe',
  templateUrl: './list-product-recipe.component.html',
  styleUrls: ['./list-product-recipe.component.css'],
})
export class ListProductRecipeComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: ProductRecipeDto[] = [];
  title: string = 'Recetas';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateProductRecipeComponent;

  constructor(private _productRecipeService: ProductRecipeService) {
    super();
    this.columns = [
      {
        dataField: 'id',
        caption: 'Actions',
        allowEditing: false,
        width: '120',
        cellTemplate: 'actionTemplate',
        alignment: 'center',
        allowExporting: false,
      },
      {
        dataField: 'product',
        caption: 'Producto',
        allowEditing: false,
      },
      {
        dataField: 'unitsPerPackage',
        caption: 'Unidades por paquete',
        allowEditing: false,
      },
      {
        dataField: 'details',
        caption: 'Insumos',
        allowEditing: false,
        calculateDisplayValue: (row) => (row.details ? row.details.length : 0),
      },
    ];
  }

  async ngOnInit() {
    this.getAll();
  }

  async getAll() {
    const recipes = await this._productRecipeService.getAll();
    this.DataSource = (recipes || []).map((item) => {
      (item as any).isActive = true;
      return item;
    });
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: ProductRecipeDto) {
    this.createOrUpdateModal.showUpdate(data);
  }
}
