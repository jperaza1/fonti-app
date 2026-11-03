import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductionDto, ProductionFilterDto } from '../dtos/production-dto';
import { ProductionService } from '../production.service';
import { CreateProductionComponent } from '../create-production/create-production.component';

@Component({
  selector: 'app-list-production',
  templateUrl: './list-production.component.html',
  styleUrls: ['./list-production.component.css'],
})
export class ListProductionComponent extends AppComponentBase implements OnInit {
  title: string = 'Producción';
  productions: ProductionDto[] = [];
  filterModel: ProductionFilterDto = new ProductionFilterDto();

  @ViewChild('createModal') createModal: CreateProductionComponent;

  constructor(private _productionService: ProductionService) {
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
    this.productions = await this._productionService.getAll(this.filterModel);
  }

  openCreate() {
    this.createModal.show();
  }

  openShift(row: ProductionDto) {
    this.createModal.show(row);
  }

  async cancel(row: ProductionDto) {
    const confirmed = await this.confirm(
      'Anular turno',
      '¿Anular este turno? Se revierten todas las líneas de producción.'
    );
    if (!confirmed.value) {
      return;
    }

    const response = await this._productionService.cancelShift(row.id);
    if (response.success) {
      this.success(response.title, response.messageResponse);
      this.search();
    } else {
      this.error(response.title, response.messageResponse);
    }
  }

  async closeShift(row: ProductionDto) {
    const confirmed = await this.confirm(
      'Cerrar turno',
      '¿Cerrar este turno? No se podrán agregar más líneas y se podrá abrir otro turno.'
    );
    if (!confirmed.value) {
      return;
    }

    const response = await this._productionService.closeShift(row.id);
    if (response.success) {
      this.success(response.title, response.messageResponse);
      this.search();
    } else {
      this.error(response.title, response.messageResponse);
    }
  }
}
