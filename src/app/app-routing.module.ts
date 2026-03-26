import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginV2Page } from './pages/login/login-v2/login-v2'
import { AuthGuard } from '../_helpers/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
    data: { title: 'Inicio' },
    canActivate: [AuthGuard],
  },

  {
    path: 'tenant',
    loadChildren: () =>
      import('./views/auth/tenant/tenant.module').then((m) => m.TenantModule),
    data: { title: 'Company' },
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./views/auth/user/user.module').then((m) => m.UserModule),
    data: { title: 'User' },
    canActivate: [AuthGuard],
  },
  {
    path: 'group-role',
    loadChildren: () =>
      import('./views/auth/group-role/group-role.module').then(
        (m) => m.GroupRoleModule,
      ),
    data: { title: 'Group Roles' },
    canActivate: [AuthGuard],
  },
  {
    path: 'dish',
    loadChildren: () =>
      import('./views/sale-point/dish/dish.module').then((m) => m.DishModule),
    data: { title: 'Platos' },
    canActivate: [AuthGuard],
  },
  {
    path: 'side-item',
    loadChildren: () =>
      import('./views/sale-point/side-item/side-item.module').then((m) => m.SideItemModule),
    data: { title: 'Complementos' },
    canActivate: [AuthGuard],
  },
  {
    path: 'role',
    loadChildren: () =>
      import('./views/auth/role/role.module').then((m) => m.RoleModule),
    data: { title: 'Roles' },
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginV2Page, data: { title: 'LOGIN' } },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./views/gen/configuration/configuration.module').then(
        (m) => m.ConfigurationModule,
      ),
    data: { title: 'Configuraciones' },
    canActivate: [AuthGuard],
  },
  {
    path: 'type',
    loadChildren: () =>
      import('./views/data/type/type.module').then((m) => m.TypeModule),
    data: { title: 'Types' },
    canActivate: [AuthGuard],
  },
  {
    path: 'type-group',
    loadChildren: () =>
      import('./views/data/typegroup/typegroup.module').then(
        (m) => m.TypeGroupModule,
      ),
    data: { title: 'Type Group' },
    canActivate: [AuthGuard],
  },
  {
    path: 'alert-email',
    loadChildren: () =>
      import('./views/alert-email/alert-email.module').then(
        (m) => m.AlertEmailModule,
      ),
    data: { title: 'Alert Emails' },
    canActivate: [AuthGuard],
  },
  {
    path: 'cafeteria',
    loadChildren: () =>
      import('./views/data/cafeteria/cafeteria.module').then((m) => m.CafeteriaModule),
    data: { title: 'Cafeterias' },
    canActivate: [AuthGuard],
  },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./views/data/vendor/vendor.module').then((m) => m.VendorModule),
    data: { title: 'Proveedores' },
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./views/data/customer/customer.module').then((m) => m.CustomerModule),
    data: { title: 'Clientes' },
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/data/register/register.module').then((m) => m.RegisterModule),
    data: { title: 'Registros' },
    canActivate: [AuthGuard],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./views/data/product/product.module').then((m) => m.ProductModule),
    data: { title: 'Productos' },
    canActivate: [AuthGuard],
  },
  {
    path: 'route',
    loadChildren: () =>
      import('./views/data/route/route.module').then((m) => m.RouteModule),
    data: { title: 'Rutas' },
    canActivate: [AuthGuard],
  },
  {
    path: 'correlative',
    loadChildren: () =>
      import('./views/data/correlative/correlative.module').then((m) => m.CorrelativeModule),
    data: { title: 'Correlativos' },
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./views/data/category/category.module').then((m) => m.CategoryModule),
    data: { title: 'Categorías' },
    canActivate: [AuthGuard],
  },
  {
    path: 'purchase-order',
    loadChildren: () =>
      import('./views/operation/purchase-order/purchase-order.module').then((m) => m.PurchaseOrderModule),
    data: { title: 'Pedidos de Compra' },
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./views/operation/invoice/invoice.module').then((m) => m.InvoiceModule),
    data: { title: 'Facturas' },
    canActivate: [AuthGuard],
  },
  {
    path: 'expense',
    loadChildren: () =>
      import('./views/operation/expense/expense.module').then((m) => m.ExpenseModule),
    data: { title: 'Gastos' },
    canActivate: [AuthGuard],
  },
  {
    path: 'sale',
    loadChildren: () =>
      import('./views/operation/sale/sale.module').then((m) => m.SaleModule),
    data: { title: 'Ventas' },
    canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./views/rrhh/employee/employee.module').then((m) => m.EmployeeModule),
    data: { title: 'Empleados' },
    canActivate: [AuthGuard],
  },
  {
    path: 'route',
    loadChildren: () =>
      import('./views/data/route/route.module').then((m) => m.RouteModule),
    data: { title: 'Rutas' },
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
