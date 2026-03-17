import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';

@Component({
  selector: 'app-custom-table-list',
  templateUrl: './custom-table-list.component.html',
  styleUrls: ['./custom-table-list.component.css']
})
export class CustomTableListComponent extends AppComponentBase implements OnInit {
  @Input() title: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
