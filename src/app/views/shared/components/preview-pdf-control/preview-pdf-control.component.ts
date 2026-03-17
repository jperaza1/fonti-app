import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../models/option-button';
import { ModalWithOptionButtonsComponent } from '../modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-preview-pdf-control',
  templateUrl: './preview-pdf-control.component.html',
  styleUrls: ['./preview-pdf-control.component.css']
})
export class PreviewPdfControlComponent extends AppComponentBase implements OnInit {
  title: string = "Pdf";
  OptionButtons: OptionButton[];
  UrlIframe: SafeResourceUrl;

  @ViewChild("pdfComponent") entityComponent: ModalWithOptionButtonsComponent;

  constructor(
    public _sanitizer: DomSanitizer
  ) {
    super();
    this.OptionButtons = [
    ];
  }

  ngOnInit() {
  }
  show(url: string, title: string) {
    this.title = title;
    this.UrlIframe = undefined;
    this.UrlIframe = this.transform(url);
    this.entityComponent.show();
  }
  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "close":
        this.close();
        break;
    }
  }
  close() {
    this.entityComponent.close();
  }
  transform(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
