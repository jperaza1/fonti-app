import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { WarehouseTransferDto } from '../dtos/warehouse-transfer-dto';
import { WarehouseTransferService } from '../warehouse-transfer.service';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-list-warehouse-transfer',
  templateUrl: './list-warehouse-transfer.component.html',
})
export class ListWarehouseTransferComponent extends AppComponentBase implements OnInit {
  title: string = 'Transferencias';
  transfers: WarehouseTransferDto[] = [];

  constructor(private _transferService: WarehouseTransferService) {
    super();
  }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.transfers = await this._transferService.getAll();
  }

  create() {
    window.open('/warehouse-transfer/create', '_blank');
  }

  view(row: WarehouseTransferDto) {
    window.open(`/warehouse-transfer/view/${row.id}`, '_blank');
  }

  async accept(row: WarehouseTransferDto) {
    const confirm = await this.confirm(
      'Aceptar transferencia',
      'Se carga el stock en ' + row.toWarehouse + '.',
      true,
      'Aceptar',
      'Cancelar'
    );
    if (!confirm.value) {
      return;
    }
    const response = await this._transferService.accept(row.id);
    this.afterAction(response);
  }

  async reject(row: WarehouseTransferDto) {
    const confirm = await this.confirmWithInput(
      'Rechazar transferencia',
      'La cantidad vuelve a ' + row.fromWarehouse + '.'
    );
    if (confirm.dismiss) {
      return;
    }
    const response = await this._transferService.reject(row.id, confirm.value);
    this.afterAction(response);
  }

  afterAction(response: RequestResult) {
    if (response.success) {
      this.success(response.title, response.messageResponse);
      this.getAll();
    } else {
      this.error(response.title, response.messageResponse);
    }
  }
}
