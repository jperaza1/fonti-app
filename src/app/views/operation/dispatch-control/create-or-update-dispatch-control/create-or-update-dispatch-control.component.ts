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
  }

  async getRoutes() {
    let result = await this._routeService.getAvalible();
    this.DxDataSourceRoute = this.getDataSourceDx(result);
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

    const result = this.id > 0
      ? await this._dispatchControlService.update(this.model, this.id)
      : await this._dispatchControlService.create(this.model);

    if (result.success) {
      this.success(result.title, result.messageResponse);
      this.goBack();
    } else {
      this.error(result.title, result.messageResponse);
      this.errors = result.errors;
    }
  }
}
