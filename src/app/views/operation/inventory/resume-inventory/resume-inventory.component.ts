import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { InventoryService } from '../inventory-order.service';
import { ResumeInventoryDto } from '../dtos/resume-inventory.dto';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { InventoryDetailDto, InventoryDto } from '../dtos/inventory.dto';

@Component({
  selector: 'app-resume-inventory',
  templateUrl: './resume-inventory.component.html',
  styleUrls: ['./resume-inventory.component.css']
})
export class ResumeInventoryComponent extends AppComponentBase implements OnInit {
  title: string = "Resumen de Inventario por Proveedor";
  Model: ResumeInventoryDto[] = [];
  ModelDetails: InventoryDetailDto[] = [];
  columns: any[] = [];
  columnsDetails: any[] = [];
  OptionButtons: OptionButton[];
  type: number = 1;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;

  constructor(
    private _inventoryService: InventoryService
  ) { 
    super();
    this.initializeColumns();
    this.initializeColumnsDetails();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'vendor',
        caption: 'Proveedor'
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
    ];
  }

  initializeColumnsDetails() {
    this.columnsDetails = [
      {
        dataField: 'product',
        caption: 'Producto'
      },
    ];
  }

  ngOnInit(): void {
  }

  async getAll(id : number) {
    this.Model = await this._inventoryService.getAllResume(id);
  }

  async getAllDetails(id: number) {
    let result = await this._inventoryService.getById(id);
    this.ModelDetails = result.details;
  }

  async showResume(id: number, reference: string) {
    this.title = `Resumen de Inventario por Proveedores #${reference}`;
    this.type = 1;
    await this.getAll(id);
    this.setButtonOptions();
    this.entityComponent.show();
  }

  async showDetails(id: number, reference: string) {
    this.title = `Detalles de Inventario por Producto #${reference}`;
    this.type = 2;
    await this.getAllDetails(id);
    this.setButtonOptions();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "close":
        this.close();
        break;
    }
  }

  close() {
    this.entityComponent.close();
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    // else
    //   permission.push("TYPES.CREATE");
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
    ];
  }

}
