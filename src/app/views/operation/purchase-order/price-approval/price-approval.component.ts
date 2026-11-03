import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchaseOrderService } from '../purchase-order.service';
import { PriceApprovalDetailDto, PriceApprovalDto } from '../dtos/price-approval.dto';

@Component({
  selector: 'app-price-approval',
  templateUrl: './price-approval.component.html',
  styleUrls: ['./price-approval.component.css']
})
export class PriceApprovalComponent extends AppComponentBase implements OnInit {

  priceApproval: PriceApprovalDto;
  token: string;
  loadError = false;
  submitting = false;
  routeSub: Subscription;
  title: string = 'Solicitud de Cambio de Precios';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _purchaseOrderService: PurchaseOrderService,
  ) {
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  async ngOnInit() {
    if (this.token) {
      await this.getPriceApproval();
    } else {
      this.loadError = true;
    }
    this.routeSub.unsubscribe();
  }

  get isPending(): boolean {
    return Number(this.priceApproval?.status) === 1;
  }

  get details(): PriceApprovalDetailDto[] {
    return this.priceApproval?.details ?? [];
  }

  statusBadgeClass(status: number): string {
    const value = Number(status);
    if (value === 2) {
      return 'approval-badge approval-badge--approved';
    }
    if (value === 3) {
      return 'approval-badge approval-badge--rejected';
    }
    return 'approval-badge approval-badge--pending';
  }

  costDifference(row: PriceApprovalDetailDto): number {
    return (Number(row?.newCost) || 0) - (Number(row?.oldCost) || 0);
  }

  async getPriceApproval() {
    try {
      this.priceApproval = await this._purchaseOrderService.getPriceApproval(this.token);
      this.loadError = !this.priceApproval;
      if (this.priceApproval?.reference) {
        this.title = 'Solicitud de Cambio de Precios ' + this.priceApproval.reference;
      }
    } catch {
      this.priceApproval = undefined;
      this.loadError = true;
      this.error('Error', 'No se pudo cargar la solicitud de cambio de precios.');
    }
  }

  openPurchaseOrder(): void {
    if (!this.priceApproval?.purchaseOrderId) {
      return;
    }
    const url = this._router.serializeUrl(
      this._router.createUrlTree(['/purchase-order', 'update', this.priceApproval.purchaseOrderId])
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async approve(): Promise<void> {
    if (!this.token || this.submitting || !this.isPending) {
      return;
    }
    const question = await this.customConfirm(
      '¿Está seguro de aprobar el cambio de precios?',
      'Esta acción no se puede revertir',
      'Aprobar',
      'Cancelar'
    );
    if (!question.value) {
      return;
    }
    this.submitting = true;
    try {
      const result = await this._purchaseOrderService.resolvePriceApproval({
        id: this.priceApproval.id,
        status: 2,
        note: ''
      });
      if (result.success) {
        this.success(result.title || 'Éxito', result.messageResponse || 'La solicitud se aprobó correctamente.');
        await this.getPriceApproval();
      } else {
        this.error(result.title || 'Error', result.messageResponse || 'No se pudo aprobar la solicitud.');
      }
    } catch {
      this.error('Error', 'No se pudo aprobar la solicitud.');
    } finally {
      this.submitting = false;
    }
  }

  async reject(): Promise<void> {
    if (!this.token || this.submitting || !this.isPending) {
      return;
    }
    const question = await this.customConfirm(
      '¿Está seguro de rechazar el cambio de precios?',
      'Esta acción no se puede revertir',
      'Rechazar',
      'Cancelar'
    );
    if (!question.value) {
      return;
    }
    this.submitting = true;
    try {
      const result = await this._purchaseOrderService.resolvePriceApproval({
        id: this.priceApproval.id,
        status: 3,
        note: ''
      });
      if (result.success) {
        this.success(result.title || 'Éxito', result.messageResponse || 'La solicitud se rechazó correctamente.');
        await this.getPriceApproval();
      } else {
        this.error(result.title || 'Error', result.messageResponse || 'No se pudo rechazar la solicitud.');
      }
    } catch {
      this.error('Error', 'No se pudo rechazar la solicitud.');
    } finally {
      this.submitting = false;
    }
  }
}
