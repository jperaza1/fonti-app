import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '../../../../AppComponentBase';
import { WarehouseTransferDto } from '../dtos/warehouse-transfer-dto';
import { WarehouseTransferService } from '../warehouse-transfer.service';
import { RequestResult } from '../../../../../_models/RequestResult';

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

  async accept() {
    const confirm = await this.confirm(
      'Aceptar transferencia',
      'Se carga el stock en ' + this.model.toWarehouse + '.',
      true,
      'Aceptar',
      'Cancelar'
    );
    if (!confirm.value) {
      return;
    }
    const response = await this._transferService.accept(this.model.id);
    this.afterAction(response);
  }

  async reject() {
    const confirm = await this.confirmWithInput(
      'Rechazar transferencia',
      'La cantidad vuelve a ' + this.model.fromWarehouse + '.'
    );
    if (confirm.dismiss) {
      return;
    }
    const response = await this._transferService.reject(this.model.id, confirm.value);
    this.afterAction(response);
  }

  async afterAction(response: RequestResult) {
    if (response.success) {
      this.success(response.title, response.messageResponse);
      this.model = await this._transferService.getById(this.model.id);
    } else {
      this.error(response.title, response.messageResponse);
    }
  }

  back() {
    window.location.href = '/warehouse-transfer';
  }
}
