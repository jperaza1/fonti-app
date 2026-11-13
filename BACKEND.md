# Backend de este frontend

La API de Fonti **no vive en este repo**. Está en otro proyecto (.NET).

## Dónde está

| Desde | Ruta |
|-------|------|
| **Windows** | `C:\Proyectos\robert\fonti\backend` |
| **WSL** | `/mnt/c/Proyectos/robert/fonti/backend` |

Repo / carpeta: `backend`. Solución: `cod.base.template.sln`.  
Guía inversa (este front visto desde el API): `FRONTEND.md` dentro de ese proyecto.  
Onboarding del API: `INIT.md` y `README.md` en el backend.

## Hosts

| Host | Proyecto | Puerto por defecto | Rol |
|------|----------|--------------------|-----|
| Auth | `cod.auth` | **5000** (IIS Express: **44390**) | Login, usuarios, tenants, roles |
| Data | `cod.data` | **5001** (IIS Express: **44367**) | Negocio: ventas, gastos, catálogos, distribuidores |

Ambos usan la misma base y el mismo JWT.

## Cómo apunta este front al API

`src/environments/environment.ts` → `configUrl: './assets/config.local.json'`.

```json
{
  "data": "https://localhost:44367/api/v2/",
  "auth": "https://localhost:44390/api/v2/"
}
```

Si levantas con `dotnet run` (Kestrel), cambia esas URLs a `http://localhost:5001/api/v2/` y `http://localhost:5000/api/v2/`.

Contrato: `api/v2/{Controller}/{Action}`. Los services (`*.service.ts`) concatenan `this._config.config.data` + `Controller/Action`.

## Módulos que se espejan

| Frontend (`src/app/views`) | Backend (`cod.application` + `cod.data/Controllers`) |
|----------------------------|------------------------------------------------------|
| `data/route` | `Route` |
| `data/distributor` | `Distributor` |
| `data/product`, `vendor`, `customer`, `truck` | `Product`, `Vendor`, `Customer`, `Truck` |
| `operation/unit-of-measure`, `operation/product-recipe` | `UnitOfMeasure`, `ProductRecipe` |
| `operation/inventory`, `operation/kardex`, `operation/production` | `Kardex`, `Production` |
| `operation/sale`, `expense`, `invoice`, `payment`, `payment-schedule` | `Sale`, `Expense`, `Invoice`, `Payment`, `PaymentSchedule` |
| `operation/purchase-order` | `PurchaseOrder`, `PriceApproval` |
| `auth/user` | Users (`cod.auth`) |

Permisos del menú (`page-menus.ts`) son roles Identity y viven en `AspNetRoles`. **Inventario** agrupa inventario, producción, kardex, recetas y unidades de medida. **Ordenes de Compra** es un ítem de primer nivel (`OPERATION.PURCHASE_ORDER`). El reporte de órdenes y el de gastos cuelgan de **Reportes**. La solicitud de precios no va en el menú.

Producción usa el grupo de tipos `PRODUCTION_SHIFT`. Solo puede haber un turno abierto en la planta. **Cerrar turno** (`Production/CloseShift`) conserva el inventario y deja abrir otro. Mientras está abierto, guardar una línea manda `productionShiftId` y la agrega a ese turno. Anular (`CancelShift`) revierte el inventario; un turno cerrado no se anula. El listado muestra fecha, turno y estado, sin la columna de productos. La pérdida se escribe en la fila del producto y solo lista la materia prima de la receta. La cantidad de producción son unidades terminadas. Sin la casilla Por paquete, el consumo es `unidades × cantidad × unidades por paquete ÷ produce`; con la casilla, es `unidades × cantidad`. El kardex abre con la fecha de hoy en inicio y fin.

La orden de compra no pide cafetería ni ruta. Las líneas salen de `Product/GetByVendor` y guardan `productVendorId`. Al pasar a revisión entra el inventario. `PURCHASE_ORDER_PRICE_APPROVAL` en `gen.Configurations` decide si un cambio de costo abre solicitud (`true`) o actualiza el costo al recibir (`false` o clave ausente). La pantalla de esa solicitud es `/purchase-order/price-approval/:token`. Con la orden guardada y el estado entre Procesando y Completado, la pestaña **Facturas** usa `Invoice/GetByPurchaseOrder`. **Agregar Factura** (`OPERATION.INVOICE.CREATE`) solo en Procesando: manda el JSON a `Invoice/AddInvoice` con `purchaseOrderId` y `description`. El archivo se sube después, al reabrir la factura. Borrar usa `OPERATION.INVOICE.DELETE`. `operation.ExpenseInvoices` necesita `PurchaseOrderId` y `Description`; esa migración todavía no está generada.

En Ventas, el lápiz usa `OPERATION.SALE.VIEW` y abre la venta. Si ya existe, ruta, tipo, cliente, fecha y cantidades se habilitan solo con `OPERATION.SALE.UPDATE`; Guardar usa ese mismo permiso. Una venta con factura se puede ver y no se edita. El API es `PUT Sale/Update?id=`. Al abrir una venta se ven las líneas guardadas. Precio 0 se muestra como **Regalía**. Debajo del detalle, **Según control de salida** muestra `dispatchSummary` de `Sale/GetById`: botellones y demás productos vendidos del control de esa ruta y esa fecha (salida + recargas − retorno). Si `hasDispatchControl` es falso, se avisa que no hay control. El campo Vendedor está bloqueado: al elegir la ruta se copia `vendor` y se manda en el alta y en la edición. El listado muestra esa columna. `Sale/GetAll` filtra por ruta cuando `routeId` es mayor a 0. **Facturar al Contado** está en el listado con `OPERATION.SALE.CONSOLIDATE`. Toma la ruta y las fechas del filtro, lista las ventas al contado activas y sin factura, y deja escribir la cantidad de cada producto con precio mayor a 0. El cliente y la fecha son de la venta nueva y de su factura. `POST Sale/GetConsolidateAvailability` trae lo disponible; `POST Sale/Consolidate` descuenta, crea la venta y la factura. Si no alcanzan los botes, no guarda nada. El permiso está en el menú de Ventas y en `AspNetRoles`, sin asignarlo a un rol.

