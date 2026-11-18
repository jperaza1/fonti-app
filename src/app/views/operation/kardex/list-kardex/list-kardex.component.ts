import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { KardexDto, KardexFilterDto } from '../dtos/kardex-dto';
import { KardexService } from '../kardex.service';
import { WarehouseDto } from '../../warehouse-transfer/dtos/warehouse-transfer-dto';
import { WarehouseService } from '../../warehouse-transfer/warehouse.service';

@Component({
  selector: 'app-list-kardex',
  templateUrl: './list-kardex.component.html',
  styleUrls: ['./list-kardex.component.css'],
})
export class ListKardexComponent extends AppComponentBase implements OnInit {
  title: string = 'Kardex';
  movements: KardexDto[] = [];
  warehouses: WarehouseDto[] = [];
  filterModel: KardexFilterDto = new KardexFilterDto();

  constructor(
    private _kardexService: KardexService,
    private _warehouseService: WarehouseService
  ) {
    super();
  }

  async ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.filterModel.dateFrom = new Date(today);
    this.filterModel.dateTo = new Date(today);
    this.filterModel.warehouseId = 0;
    const rows = await this._warehouseService.getAll();
    this.warehouses = [{ id: 0, name: 'Todas', kind: 0, kindName: '' }].concat(rows);
    this.search();
  }

  async search() {
    this.movements = await this._kardexService.getAll(this.filterModel);
  }
}
