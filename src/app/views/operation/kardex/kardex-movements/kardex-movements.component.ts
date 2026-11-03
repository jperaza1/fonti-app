import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { KardexDto, ProductStockDto } from '../dtos/kardex-dto';
import { KardexService } from '../kardex.service';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-kardex-movements',
  templateUrl: './kardex-movements.component.html',
  styleUrls: ['./kardex-movements.component.css'],
})
export class KardexMovementsComponent extends AppComponentBase implements OnInit {
  title: string = 'Kardex';
  movements: KardexDto[] = [];
  OptionButtons: OptionButton[];

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;

  constructor(private _kardexService: KardexService) {
    super();
  }

  ngOnInit(): void {}

  async show(stock: ProductStockDto) {
    this.title = 'Kardex de ' + stock.product;
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
    ];
    this.movements = await this._kardexService.getAll({
      productId: stock.productId,
      dateFrom: null,
      dateTo: null,
    });
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    if ($event.btnName === 'close') {
      this.entityComponent.close();
    }
  }

  close() {
    this.entityComponent.close();
  }
}
