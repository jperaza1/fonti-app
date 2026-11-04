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

La orden de compra no pide cafetería ni ruta. Las líneas salen de `Product/GetByVendor` y guardan `productVendorId`. Al pasar a revisión entra el inventario. `PURCHASE_ORDER_PRICE_APPROVAL` en `gen.Configurations` decide si un cambio de costo abre solicitud (`true`) o actualiza el costo al recibir (`false` o clave ausente). La pantalla de esa solicitud es `/purchase-order/price-approval/:token`.

**Programación de pagos** cuelga de Finanzas. El módulo es `operation/payment-schedule`. Rutas: `/payment-schedule`, `/payment-schedule/create` y `/payment-schedule/view/:id`. El servicio llama a `PaymentSchedule/GetAll`, `GetById`, `GetCarryForward`, `Create`, `AddDetails` y `RegisterPayment`. El alta trae los saldos sin pagar. En la programación más reciente se agregan líneas y se guarda el real; **Pagado** lo iguala al monto a pagar (el mayor entre acumulado y proyectado). Permisos en `AspNetRoles`: `OPERATION.PAYMENT_SCHEDULE`, `CREATE`, `VIEW`, `PARTIAL` y `FINISH`. El menú exige el de ver; las acciones no se incluyen unas a otras. La migración es `20261104171141_adding-schedule-payment`.

El tipo de usuario `Vendor` (valor 4) se muestra como Vendedor. Al elegirlo, el formulario pide una o más rutas activas. El login las trae en `userAuth.routes` y `AuthenticationService` las guarda en `currentUser.routes`. La columna es `auth.ApplicationUserProfiles.Routes`, migración `20261027045938_adding-route-userprofile`.

## Levantar el API (desde Windows)

```bat
cd C:\Proyectos\robert\fonti\backend
dotnet restore cod.base.template.sln
dotnet ef database update --project cod.persistence --startup-project cod.data
dotnet run --project cod.auth\cod.auth.csproj
dotnet run --project cod.data\cod.data.csproj
```

Swagger Data: `http://localhost:5001/swagger`.
