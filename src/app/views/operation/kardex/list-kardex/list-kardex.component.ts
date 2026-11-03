import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { KardexDto, KardexFilterDto } from '../dtos/kardex-dto';
import { KardexService } from '../kardex.service';

@Component({
  selector: 'app-list-kardex',
  templateUrl: './list-kardex.component.html',
  styleUrls: ['./list-kardex.component.css'],
})
export class ListKardexComponent extends AppComponentBase implements OnInit {
  title: string = 'Kardex';
  movements: KardexDto[] = [];
  filterModel: KardexFilterDto = new KardexFilterDto();

  constructor(private _kardexService: KardexService) {
    super();
  }

  ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.filterModel.dateFrom = new Date(today);
    this.filterModel.dateTo = new Date(today);
    this.search();
  }

  async search() {
    this.movements = await this._kardexService.getAll(this.filterModel);
  }
}