En Rutas (`data/route`), el formulario y el listado tienen **Vendedor**. No es obligatorio. `Route/GetAllActive` y `Route/GetAvalible` lo devuelven. El formulario también tiene el switch **Da crédito** (`givesCredit`). Se manda en `Route/Create` y `Route/Update`, y `Route/GetById` lo regresa para dejar el switch como quedó guardado. `Route/GetAll` lo incluye y el listado muestra la columna Crédito (Sí / No). Columna `data.Routes.GivesCredit` (`bit` no nulo, default falso); la migración es `20261107022108_adding-Route-Credit`. Con el switch encendido, el talonario muestra **Mostrar al crédito** al agregar un producto y en la grilla. Ese flag es `showCreditPrice`. No se escribe otro monto: si está marcado, el crédito usa el precio de esa fila. Solo una fila del mismo producto puede quedar marcada. `Route/GetById` y `Route/GetProductRoutePrices` lo traen. Columna `data.ProductRoutePrices.ShowCreditPrice` (`bit` no nulo, default falso). La migración `20261113154500_adding-show-credit-price` la crea y la enciende donde `CreditPrice` ya era mayor a 0. La tablet anterior no lee el flag; la nueva cobra el precio de la fila marcada.

**Reportes** de ventas, además de facturas pendientes:

| Menú | Ruta | Permiso | `report` |
|------|------|---------|----------|
| Ranking de vendedores | `sale/vendor-report` | `OPERATION.SALE.VENDOR_REPORT` | `vendor` |
| Productos vendidos | `sale/product-report` | `OPERATION.SALE.PRODUCT_REPORT` | `product` |
| Contado y crédito | `sale/payment-type-report` | `OPERATION.SALE.PAYMENT_TYPE_REPORT` | `payment` |
| Cantidades por ruta | `sale/route-quantity-report` | `OPERATION.SALE.ROUTE_QUANTITY_REPORT` | — |

El servicio hace `POST Sale/GetChartReport` con `dateFrom`, `dateTo` y `report`. En productos, un clic pide `report: product-price` y `product` con el nombre, y abre la cantidad de botes por precio. Precio 0 se lee Regalía. Los códigos de esas tres gráficas están en `AspNetRoles` y no quedan asignados a un rol. Cantidades por ruta llama a `POST Sale/GetRouteQuantityReport` con `dateFrom` y `dateTo`. La grilla tiene una fila por ruta y su vendedor, una columna por producto con la cantidad vendida en el rango (regalía y venta juntas, sin precio) y una fila Total. No hay columna de fecha. Arriba se listan lunes a domingo de cada semana que toca el rango. El filtro abre en la semana actual. Se exporta a Excel con el botón de la grilla. El permiso está en `AspNetRoles` y no queda asignado a un rol. El control de salida copia el vendedor de la ruta al mismo recuadro de solo lectura del camión. En el retorno, los botes faltantes pueden ser 0. Al crear, si ya hay un control activo de esa ruta en la misma fecha, no se guarda. Uno desactivado no bloquea.

**Programación de pagos** cuelga de Finanzas. El módulo es `operation/payment-schedule`. Rutas: `/payment-schedule`, `/payment-schedule/create` y `/payment-schedule/view/:id`. El servicio llama a `PaymentSchedule/GetAll`, `GetById`, `GetCarryForward`, `Create`, `AddDetails` y `RegisterPayment`. El alta trae los saldos sin pagar. En la programación más reciente se agregan líneas y se guarda el real; **Pagado** lo iguala al monto a pagar (el mayor entre acumulado y proyectado). Permisos en `AspNetRoles`: `OPERATION.PAYMENT_SCHEDULE`, `CREATE`, `VIEW`, `PARTIAL` y `FINISH`. El menú exige el de ver; las acciones no se incluyen unas a otras. La migración es `20261104171141_adding-schedule-payment`.

En el usuario, la grilla de alertas sale de `EnumDefinition`. **Correlativos por vencer** (`CorrelativeExpiring` = 2) cuenta correlativos activos a 30 días o menos de la fecha límite, o con 100 números o menos por usar. Hay que marcarla en el usuario para verla en el inicio. El tipo de usuario `Vendor` (valor 4) se muestra como Vendedor. Al elegirlo, el formulario pide una o más rutas activas. El login las trae en `userAuth.routes` y `AuthenticationService` las guarda en `currentUser.routes`. La columna es `auth.ApplicationUserProfiles.Routes`, migración `20261027045938_adding-route-userprofile`.

## Levantar el API (desde Windows)

```bat
cd C:\Proyectos\robert\fonti\backend
dotnet restore cod.base.template.sln
dotnet ef database update --project cod.persistence --startup-project cod.data
dotnet run --project cod.auth\cod.auth.csproj
dotnet run --project cod.data\cod.data.csproj
```

Swagger Data: `http://localhost:5001/swagger`.
