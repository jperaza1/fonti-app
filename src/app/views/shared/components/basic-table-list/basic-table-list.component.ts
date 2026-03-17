import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';

@Component({
  selector: 'app-basic-table-list',
  templateUrl: './basic-table-list.component.html',
  styleUrls: ['./basic-table-list.component.css']
})
export class BasicTableListComponent extends AppComponentBase implements OnInit {
  @Input() title?: string;
  @Input() columns: any[] = [];
  @Input() dataSource: any[] = [];

  @Input() showAdd: boolean = true;
  @Input() showRefresh: boolean = true;
  @Input() showSelection: boolean = false;
  @Input() showExport: boolean = true;
  @Input() showSearch: boolean = true;
  @Input() showDisable: boolean = true;
  @Input() showEnable: boolean = true;
  @Input() showGoTo: boolean = false;
  @Input() showSearchButton: boolean = false;

  @Input() permissionAllowCreate: string[];
  @Input() permissionAllowUpdate: string[];
  @Input() permissionAllowDisable: string[];
  @Input() permissionAllowEnable: string[];

  @Output() onNew: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>();

  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDisable: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnable: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDriverCall: EventEmitter<any> = new EventEmitter<any>();
  @Output() onGoTo?: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }
  ngOnInit() {
  }

  onClickNew() {
    this.onNew.emit(true);
  }
  onClickRefresh() {
    this.onRefresh.emit(true);
  }
  onClickEdit(data: any) {
    this.onEdit.emit(data);
  }
  onClickEnable(data: any) {
    this.onEnable.emit(data);
  }
  onClickDisable(data: any) {
    this.onDisable.emit(data);
  }
  onClickDelete(data: any) {
    this.onDelete.emit(data);
  }

  onClickDriverCall(data: any){
    this.onDriverCall.emit(data);
  }

  onClickGoTo(data: any){
    this.onGoTo?.emit(data);
  }

  onClickSearch(){
    this.onSearch.emit();
  }

}
