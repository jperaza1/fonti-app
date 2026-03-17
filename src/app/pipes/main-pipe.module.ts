import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FormatInvoiceNumberPipe } from "./format-invoice-number.pipe"; // <---

@NgModule({
  declarations:[FormatInvoiceNumberPipe], // <---
  imports:[CommonModule],
  exports:[FormatInvoiceNumberPipe] // <---
})

export class MainPipe{}