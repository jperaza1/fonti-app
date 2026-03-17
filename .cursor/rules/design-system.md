# Sistema de Diseño — COD App

Guía de referencia para mantener consistencia visual en todos los componentes de la aplicación.

---

## Paleta de Colores

### Acentos

| Variable | Hex | Uso |
|---|---|---|
| `--accent-blue` | `#2E5BFF` | Primario, botones activos, gráficos principales |
| `--accent-cyan` | `#00C1D4` | Secundario, radar charts, indicadores |
| `--accent-purple` | `#8C54FF` | Gradientes, área charts, íconos de sección |
| `--accent-amber` | `#FAC032` | Alertas, advertencias |
| `--accent-rose` | `#F7617D` | Alertas críticas, gradientes cálidos |
| `--accent-green` | `#2DCE89` | Éxito, confirmaciones |

### Textos

| Variable | Hex | Uso |
|---|---|---|
| `--text-primary` | `#1F2937` | Títulos, valores destacados |
| `--text-secondary` | `#6B7280` | Subtítulos, labels de ejes |
| `--text-muted` | `#9CA3AF` | Labels secundarios, placeholders |

### Fondos y Bordes

| Variable | Hex | Uso |
|---|---|---|
| `--bg-card` | `#FFFFFF` | Fondo de tarjetas |
| `--bg-subtle` | `#F8FAFC` | Fondo de headers, fondos alternos |
| `--border-light` | `#E5E7EB` | Bordes de tarjetas, separadores |
| `--border-hover` | `#D1D5DB` | Bordes en estado hover |

### Paleta de Gráficos (amcharts4)

Usar siempre esta paleta fija en orden. Nunca colores aleatorios.

```
#2E5BFF, #00C1D4, #8C54FF, #FAC032, #F7617D,
#2DCE89, #FF6B35, #6F42C1, #20C997, #E83E8C
```

---

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Tarjetas en reposo |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)` | Tarjetas hover, gráficos |
| `--shadow-lg` | `0 10px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)` | Elementos elevados, modales |

---

## Bordes Redondeados

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `8px` | Botones, selectores internos |
| `--radius-md` | `12px` | Tarjetas internas, alertas |
| `--radius-lg` | `16px` | Contenedores principales, secciones |

---

## Transiciones

Usar siempre la curva `cubic-bezier(0.25, 0.46, 0.45, 0.94)` con duración `0.25s` para interacciones estándar.

```css
--transition: 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

Para animaciones de entrada usar `0.4s ease-out`.

---

## Tipografía

| Elemento | Tamaño | Peso | Color |
|---|---|---|---|
| Título de sección | `17px` | `600` | `--text-primary` |
| Subtítulo de sección | `13px` | `400` | `--text-secondary` |
| Título de tarjeta/chart | `14–16px` | `600` | `--text-primary` |
| Labels de ejes | `12px` | `400` | `--text-secondary` |
| Stat value | `15px` | `700` | `--text-primary` |
| Stat label | `11px` | `500` uppercase | `--text-muted` |
| Alert label | `13px` | `500` | `#6B7280` |
| Alert count | `26px` | `700` | Color de la alerta |

Aplicar `letter-spacing: -0.01em` en títulos y `-0.03em` en números grandes.

---

## Componentes

### Section Header

Cada sección principal lleva un header con:
- **Ícono**: cuadrado 40×40px, `border-radius: 10px`, fondo con `linear-gradient(135deg, ...)`, sombra coloreada
- **Título**: `h3` con clase `.section-title`
- **Subtítulo**: `p` con clase `.section-subtitle`

```html
<div class="section-header">
  <div class="section-title-area">
    <div class="section-icon [variante-icon]">
      <i class="fa fa-[icono]"></i>
    </div>
    <div>
      <h3 class="section-title">Título</h3>
      <p class="section-subtitle">Descripción breve</p>
    </div>
  </div>
</div>
```

### Tarjeta Contenedora

```css
background: var(--bg-card);
border: 1px solid var(--border-light);
border-radius: var(--radius-lg);
padding: 22px 24px;
box-shadow: var(--shadow-sm);
```

