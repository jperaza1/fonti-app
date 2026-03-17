# Cambios en la UI de Facturas

Resumen de las mejoras realizadas en las pantallas de facturas y órdenes de compra.

---

## 1. View Invoice (`view-invoice`)

### Previsualización de documento
- **Condición**: Se muestra cuando `hasFile === true` y `documentId > 0`
- **URL**: `${config.document}Attachment/GetAttachmentById?id=${id}`
- **Comportamiento**: Vista previa con overlay "Ver en grande", clic abre lightbox a pantalla completa
- **Cierre**: Clic fuera, botón × o tecla Escape

### Estructura
- Sección **Factura** debajo de Montos
- **Descripción** dentro de Información general

### Diseño editorial
- Tarjetas con bordes redondeados y sombras
- Tipografía DM Sans
- Paleta teal (#008c8c)
- Animaciones de entrada
- Icono de ojo en overlay de preview

---

## 2. Create/Update Invoice (`create-or-update-invoice`)

### Layout
- **Bootstrap grid**: `col-lg-6`, `col-md-4`, `col-sm-6`, `col-12`
- Campos que se ajustan al tamaño de pantalla

### Secciones
- **Información general**: Cafetería, Proveedor, Número Factura, Fecha, Tipo Pago, Método/Categoría, Descripción
- **Montos** (cuando `hasInvoice`): Monto Gravado, Exento, Descuento, Subtotal, ISV 15%, Total
- **Total único** (cuando no hay factura)

### Estética
- Misma paleta y tipografía que view-invoice
- Cards con hover
- Total destacado en color de acento
- Focus en inputs con borde teal

---

## 3. Create/Update PO Invoices (`create-or-update-po-invoices`)

### Lógica hasFile / documentId
- **`hasFile === false`**: Formulario de carga (dx-file-uploader)
- **`hasFile === true` y `documentId > 0`**: Vista previa de imagen con misma URL que view-invoice

### Funcionalidad
- Vista previa con overlay "Ver en grande"
- Clic abre lightbox a pantalla completa
- Botón "Eliminar" para quitar el documento
- `getDocumentImageUrl(id)` para construir URL
- `documentId` se asigna desde `DocumentsDataSource[0].idAttachment` al cargar documentos

### Layout
- **Columna izquierda**: Información general + Montos (Bootstrap grid)
- **Columna derecha**: Sección Factura (solo cuando `Model.id > 0`)

### Estética
- Coherente con create-or-update-invoice y view-invoice
- Formulario de carga con borde punteado
- Preview y lightbox con mismo estilo que view-invoice

---

## Archivos modificados

| Componente | Archivos |
|------------|----------|
| view-invoice | `view-invoice.component.html`, `view-invoice.component.ts`, `view-invoice.component.css` |
| create-or-update-invoice | `create-or-update-invoice.component.html`, `create-or-update-invoice.component.css` |
| create-or-update-po-invoices | `create-or-update-po-invoices.component.html`, `create-or-update-po-invoices.component.ts`, `create-or-update-po-invoices.component.css` |

---

## Dependencias

- **ConfigService**: Para construir URLs de documentos
- **Bootstrap**: Grid system (row, col-*)
- **Font Awesome**: Iconos (fa-eye, fa-times, fa-cloud-upload-alt, fa-trash)
- **Google Fonts**: DM Sans
