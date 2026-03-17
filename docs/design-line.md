# Línea Gráfica - COD App

Documento de referencia para mantener la coherencia visual en futuros cambios de la aplicación Cash on Delivery.

**Nota**: El contenido principal usa fondos con contraste (#cbd5e1) para diferenciar cards y paneles. El sidebar mantiene el estilo original (blanco, bordes sutiles).

---

## 1. Paleta de Colores

### Colores principales
| Variable | Hex | Uso |
|----------|-----|-----|
| **Accent** | `#0d9488` | Botones activos, enlaces hover, elementos destacados |
| **Accent Dark** | `#0f766e` | Gradientes, estados hover |
| **Accent Darker** | `#115e59` | Gradientes profundos |

### Colores de texto
| Variable | Hex | Uso |
|----------|-----|-----|
| **Text Primary** | `#0f172a` | Títulos, texto principal |
| **Text Muted** | `#64748b` | Subtítulos, labels, texto secundario |

### Fondos
| Variable | Hex | Uso |
|----------|-----|-----|
| **Background Page** | `#cbd5e1` | Fondo principal de contenido (contraste) |
| **Background Light** | `#e2e8f0` | Filas zebra DataGrid, contenedores gráficos |
| **Background Lighter** | `#cbd5e1` | Headers DataGrid, footers, filter panel, pager |
| **Card Light** | `#ffffff` | Cards, contenedores, panel body |

### Bordes y sombras
| Variable | Valor | Uso |
|----------|-------|-----|
| **Card Border** | `rgba(13, 148, 136, 0.3)` | Bordes visibles (contenido) |
| **Card Shadow** | `0 4px 20px rgba(0, 0, 0, 0.18)` | Sombras de cards |
| **Card Shadow Hover** | `0 12px 40px rgba(0, 0, 0, 0.18)` | Hover de cards |

---

## 2. Paleta para Gráficos

Colores diversos para maximizar contraste entre series consecutivas:

```
#0d9488, #f59e0b, #8b5cf6, #10b981, #ef4444,
#3b82f6, #ec4899, #06b6d4, #84cc16
```

**Stride**: Usar `(index * 5) % 9` para índices consecutivos con colores diferenciados.

---

## 3. Tipografía

- **Métricas/Números**: JetBrains Mono (400, 600)
- **Títulos de sección**: 0.875rem, 600, uppercase, letter-spacing 0.02em
- **Labels**: 0.75rem, color muted

---

## 4. Componentes

### Cards
- `border-radius: 16px`
- `padding: 1.5rem`
- `border: 1px solid` (card-border)
- Transición en hover: `transform: translateY(-2px)`, sombra más pronunciada

### Tabs (selector de tipo)
- Fondo: `#cbd5e1`
- Tab activa: fondo blanco, color accent
- `border-radius: 10px` (contenedor), `8px` (tabs)

### Botones/Select
- `border-radius: 8px`
- Focus: `border-color: accent`

### Panel
- `border-radius: 16px`
- `border: 1px solid rgba(13, 148, 136, 0.3)`
- `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18)`
- **Heading**: fondo transparente, borde inferior sutil, padding 1rem 1.5rem
- **Title**: 1rem, 600, color primary
- **Body**: padding 1.5rem
- **Footer**: fondo #cbd5e1, borde superior sutil

### Loading
- **app-loader** (HTTP requests): Overlay con blur, card centrada, spinner CSS teal, mensaje "Procesando..."
- **ngx-loading-bar**: Barra teal con gradiente, 3px de alto
- **page-loader** (carga inicial): Fondo oscuro con blur, spinner teal circular

### DevExtreme DataGrid (global)
- **Contenedor**: fondo blanco, border-radius 12px, bordes `rgba(13, 148, 136, 0.3)`
- **Headers**: fondo #cbd5e1, texto muted, font-weight 600, iconos de orden/filtro teal en hover
- **Filas**: padding 0.6rem 1rem, bordes sutiles teal
- **Filas alternas** (dx-row-alt): fondo #e2e8f0
- **Hover**: fondo `rgba(13, 148, 136, 0.06)`
- **Selección**: fondo `rgba(13, 148, 136, 0.14)`
- **Fila enfocada**: fondo #0d9488, texto blanco, bordes teal
- **Links**: color accent, hover accent dark
- **Total footer / Filter panel**: fondo #cbd5e1, texto muted
- **Pager**: fondo #cbd5e1, borde superior sutil, botones border-radius 8px, hover teal, selección gradiente teal

### Modal (app-modal-with-option-buttons)
- **Content**: border-radius 16px, sombra 0 12px 40px rgba(0, 0, 0, 0.2)
- **Footer**: fondo #cbd5e1
- **Botón cerrar**: circular, fondo rojo suave, hover más intenso
- **Option buttons**: border-radius 8px, primary con gradiente teal
- **Divisor**: 1px, color rgba(13, 148, 136, 0.3)

### Login (login-v2)
- **Soporta dark mode** (true) y **light mode** (false) vía `isDarkMode` + clase `dark-theme` / `light-theme`
- **Light theme**: Fondo gradiente teal (#0d9488 → #0f766e → #115e59), card blanca, inputs con bordes teal
- **Dark theme**: Fondo gradiente oscuro (#0f172a → #1e293b), card #1e293b, inputs #0f172a
- **Switch**: Teal cuando light, oscuro cuando dark; iconos sol/luna
- **Botón login / Reenviar OTP**: Gradiente teal, border-radius 8px
- **Logo dark**: filter invert para legibilidad
- **Preferencia**: localStorage `theme` (dark/light)

---

## 5. Sidebar

- **Fondo**: `#E0E9EC`, borde derecho `rgba(13, 148, 136, 0.12)`, sombra `rgba(0, 0, 0, 0.03)`
- **Item activo**: Borde izquierdo teal, fondo `rgba(13, 148, 136, 0.08)`, texto accent
- **Hover**: Fondo `rgba(13, 148, 136, 0.06)`, texto accent
- **Nav-profile**: Fondo `#F8FAFC`
- **Submenu**: Fondo `#f1f5f9`, borde izquierdo `rgba(13, 148, 136, 0.08)`
- **Nav header**: uppercase, 0.7rem, color muted

---

## 6. Navbar/Header (mismo tono que sidebar)

- **Fondo**: `#E0E9EC`
- **Borde inferior**: `1px solid rgba(13, 148, 136, 0.3)`
- **Sombra**: `0 2px 12px rgba(0, 0, 0, 0.08)`
- **Links**: Color muted, hover accent
- **Dropdowns**: `border-radius: 12px`, sombra 0 8px 24px rgba(0, 0, 0, 0.18)
- **Logo dark**: `filter: brightness(0) invert(1)`, `opacity: 0.95` (clase `.navbar-logo`)
- **Toggle tema**: Icono sol/luna junto a campanita de notificaciones

---

## 7. Dark Mode (tema oscuro)

La app soporta **dark mode** y **light mode** con persistencia en localStorage.

### Arquitectura
- **ThemeService** (`src/_services/theme.service.ts`): Gestiona el estado del tema, localStorage y aplicación al DOM
- **Clave localStorage**: `theme` → valores `'dark'` | `'light'`
- **Clase en `<html>`**: `dark-theme` | `light-theme`
- **Script en index.html**: Aplica tema antes de cargar Angular (evita flash)

### Paleta Dark Mode
| Elemento | Light | Dark |
|----------|-------|------|
| Fondo página | #cbd5e1 | #0f172a |
| Sidebar/Header | #E0E9EC | #1e293b |
| Cards/Paneles | #ffffff | #1e293b / #334155 |
| Dashboard fondo | gradiente #cbd5e1 | gradiente #1e293b → #475569 |
| Dashboard cards | #ffffff | #334155 |
| Texto principal | #0f172a | #e2e8f0 / #f1f5f9 |
| Texto secundario | #64748b | #94a3b8 |
| Accent | #0d9488 | #14b8a6 / #2dd4bf |

### Componentes con overrides dark
- **Sidebar, Header, Panel, Modal**: fondos #1e293b, #0f172a
- **DevExtreme**: DataGrid, TreeList, Toolbar, Checkbox, Select, TextEditor, Popup/List
- **Stepper**: step-panel, upload-zone, code-input
- **Upload files**: upload-info-card, dx-fileuploader
- **Logo**: filter invert en dark (login y navbar)

### Toggle
- **Login**: Switch en esquina superior derecha
- **Header**: Icono sol/luna junto a notificaciones (clase `.navbar-theme-toggle`)

---

## 8. Gráficos (amCharts)

- **Grid**: `#e2e8f0`, opacity 0.6
- **Labels**: 11px, color muted
- **Cursor**: Color accent, opacity 0.3
- **Leyenda**: 12px, labels muted, values primary
- **Columnas**: width 55%, corner-radius 6px
- **Pie/Donut**: innerRadius 45-50%

---

## 9. Archivos de Implementación

| Archivo | Contenido |
|---------|-----------|
| `src/assets/app.design-line.css` | Overrides globales (sidebar, navbar, panel, modal, loading, dx-datagrid, **dark mode completo**) |
| `src/_services/theme.service.ts` | Servicio de tema (localStorage, applyToDocument) |
| `src/index.html` | Script inicial de tema (antes de Angular) |
| `src/app/pages/login/login-v2/login-v2.css` | Login con soporte dark/light mode |
| `src/app/views/home/home.component.scss` | Estilos del dashboard |
| `src/styles.css` | Import de JetBrains Mono |

**Dashboard (home.component.scss)**:
- **Fondo**: gradiente `#cbd5e1` → `#94a3b8`
- **Cards**: border `rgba(13, 148, 136, 0.3)`, shadow `0 4px 20px rgba(0, 0, 0, 0.18)`
- **Chart tabs**: fondo `#cbd5e1`
- **Chart container**: gradiente `#e2e8f0` → `#cbd5e1`

---

## 10. Referencia en Cursor

Para cambios de UI, consultar este documento y aplicar la paleta y patrones definidos. El archivo está referenciado en `.cursorrules`.
