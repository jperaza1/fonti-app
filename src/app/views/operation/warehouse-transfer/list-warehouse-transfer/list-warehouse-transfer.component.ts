import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { WarehouseTransferDto, WarehouseTransferFilterDto } from '../dtos/warehouse-transfer-dto';
import { WarehouseTransferService } from '../warehouse-transfer.service';

@Component({
  selector: 'app-list-warehouse-transfer',
  templateUrl: './list-warehouse-transfer.component.html',
})
export class ListWarehouseTransferComponent extends AppComponentBase implements OnInit {
  title: string = 'Transferencias';
  transfers: WarehouseTransferDto[] = [];
  filterModel: WarehouseTransferFilterDto = new WarehouseTransferFilterDto();

  constructor(private _transferService: WarehouseTransferService) {
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
    this.transfers = await this._transferService.getAll(this.filterModel);
  }

  view(row: WarehouseTransferDto) {
    window.open(`/warehouse-transfer/view/${row.id}`, '_blank');
  }
}
