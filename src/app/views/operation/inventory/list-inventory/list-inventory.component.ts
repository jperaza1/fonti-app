import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductStockDto } from '../../kardex/dtos/kardex-dto';
import { KardexService } from '../../kardex/kardex.service';
import { InventoryMovementComponent } from '../inventory-movement/inventory-movement.component';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.css'],
})
export class ListInventoryComponent extends AppComponentBase implements OnInit {
  title: string = 'Inventario';
  products: ProductStockDto[] = [];

  @ViewChild('movementModal') movementModal: InventoryMovementComponent;

  constructor(private _kardexService: KardexService) {
    super();
  }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.products = await this._kardexService.getStock();
  }

  openEntry(product: ProductStockDto) {
    this.movementModal.show(product, false);
  }

  openExit(product: ProductStockDto) {
    this.movementModal.show(product, true);
  }

  exitTitle(product: ProductStockDto) {
    return product.productType === 3 ? 'Salida por mala calidad' : 'Salida';
  }
}