Hover: elevar a `--shadow-md` o `--shadow-lg`.

### Panel (componente compartido)

Componente `<panel>` reutilizable que implementa la tarjeta contenedora del design system.

**Estructura HTML:**

```html
<panel [title]="'Título'" [panelClass]="'mi-panel'" [footerClass]="'mi-footer'">
  <div header>Contenido opcional del header</div>
  Contenido del body
  <div footer>Contenido del footer</div>
</panel>
```

**Inputs:** `title`, `variant`, `noBody`, `bodyClass`, `footerClass`, `panelClass`

**Estilos (app.main.css, selector `panel .panel`):**

Los estilos se aplican globalmente para sobrescribir el framework Color Admin. Se usa `!important` donde el framework lo requiere.

| Elemento | Estilos |
|---|---|
| `panel .panel` | `--bg-card`, `--border-light`, `--radius-lg`, `--shadow-sm`; hover: `--shadow-md` |
| `panel .panel-heading` | `--bg-subtle`, `border-bottom`, `padding: 16px 24px` |
| `panel .panel-title` | `15px`, `600`, `--text-primary`, `letter-spacing: -0.01em` |
| `panel .panel-body` | `padding: 22px 24px` |
| `panel .panel-footer` | `--bg-subtle`, `border-top`, `padding: 16px 24px` |
| `panel .panel-loader` | Overlay centrado con spinner azul |
| `panel .panel-expand` | `position: fixed`, fullscreen |

**Variantes:** El panel usa `panel-inverse` por defecto; los estilos unificados aplican la paleta neutra del design system a todas las variantes.

**Override desde vistas:** Usar `panelClass` para aplicar estilos específicos con `::ng-deep` cuando se necesite (ej: `.mi-panel .panel-body { padding: 0; }`).

### dx-datagrid-pager / dx-pager (DevExtreme)

Pager del DataGrid de DevExtreme. Override en `app.main.css`.

| Elemento | Estilos |
|---|---|
| `.dx-datagrid-pager` | `border-top: 1px solid #E5E7EB`, `background: #F8FAFC`, `padding: 12px 20px` |
| `.dx-pager .dx-page`, `.dx-page-size` | `border-radius: 8px`, `border: 1px solid #E5E7EB`, `background: #FFFFFF`, `color: #6B7280`, `font-size: 13px` |
| Hover en page/page-size | `background: #F3F4F6`, `border-color: #D1D5DB`, `color: #1F2937` |
| `.dx-selection` (página activa) | `background: #2E5BFF`, `color: #FFFFFF` |
| `.dx-info` | `color: #6B7280`, `font-size: 13px` |
| `.dx-navigate-button` | `color: #6B7280`, hover `#2E5BFF` |
| Focus | `outline: 2px solid #2E5BFF` |

### app-modal-with-option-buttons (cod-modal)

Modal con panel y botones de opción. Usa `windowClass: 'cod-modal'` para aplicar estilos. Override en `app.main.css`.

**Estructura:** ng-bootstrap modal → `.modal-content` → `panel` + `ng-content` + `hr` + `.option-button`

| Elemento | Estilos |
|---|---|
| `.cod-modal .modal-content` | `border: 1px solid #E5E7EB`, `border-radius: 16px`, `--shadow-lg` |
| `.cod-modal .panel-heading-btn .btn-circle` | Botón cerrar: 32×32px, `border-radius: 8px`, borde `#E5E7EB`, hover rosa `#F7617D` |
| `.cod-modal hr` | `border-top: 1px solid #E5E7EB` |
| `.cod-modal .option-button` | `border-radius: 8px`, `font-size: 13px`, `font-weight: 600` |
| `.option-button.btn-primary` | `background: #2E5BFF`, hover más oscuro |
| `.option-button.btn-default` | Fondo blanco, borde `#E5E7EB`, hover `#F8FAFC` |
| `.option-button.btn-danger` | Texto `#F7617D`, hover fondo `#FEF2F2` |

**Tamaños:** `size="lg"`, `size="xl"`, `size="xxl"`, `size="xxxl"` (modal-xxl, modal-xxxl en app.main.css).

