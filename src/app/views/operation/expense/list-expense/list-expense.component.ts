import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ExpenseFilterDto } from '../dtos/expense-filter.dto';
import { ExpenseDto } from '../dtos/expense-dto';
import { ExpenseService } from '../expense.service';
import { CategoryService } from '../../../data/category/category.service';
import { CreateOrUpdateExpenseComponent } from '../create-or-update-expense/create-or-update-expense.component';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css'],
})
export class ListExpenseComponent extends AppComponentBase implements OnInit {
  title: string = 'Registro de gastos';
  DataSource: ExpenseDto[] = [];
  columns: any[] = [];
  DxDatasourceCategory: any = {};
  DxDatasourceSubCategory: any = {};
  filterModel: ExpenseFilterDto = new ExpenseFilterDto();

  @ViewChild('createOrUpdate') createOrUpdate: CreateOrUpdateExpenseComponent;

  constructor(
    private _expenseService: ExpenseService,
    private _categoryService: CategoryService
  ) {
    super();
  }

  async ngOnInit() {
    await this.init();
  }

  async loadCategories() {
    let result = await this._categoryService.getActives();
    result.unshift({ id: 0, name: 'Todas' } as any);
    this.DxDatasourceCategory = this.getDataSourceDx(result);
  }

  async loadFilterSubCategories() {
    if (!this.filterModel.categoryId) {
      this.filterModel.subCategoryId = 0;
      this.DxDatasourceSubCategory = this.getDataSourceDx([
        { id: 0, name: 'Todas' } as any,
      ]);
      return;
    }
    const cat = await this._categoryService.getById(this.filterModel.categoryId);
    let subs = cat.subCategories || [];
    subs.unshift({ id: 0, name: 'Todas' } as any);
    this.DxDatasourceSubCategory = this.getDataSourceDx(subs);
    if (
      this.filterModel.subCategoryId &&
      !subs.some((s: any) => s.id === this.filterModel.subCategoryId)
    ) {
      this.filterModel.subCategoryId = 0;
    }
  }

  async onFilterCategoryChanged() {
    this.filterModel.subCategoryId = 0;
    await this.loadFilterSubCategories();
  }

  async init() {
    this.initializeColumns();
    await this.loadCategories();
    await this.loadFilterSubCategories();
    await this.search();
  }

  async search() {
    const result = await this._expenseService.getAll(this.filterModel);
    this.DataSource = result;
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'id',
        caption: 'Actions',
        allowEditing: false,
        cellTemplate: 'actionTemplate',
        alignment: 'center',
        allowExporting: false,
      },
      {
        dataField: 'route',
        caption: 'Ruta',
      },
      {
        dataField: 'categoryName',
        caption: 'Categoría',
      },
      {
        dataField: 'subCategoryName',
        caption: 'Subcategoría',
      },
      {
        dataField: 'vendorName',
        caption: 'Proveedor',
      },
      {
        dataField: 'date',
        caption: 'Fecha',
        cellTemplate: 'dateTemplate',
      },
      {
        caption: 'Nº factura',
        calculateCellValue: (row: ExpenseDto) =>
          row?.expenseInvoice?.invoiceNumber || '',
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate',
      },
      {
        dataField: 'notes',
        caption: 'Notas',
      },
    ];
  }

  showAdd() {
    this.createOrUpdate.showAdd();
  }

  edit(data: ExpenseDto) {
    this.createOrUpdate.showUpdate(data);
  }
}
