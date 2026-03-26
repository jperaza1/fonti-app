import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CategoryDto, SubCategoryDto } from '../dtos/category-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { CategoryService } from '../category.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-or-update-category',
  templateUrl: './create-or-update-category.component.html',
  styleUrls: ['./create-or-update-category.component.css'],
})
export class CreateOrUpdateCategoryComponent extends AppComponentBase implements OnInit {
  Model: CategoryDto = new CategoryDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Categoría';

  detail: SubCategoryDto = new SubCategoryDto();

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _categoryService: CategoryService) {
    super();
  }

  ngOnInit(): void {}

  initializeView() {
    this.errors = {};
  }

  setButtonOptions(update?: boolean | null) {
    const permission: string[] = [];
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', permission),
    ];
  }

  async showUpdate(data: CategoryDto) {
    this.title = 'Editar categoría';
    this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._categoryService.getById(data.id);
    if (!this.Model.subCategories) {
      this.Model.subCategories = [];
    }
    this.detail = new SubCategoryDto();
    this.detail.categoryId = this.Model.id;
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nueva categoría';
    this.initializeView();
    this.setButtonOptions();
    this.Model = new CategoryDto();
    this.detail = new SubCategoryDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'save':
        this.save();
        break;
      case 'close':
        this.close();
        break;
    }
  }

  syncSubCategoryCategoryIds() {
    const catId = this.Model.id || 0;
    this.Model.subCategories.forEach((sc) => {
      sc.categoryId = catId;
    });
  }

  addDetail() {
    if (this.isEmptyOrNullString(this.detail.name)) {
      this.error('Error', 'El nombre de la subcategoría es requerido');
      return;
    }
    const row: SubCategoryDto = {
      id: this.detail.id,
      categoryId: this.Model.id || 0,
      name: this.detail.name.trim(),
    };
    this.Model.subCategories.push(row);
    this.detail = new SubCategoryDto();
    this.detail.categoryId = this.Model.id || 0;
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  async save() {
    this.syncSubCategoryCategoryIds();
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      const createResponse = await this._categoryService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._categoryService.update(
        this.Model,
        this.Model.id
      );
      this.validResponse(updateResponse);
    }
  }

  close() {
    this.entityComponent.close();
  }

  removeDetail(detail: SubCategoryDto) {
    this.Model.subCategories = this.Model.subCategories.filter((item) => item !== detail);
  }
}
