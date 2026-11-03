# Módulo Camiones (data/truck)

## Plan
- Crear el módulo `truck` dentro de `views/data`, siguiendo el patrón de `route`.
- DTO: `id`, `name` (Descripción), `plate` (Placa), `truckStatus` (Estado), `truckStatusName`, `isActive`.
- Servicio contra `Truck/GetAll`, `GetById`, `GetActive`, `Create`, `Update`, `Inactive`, `Active`.
- Listado y modal CreateOrUpdate sin claves de permiso.
- Menú Camiones en Operaciones, visible sin permiso.
- Estado del formulario desde `EnumDefinition/GetTruckStatus`.

## Tareas
- [x] DTO, servicio, módulo, listado y create/update
- [x] Ruta lazy `/truck` y entrada de menú
- [x] Combo de estado vía enum definitions

## Review
- Permisos de la tabla y del botón Guardar van en arreglo vacío: la directiva los trata como acceso permitido.
- El menú padre Operaciones sigue exigiendo algún permiso `DATA.*` existente; Camiones no agrega una clave nueva.
- No se verificó en navegador: la ruta exige login y el API local no respondió.
