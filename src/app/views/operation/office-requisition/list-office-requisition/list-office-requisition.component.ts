import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { User } from '../../../../../_models/user';
import { FilterOfficeRequisitionDto } from '../dtos/filter-special-service.dto';
import { Router } from '@angular/router';
import { OfficeRequisitionService } from '../office-requisition.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { OfficeRequisitionDto } from '../dtos/office-requisition.dto';

@Component({
  selector: 'app-list-office-requisition',
  templateUrl: './list-office-requisition.component.html',
  styleUrls: ['./list-office-requisition.component.css']
})
export class ListOfficeRequisitionComponent extends AppComponentBase implements OnInit {
  title: string = 'Ordenes de Requisición';
  DataSource: any[] = [];
  columns: any[] = [];
  DxDatasourceStatus: any = {};
  DxDatasourceCafeteria: any = {};
  currentUser: User;
  filterModel: FilterOfficeRequisitionDto = new FilterOfficeRequisitionDto();

  constructor(
    private _router: Router,
    private _officeRequisitionService: OfficeRequisitionService,
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
    
    this.DataSource = await this._officeRequisitionService.getAll(this.filterModel);
    
  }

  onClickNew() {
    window.open('/office-requisition/create', '_blank');
  }

  async onClickRefresh() {
    this.getAll();
  }

  update(data: OfficeRequisitionDto) {
    window.open(`/office-requisition/update/${data.id}`, '_blank');
  }

  async onClickView(data: OfficeRequisitionDto) {
    let file = await this._officeRequisitionService.getOfficeRequisitionFile(data.id);
    this.openPdfInNewTab(file, `Orden de Requisición ${data.reference}.pdf`);
  }

}
