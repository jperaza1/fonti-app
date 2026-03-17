import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../models/option-button';

@Component({
  selector: 'app-modal-with-option-buttons',
  templateUrl: './modal-with-option-buttons.component.html',
  styleUrls: ['./modal-with-option-buttons.component.css']
})
export class ModalWithOptionButtonsComponent extends AppComponentBase implements OnInit {
  @Input() title: string;
  @Input() size: string = "lg";
  @Input() optionButtons: OptionButton[] = [];
  @Output() onOptionButton: EventEmitter<OptionButton> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();


  @ViewChild("modalDialog") content: any;
  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
  ) {
    super();
    this.optionButtons = [];
  }

  ngOnInit() {
  }

  show() {
    this.modalRef = this.modalService.open(this.content, {
      size: this.size,
      windowClass: 'cod-modal'
    });
  }

  onOptionButtonClicked(option: any) {
    this.onOptionButton.emit(option);
  }

  onSaveClicked() {
    this.onSave.emit();
  }

  onCloseClicked() {
    this.onClose.emit();
  }

  close() {
    this.modalRef.close();
  }
}