### Alert Card

Estructura: barra de acento superior (4px) + cuerpo con ícono cuadrado + label + contador.
- Hover: `translateY(-3px)` + sombra `0 8px 24px rgba(0,0,0,0.1)`
- Grid: `repeat(4, 1fr)` en desktop, `repeat(2, 1fr)` en móvil

### Chart Card

Estructura: header con fondo `--bg-subtle` + selector de tipo + canvas.
- Header: título con dot de color + selector de tipo de gráfico a la derecha
- Canvas: `height: 38–42vh`, `min-height: 300–320px`

### Chart Type Selector

Grupo de botones compactos dentro de un contenedor con fondo y borde:

```css
background: var(--bg-subtle);  /* o var(--bg-card) */
border: 1px solid var(--border-light);
border-radius: var(--radius-sm);
padding: 3–4px;
```

Botón activo:
- Variante A (report-expense): fondo blanco + color `--accent-blue` + `--shadow-sm`
- Variante B (graphic-preview): fondo `--accent-blue` + color blanco + sombra azul

### Stat Bar

Grid de 4 columnas con separadores de 1px usando `gap: 1px` y `background: var(--border-light)`.

```css
.stat-value: 15px, weight 700, --text-primary
.stat-label: 11px, weight 500, uppercase, letter-spacing 0.06em, --text-muted
```

---

## Gráficos (amcharts4)

### Configuración base para XY Charts

- Ejes: labels `12px`, color `#6B7280`, grid `strokeOpacity: 0.06–0.08`, dash `'4,4'` en valueAxis
- Cursor: líneas con `strokeDasharray: '3,3'`, `strokeOpacity: 0.3`
- Leyenda: `fontSize: 11–12`, marcadores con `cornerRadius(4,4,4,4)`, 14×14px

### Tipos de gráficos soportados

| Tipo | Clase amcharts | Detalles de estilo |
|---|---|---|
| **Bar** | `ColumnSeries` | `cornerRadiusTopLeft/Right: 5–6`, `fillOpacity: 0.88–0.9`, hover a `1` |
| **Line** | `LineSeries` | `strokeWidth: 3`, `tensionX/Y: 0.8`, bullets circulares 4–5px con borde |
| **Area** | `LineSeries` + fill | Gradiente vertical: color al 25% → transparente, `fillOpacity: 1` |
| **Pie** | `PieSeries` | `innerRadius: 35–40%`, `stroke: #fff`, `strokeWidth: 3`, hover `scale: 1.05` |
| **Radar** | `RadarSeries` | `fillOpacity: 0.1–0.15`, bullets circulares, cursor sin líneas |

### Paleta de colores en TypeScript

```typescript
const CHART_PALETTE = [
  '#2E5BFF', '#00C1D4', '#8C54FF', '#FAC032', '#F7617D',
  '#2DCE89', '#FF6B35', '#6F42C1', '#20C997', '#E83E8C',
];

// Aplicar al chart:
chart.colors.list = CHART_PALETTE.map(c => am4core.color(c));
```

---

## Animaciones

### Entrada de elementos (fadeSlideIn)

```typescript
trigger('fadeSlideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
])
```

### Entrada escalonada (alertas, listas)

```css
animation: fadeIn 0.4s ease-out both;
animation-delay: var(--item-delay, 0ms);

/* En el template: */
[attr.style]="'--item-delay: ' + (i * 60) + 'ms'"
```

---

## Responsive

| Breakpoint | Comportamiento |
|---|---|
| `> 992px` | Grids de charts en 2 columnas, alertas en 4 columnas |
| `768–992px` | Charts colapsan a 1 columna |
| `< 768px` | Alertas en 2 columnas, selectores de tipo se expanden al ancho completo, labels de botones se ocultan |
| `< 480px` | Stats en 2 columnas, tamaños de fuente reducidos |

---

## Header / Navbar

Estilos globales en `src/assets/app.main.css` con prefijo `cod-`.

### Estructura

