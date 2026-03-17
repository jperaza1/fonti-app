import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  inputs: ['field'],
  styleUrls: []
})
export class ValidatorMessageComponent implements OnInit {

  @Input('error') error: any;
  @Input('field') field: string;
  @Input('modelError') modelError: any;

  constructor() { }

  ngOnInit() {
  }
}
