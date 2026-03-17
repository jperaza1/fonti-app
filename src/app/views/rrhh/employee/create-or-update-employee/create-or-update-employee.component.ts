import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { EmployeeDto } from '../dtos/employee.dto';
import { TypeService } from '../../../data/type/type.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestVacationComponent } from '../request-vacation/request-vacation.component';
import { RequestVacationDto } from '../dtos/request-vacation.dto';

@Component({
  selector: 'app-create-or-update-employee',
  templateUrl: './create-or-update-employee.component.html',
  styleUrls: ['./create-or-update-employee.component.css']
})
export class CreateOrUpdateEmployeeComponent extends AppComponentBase implements OnInit {
  title: string = 'Nuevo Empleado';
  Model: EmployeeDto = new EmployeeDto();
  errors: any = {};

  id: number

  DxDataSourceGenderType: any = {};
  DxDataSourceEmploymentStatus: any = {};
  DxDataSourceEmploymentType: any = {};
  DxDataSourcePositions: any = {};
  DxDataSourceCafeteria: any = {};
  DxDataSourceUniformSize: any = {};
  DxDataSourceShift: any = {};
  DxDataSourcePayFrequency: any = {};
  routeSub: Subscription;

  @ViewChild("RequestVacationModal") RequestVacationModal: RequestVacationComponent;

  constructor(
    private _enumService: EnumDefinitionsService,
    private _typeService: TypeService,
    private _cafeteriaService: CafeteriaService,
    private _employeeService: EmployeeService,
    private _router: Router,
    
    private _route: ActivatedRoute,
  ) { 
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id']
    });
  }

  async ngOnInit() {
    this.initializeView();
    this.routeSub.unsubscribe();
    if(this.id > 0) await this.showUpdate();
  }

  async showUpdate() {
    //await this.initializeView();
    //this.setButtonOptions(true);
    await this.loadEmployeeInfo();
  }

  async loadEmployeeInfo() {
    let result = await this._employeeService.getById(this.id);
    this.Model = result;
    this.title = 'Editar Empleado # '+this.Model.firstName + ' ' + this.Model.lastName;
  }

  async getGenderTypes() {
    let result = await this._enumService.getGenderType();
    this.DxDataSourceGenderType = this.getDataSourceDx(result);
  }

  async getEmploymentStatus() {
    let result = await this._enumService.getEmploymentStatus();
    this.DxDataSourceEmploymentStatus = this.getDataSourceDx(result);
  }

  async getEmploymentType() {
    let result = await this._enumService.getEmploymentType();
    this.DxDataSourceEmploymentType = this.getDataSourceDx(result);
  }

  async getPositions() {
    let result = await this._typeService.getTypesByGroupCode("POSITION_EMPLOYEE");
    this.DxDataSourcePositions = this.getDataSourceDx(result);
  }

  async getUniformSizes() {
    let result = await this._typeService.getTypesByGroupCode("UNIFORM_SIZE");
    this.DxDataSourceUniformSize = this.getDataSourceDx(result);
  }

  async getCafeterias() {
    let result = await this._cafeteriaService.getActives();
    this.DxDataSourceCafeteria = this.getDataSourceDx(result);
  }

  async getShifts() {
    let result = await this._enumService.getShiftType();
    this.DxDataSourceShift = this.getDataSourceDx(result);
  }

  async getPayFrequencies() {
    let result = await this._enumService.getPayFrequency();
    this.DxDataSourcePayFrequency = this.getDataSourceDx(result);
  }

  async initializeView() {
    await this.getGenderTypes();
    await this.getEmploymentStatus();
    await this.getEmploymentType();
    await this.getPositions();
    await this.getUniformSizes();
    await this.getCafeterias();
    await this.getShifts();
    await this.getPayFrequencies();
  }

  closeTab() {
    try {
      window.close();
    } catch (error) {
      console.log('No se pudo cerrar la pestaña automáticamente:', error);
      // Alternativa: mostrar un mensaje al usuario para que cierre manualmente
      this.success('Información', 'Por favor, cierre esta pestaña manualmente.');
    }
  }

  async save() {
    let question = await this.customConfirm('¿Está seguro de guardar el empleado?', 'Esta acción no se puede revertir');
    if(question.value) {
      if(this.id > 0) {
        this.Model.id = this.id;
        var result = await this._employeeService.update(this.Model, this.id);
        if(result.success) {
          this.success('Success', 'El empleado se ha editado correctamente');
          this._router.navigate(['/employee']);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      } else {
        var result = await this._employeeService.create(this.Model);
        if(result.success) {
          this.success('Success', 'El empleado se ha guardado correctamente');
          this._router.navigate(['/employee']);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      }
    }
  }

  showAddRequestVacation() {
    this.RequestVacationModal.showAdd(this.Model);
  }

  async onClickView(data: RequestVacationDto) {
    let file = await this._employeeService.getRequestVacatioFile(data.id);
    this.openPdfInNewTab(file, `Solicitud de Vacación ${this.Model.firstName} ${this.Model.lastName}.pdf`);
  }



}
