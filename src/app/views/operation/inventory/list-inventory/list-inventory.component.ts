import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductStockDto } from '../../kardex/dtos/kardex-dto';
import { KardexService } from '../../kardex/kardex.service';
import { InventoryMovementComponent } from '../inventory-movement/inventory-movement.component';
import { WarehouseDto } from '../../warehouse-transfer/dtos/warehouse-transfer-dto';
import { WarehouseService } from '../../warehouse-transfer/warehouse.service';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.css'],
})
export class ListInventoryComponent extends AppComponentBase implements OnInit {
  title: string = 'Inventario';
  products: ProductStockDto[] = [];
  warehouses: WarehouseDto[] = [];
  warehouseId: number;

  @ViewChild('movementModal') movementModal: InventoryMovementComponent;

  constructor(
    private _kardexService: KardexService,
    private _warehouseService: WarehouseService
  ) {
    super();
  }

  async ngOnInit() {
    this.warehouses = await this._warehouseService.getAll();
    const principal = this.warehouses.find((item) => item.kind === 1);
    this.warehouseId = principal ? principal.id : this.warehouses.length ? this.warehouses[0].id : null;
    this.getAll();
  }

  async getAll() {
    if (!this.warehouseId) {
      return;
    }
    this.products = await this._kardexService.getStock(this.warehouseId);
  }

  warehouseName() {
    const warehouse = this.warehouses.find((item) => item.id === this.warehouseId);
    return warehouse ? warehouse.name : '';
  }

  openEntry(product: ProductStockDto) {
    this.movementModal.show(product, false, this.warehouseId, this.warehouseName());
  }

  openExit(product: ProductStockDto) {
    this.movementModal.show(product, true, this.warehouseId, this.warehouseName());
  }

  exitTitle(product: ProductStockDto) {
    return product.productType === 3 ? 'Salida por mala calidad' : 'Salida';
  }
}
