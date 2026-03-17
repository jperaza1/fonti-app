import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { User } from '../../../../../_models/user';
import { SpecialServiceService } from '../special-service.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { FilterSpecialServiceDto } from '../dtos/filter-special-service.dto';
import { Router } from '@angular/router';
import { SpecialServiceDto } from '../dtos/special-service.dto';

@Component({
  selector: 'app-list-special-service',
  templateUrl: './list-special-service.component.html',
  styleUrls: ['./list-special-service.component.css']
})
export class ListSpecialServiceComponent extends AppComponentBase implements OnInit {
  title: string = 'Servicios Especiales';
  DataSource: any[] = [];
  columns: any[] = [];
  DxDatasourceStatus: any = {};
  DxDatasourceCafeteria: any = {};
  currentUser: User;
  filterModel: FilterSpecialServiceDto = new FilterSpecialServiceDto();

  constructor(
    private _router: Router,
    private _specialServiceService: SpecialServiceService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _cafeteriaService: CafeteriaService,
    private _authenticationService: AuthenticationService,
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
    this.filterModel.cafeteriaId = this.currentUser.cafeteriaId ?? 0;
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'statusName',
        caption: 'Estado',
        cellTemplate: 'orderStatusTemplate'
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
        dataField: 'date',
        caption: 'Fecha',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'creatorUser',
        caption: 'Creado por',
      },
      {
        dataField: 'approvedUser',
        caption: 'Aprobado por',
      }
    ];
  }

  async ngOnInit() {
    this.initializeColumns();
    await this.getOrderStatus();
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


  async getOrderStatus() {
    let purchaseOrderStatus = await this._enumDefinitionsService.getSpecialServiceStatus();
    purchaseOrderStatus.unshift({
      value: 0,
      text: 'Todos'
    } as any);
    this.DxDatasourceStatus = this.getDataSourceDx(purchaseOrderStatus);
  }

  async getAll() {
    
    this.DataSource = await this._specialServiceService.getAll(this.filterModel);
    
  }

  onClickNew() {
    window.open('/special-service/create', '_blank');
  }

  async onClickRefresh() {
    this.getAll();
  }

  update(data: SpecialServiceDto) {
    window.open(`/special-service/update/${data.id}`, '_blank');
  }

  async onClickView(data: SpecialServiceDto) {
    let file = await this._specialServiceService.getSpecialServiceFile(data.id);
    this.openPdfInNewTab(file, `Servicio Especial ${data.reference}.pdf`);
  }

}
