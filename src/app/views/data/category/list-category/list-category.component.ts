import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CategoryDto } from '../dtos/category-dto';
import { CategoryService } from '../category.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateCategoryComponent } from '../create-or-update-category/create-or-update-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: CategoryDto[] = [];
  title: string = 'Categorías';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateCategoryComponent;

  constructor(private _categoryService: CategoryService) {
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
        dataField: 'name',
        caption: 'Nombre',
        allowEditing: false,
      },
      {
        dataField: 'isActive',
        caption: 'Status',
        allowEditing: false,
        width: '120',
        alignment: 'center',
        cellTemplate: 'statusTemplate',
        allowExporting: true,
        calculateDisplayValue: (value) => (value ? 'ACTIVE' : 'INACTIVE'),
      },
    ];
  }

  async ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._categoryService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: CategoryDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: CategoryDto
  ) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: CategoryDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._categoryService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: CategoryDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let enableResponse = await this._categoryService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