- Fondo blanco con `border-bottom: 1px solid #E5E7EB` y `box-shadow: 0 1px 4px rgba(0,0,0,0.04)`
- Brand: logo + nombre del tenant separados por línea vertical (`border-left: 2px solid #E5E7EB`)
- Acciones a la derecha: notificaciones + usuario

### Notificaciones (campana)

- Contenedor cuadrado `36×36px`, `border-radius: 10px`, fondo `#F8FAFC`, borde `#E5E7EB`
- Hover: fondo `#EEF2FF`, borde `#C7D2FE`, color `#2E5BFF`
- Badge: pill `18px` de alto, fondo `#F7617D`, sombra rosa `rgba(247, 97, 125, 0.4)`

### Avatar de usuario

- Cuadrado `34×34px`, `border-radius: 10px`, gradiente `linear-gradient(135deg, #2E5BFF, #8C54FF)`
- Sombra: `0 2px 8px rgba(46, 91, 255, 0.2)`
- Nombre: `13px`, `font-weight: 600`, color `#1F2937`

### Dropdowns

```css
border: 1px solid #E5E7EB;
border-radius: 12px;
box-shadow: 0 10px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04);
min-width: 240px;
```

- Header del dropdown: `13px`, `font-weight: 600`, con badge de conteo en pill gris
- Items: `padding: 10px 12px`, `border-radius: 8px`, hover `#F8FAFC`
- Notificación badge: pill sobre fondo `#FEF2F2`, color `#F7617D`
- Logout: color `#DC2626`, hover fondo `#FEF2F2`

---

## Sidebar

Estilos globales en `src/assets/app.main.css` con prefijo `cod-`.

### Estructura general

- Fondo blanco con `border-right: 1px solid #E5E7EB` y `box-shadow: 1px 0 4px rgba(0,0,0,0.03)`
- Prefijo de clases: `cod-sidebar`, `cod-nav`, `cod-menu-item`, etc.

### Perfil de usuario

- Fondo `#FAFBFC` con `border-bottom: 1px solid #F3F4F6`
- Avatar: `40×40px`, `border-radius: 10px`, gradiente azul-violeta, sombra `rgba(46, 91, 255, 0.25)`
- Nombre: `14px`, `font-weight: 600`, color `#1F2937`
- Rol/Tenant: `12px`, color `#9CA3AF`

### Header de navegación

```css
font-size: 10px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.08em;
color: #9CA3AF;
```

### Items de menú

- `margin: 1px 10px`, `border-radius: 8px`
- Ícono en contenedor `40×40px`, color `#9CA3AF`
- Texto: `13px`, `font-weight: 500`, color `#4B5563`
- **Hover**: fondo `#F3F4F6`, color `#1F2937`
- **Activo**: fondo `#EEF2FF`, color `#2E5BFF`, barra lateral izquierda de `3px` azul con `border-radius`

### Sub-menús

- Indentación con bullet circular `5px` antes de cada item
- Bullet: `#D1D5DB` por defecto, `#6B7280` en hover, `#2E5BFF` con glow en activo
- Texto: `13px`, color `#6B7280`, activo `#2E5BFF` con `font-weight: 500`
- Niveles anidados: `padding-left` progresivo (`52px` → `68px` → `84px`)

### Botón minimizar

```css
margin: 8px 10px;
padding: 10px;
border-radius: 8px;
background: #F9FAFB;
border: 1px solid #F3F4F6;
color: #9CA3AF;
```

Hover: fondo `#F3F4F6`, borde `#E5E7EB`. En estado minimizado el ícono rota `180deg`.

---

## Convenciones de Código CSS

1. Declarar variables CSS en `:host` de cada componente
2. Usar comentarios con formato `/* ── Nombre ── */` para separar secciones
3. Encabezado de archivo con formato `/* ═══ Nombre — Descripción ═══ */`
4. Orden de propiedades: layout → dimensiones → visual → tipografía → transiciones
5. No usar `!important` (excepto overrides de framework Color Admin donde es necesario)
6. Preferir `var(--token)` sobre valores hardcodeados
7. Estilos globales de layout (header, sidebar) van en `src/assets/app.main.css` con prefijo `cod-`
8. Estilos de componentes Angular van en su propio `.component.css`
