import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertPreviewComponent } from '../../../home/alert-preview/alert-preview.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input("label") label: string = "";
  @Input("icon") icon: string = "";
  @Input("count") count: number = null;
  @Input("color") color: string = "";
  @Input("textColor") textColor: string = "";
  @Input('userAlert') userAlert: number = 0;

  @Output() onClicked = new EventEmitter<any>();

  constructor(
  ) {

  }

  ngOnInit() {
  }

  onClik() {
    this.onClicked.emit({
      userAlert: this.userAlert,
      label: this.label
    });
  }

}
