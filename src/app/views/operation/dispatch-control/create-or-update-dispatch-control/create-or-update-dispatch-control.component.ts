import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DispatchControlDetailDto, DispatchControlDto, ProductMovementDto } from '../dtos/dispatch-control.dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../../data/route/route.service';
import { ProductService } from '../../../data/product/product.service';
import { ProductDto } from '../../../data/product/dtos/product-dto';
import { DispatchControlService } from '../dispatch-control.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { RouteDto } from '../../../data/route/dtos/route-dto';

@Component({
  selector: 'app-create-or-update-dispatch-control',
  templateUrl: './create-or-update-dispatch-control.component.html',
  styleUrls: ['./create-or-update-dispatch-control.component.css']
})
export class CreateOrUpdateDispatchControlComponent extends AppComponentBase implements OnInit {

  title: string = 'Control de Salidas';
  model: DispatchControlDto = new DispatchControlDto();
  routeSub: Subscription;
  id: number;

  DxDataSourceRoute: any = {};

  products: ProductDto[] = [];
  routes: RouteDto[] = [];
  transferRoutes: RouteDto[] = [];
  transferRouteId: number;
  transferProductId: number;
  transferQuantity: number = 0;
  transferring = false;
  allowsTransfer = false;
  errors: any;

  update: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _routeService: RouteService,
    private _productService: ProductService,
    private _dispatchControlService: DispatchControlService,
    private _authenticationService: AuthenticationService) {
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id']
    });
    this.update = this._authenticationService.IsInRole('OPERATION.DISPATCH-CONTROL.UPDATE');
  }

  async ngOnInit() {
    this.routeSub.unsubscribe();
    await this.init();
  }

  async init() {
    await this.getRoutes();
    await this.getProducts();

    this.pickBottleProduct();
    await this.loadTransferSetting();

    if(!this.id){
      this.model = new DispatchControlDto();
      this.model.dispatchControlDate = new Date();

      var detail = new DispatchControlDetailDto();

      detail.dispatchControlType = 1;
      detail.bottleQuantity = 0;
      detail.crateQuantity = 0;
      detail.missingBottleQuantity = 0;

      for(let product of this.products) {
        var item = new ProductMovementDto();
        item.productId = product.id;
        item.product = product.name;
        item.quantity = 0;
        detail.productMovements.push(item);
      }
      this.model.dispatchControlDetails.push(detail);
    } else {
      this.model = await this._dispatchControlService.getById(this.id);
    }

    this.refreshTransferRoutes();
  }

  async getRoutes() {
    let result = await this._routeService.getAvalible();
    this.routes = result || [];
    this.DxDataSourceRoute = this.getDataSourceDx(this.routes);
  }

  async getProducts() {
    let result = await this._productService.getActives(1);
    this.products = result;
  }

  goBack() {
    this._router.navigate(['/dispatch-control']);
  }

  addDetail(type: number) {
    var detail = new DispatchControlDetailDto();
    detail.dispatchControlType = type;
    detail.bottleQuantity = 0;
    detail.crateQuantity = 0;
    detail.missingBottleQuantity = 0;

    for(let product of this.products) {
      var item = new ProductMovementDto();
      item.productId = product.id;
      item.product = product.name;
      item.quantity = 0;
      detail.productMovements.push(item);
    }


    this.model.dispatchControlDetails.push(detail);
  }

  onRouteItemClick(route: RouteDto) {
    this.model.truckId = route.truckId;
    this.model.truck = route.truck;
    this.model.vendor = route.vendor || '';
    this.refreshTransferRoutes();
  }

  isTransfer(detail: DispatchControlDetailDto): boolean {
    return detail.dispatchControlType === 4 || detail.dispatchControlType === 5;
  }

  availableOf(productId: number): number {
    let total = 0;
    for (const detail of this.model.dispatchControlDetails || []) {
      const sign = this.movementSign(detail.dispatchControlType);
      for (const line of detail.productMovements || []) {
        if (line.productId === productId) {
          total += sign * (Number(line.quantity) || 0);
        }
      }
    }
    return total;
  }

  async transfer() {
    if (this.transferring) {
      return;
    }
    const quantity = Number(this.transferQuantity) || 0;
    const available = this.availableOf(this.transferProductId);
    if (!this.transferRouteId) {
      this.error('Control de Salida', 'Elige la ruta que recibe.');
      return;
    }
    if (!this.transferProductId) {
      this.error('Control de Salida', 'Elige un producto.');
      return;
    }
    if (quantity <= 0) {
      this.error('Control de Salida', 'La cantidad tiene que ser mayor a 0.');
      return;
    }
    if (quantity > available) {
      this.error('Control de Salida', 'No hay suficiente en la ruta. Disponible: ' + available + '.');
      return;
    }

    const question = await this.customConfirm(
      '¿Pasar esta cantidad a la otra ruta?',
      'Se registra en los dos controles y no vuelve a planta'
    );
    if (!question.value) {
      return;
    }

    this.transferring = true;
    try {
      const result = await this._dispatchControlService.transfer({
        fromDispatchControlId: this.id,
        toRouteId: this.transferRouteId,
        productId: this.transferProductId,
        quantity
      });
      await this.afterTransfer(result);
    } finally {
      this.transferring = false;
    }
  }

  async cancelTransfer(detail: DispatchControlDetailDto) {
    if (this.transferring || !detail.dispatchTransferId) {
      return;
    }

    const question = await this.customConfirm(
      '¿Anular este traspaso?',
      'Se quita de las dos rutas'
    );
    if (!question.value) {
      return;
    }

    this.transferring = true;
    try {
      const result = await this._dispatchControlService.cancelTransfer(detail.dispatchTransferId);
      await this.afterTransfer(result);
    } finally {
      this.transferring = false;
    }
  }

  private async afterTransfer(result: { success: boolean; title: string; messageResponse: string; errors: any }) {
    if (result.success) {
      this.success(result.title, result.messageResponse);
      this.transferQuantity = 0;
      this.model = await this._dispatchControlService.getById(this.id);
      this.refreshTransferRoutes();
      return;
    }

    this.error(result.title, this.failureText(result));
    this.errors = result.errors;
  }

  private async loadTransferSetting() {
    try {
      const setting = await this._dispatchControlService.getTransferSetting();
      const value = setting && (setting.enabled || setting['Enabled']);
      this.allowsTransfer = value === true || String(value).toLowerCase() === 'true';
    } catch {
      this.allowsTransfer = false;
    }
  }

  private refreshTransferRoutes() {
    const routeId = this.model ? this.model.routeId : 0;
    this.transferRoutes = this.routes.filter((route) => route.id !== routeId);
    if (this.transferRouteId === routeId) {
      this.transferRouteId = null;
    }
  }

  private pickBottleProduct() {
    const bottle = this.products.find((product) => this.fold(product.name).includes('botellon'));
    this.transferProductId = bottle ? bottle.id : (this.products[0] ? this.products[0].id : null);
  }

  private movementSign(type: number): number {
    if (type === 1 || type === 2 || type === 5) {
      return 1;
    }
    if (type === 3 || type === 4) {
      return -1;
    }
    return 0;
  }

  private fold(value: string): string {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  private failureText(result: { messageResponse: string; errors: any }, empty = 'No se pudo guardar el traspaso.'): string {
    const errors = result && result.errors;
    if (errors && typeof errors === 'object') {
      const lines: string[] = [];
      Object.keys(errors).forEach((key) => {
        const value = errors[key];
        if (Array.isArray(value)) {
          value.forEach((item) => lines.push(String(item)));
        } else if (value) {
          lines.push(String(value));
        }
      });
      if (lines.length) {
        return lines.join(' ');
      }
    }
    if (result && result.messageResponse && result.messageResponse !== 'CANCELED') {
      return result.messageResponse;
    }
    return empty;
  }

  async save() {
    const question = await this.customConfirm(
      '¿Está seguro de guardar el control de salida?',
      'Esta acción no se puede revertir'
    );
    if (!question.value) {
      return;
    }

    if (this.id > 0) {
      this.model.id = this.id;
    }

    for (const detail of this.model.dispatchControlDetails || []) {
      if (detail.dispatchControlType === 3) {
        detail.crateQuantity = Number(detail.crateQuantity) || 0;
      }
    }

    const result = this.id > 0
      ? await this._dispatchControlService.update(this.model, this.id)
      : await this._dispatchControlService.create(this.model);

    if (result.success) {
      this.success(result.title, result.messageResponse);
      this.goBack();
    } else {
      this.error(result.title, this.failureText(result, 'No se pudo guardar el control de salida.'));
      this.errors = result.errors;
    }
  }
}
