import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { EmployeeService } from '../employee.service';
import { EmployeeDto } from '../dtos/employee.dto';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent extends AppComponentBase implements OnInit {
  title: string = 'Empleados';
  DataSource: any[] = [];
  columns: any[] = [];

  constructor(private _employeeService: EmployeeService) { 
    super();
  }

  async ngOnInit() {
    this.initializeColumns();
    await this.getAll();
  }

  async getAll() {
    this.DataSource = await this._employeeService.getAll();
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
        dataField: 'firstName',
        caption: 'Nombre'
      },
      {
        dataField: 'lastName',
        caption: 'Apellido'
      },
      {
        dataField: 'identification',
        caption: 'Identificación',
      },
      {
        dataField: 'genderName',
        caption: 'Género',
      },
      {
        dataField: 'employmentStatusName',
        caption: 'Estado',
      },
      {
        dataField: 'employmentTypeName',
        caption: 'Tipo de Contrato',
      },
      
      {
        dataField: 'cafeteria',
        caption: 'Planta',
      },
      {
        dataField: 'position',
        caption: 'Cargo',
      }
    ];
  }

  onClickNew() {
    window.open('/employee/create', '_blank');
  }

  update(data: EmployeeDto) {
    window.open(`/employee/update/${data.id}`, '_blank');
  }

  onClickRefresh() {
    this.getAll();
  }

}
