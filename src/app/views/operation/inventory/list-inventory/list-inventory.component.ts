import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { InventoryService } from '../inventory-order.service';
import { User } from '../../../../../_models/user';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { FilterInventoryDto } from '../dtos/filter-inventory.dto';
import { InventoryDto } from '../dtos/inventory.dto';
import { ResumeInventoryComponent } from '../resume-inventory/resume-inventory.component';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.css']
})
export class ListInventoryComponent extends AppComponentBase implements OnInit {
  title: string = 'Inventario';
  DataSource: any[] = [];
  columns: any[] = [];
  DxDatasourceCafeteria: any = {};
  currentUser: User;
  filterInventoryDto: FilterInventoryDto = new FilterInventoryDto();

  @ViewChild("resumeInventory") resumeInventory: ResumeInventoryComponent;

  constructor(
    private _inventoryService: InventoryService,
    private _authenticationService: AuthenticationService,
    private _cafeteriaService: CafeteriaService,
    
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
    this.filterInventoryDto.cafeteriaId = this.currentUser.cafeteriaId ?? 0;
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "150",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'reference',
        caption: 'Referencia'
      },
      {
        dataField: 'cafeteria',
        caption: 'Cafetería'
      },
      {
        dataField: 'register',
        caption: 'Caja'
      },
      {
        dataField: 'inventoryTypeName',
        caption: 'Tipo de Inventario',
      },
      {
        dataField: 'date',
        caption: 'Fecha',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'creatorUser',
        caption: 'Creado por',
      }
    ];
  }

  async ngOnInit() {
    this.initializeColumns();
    await this.getCafeteria();

    this.getAll();
  }

  async getCafeteria() {
    let result = await this._cafeteriaService.getActives();
    result.unshift({
      id: 0,
      name: 'Todos'
    } as any);
    this.DxDatasourceCafeteria = this.getDataSourceDx(result);
  }

  async getAll() {
    
    this.DataSource = await this._inventoryService.getAll(this.filterInventoryDto);
    
  }

  onClickNew() {
    window.open('/inventory/create', '_blank');
  }

  async onClickRefresh() {
    this.getAll();
  }

  update(data: InventoryDto) {
    window.open(`/inventory/update/${data.id}`, '_blank');
  }

  showResume(data: InventoryDto) {
    this.resumeInventory.showResume(data.id, data.reference);
  }

  showDetails(data: InventoryDto) {
    this.resumeInventory.showDetails(data.id, data.reference);
  }

}
