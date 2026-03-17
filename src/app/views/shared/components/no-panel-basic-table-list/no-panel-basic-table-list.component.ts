import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';

@Component({
  selector: 'app-no-panel-basic-table-list',
  templateUrl: './no-panel-basic-table-list.component.html',
  styleUrls: ['./no-panel-basic-table-list.component.css']
})
export class NoPanelBasicTableListComponent extends AppComponentBase implements OnInit {
  @Input() columns: any[] = [];
  @Input() dataSource: any[] = [];

  @Input() showAdd: boolean = true;
  @Input() showSearch: boolean = true;
  @Input() showExport: boolean = true;
  @Input() showRefresh: boolean = true;
  @Input() showSelection: boolean = false;
  @Input() pager: boolean = true;


  @Input() selectedRowColumn: string;
  @Input() selectedRows: any[];

  @Output() onNew: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>();

  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDisable: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnable: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

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
  onClickRemove(data: any){
    this.onRemove.emit(data);
  }

}
