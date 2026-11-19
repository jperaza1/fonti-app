import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../../../../AppComponentBase';
import { WarehouseTransferDto } from '../dtos/warehouse-transfer-dto';
import { WarehouseTransferService } from '../warehouse-transfer.service';

@Component({
  selector: 'app-view-warehouse-transfer',
  templateUrl: './view-warehouse-transfer.component.html',
})
export class ViewWarehouseTransferComponent extends AppComponentBase implements OnInit {
  title: string = 'Transferencia';
  model: WarehouseTransferDto = new WarehouseTransferDto();

  constructor(
    private _route: ActivatedRoute,
    private _transferService: WarehouseTransferService
  ) {
    super();
  }

  async ngOnInit() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.model = await this._transferService.getById(id);
  }

  back() {
    window.location.href = '/warehouse-transfer';
  }
}
