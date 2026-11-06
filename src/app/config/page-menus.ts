var pageMenus = [
  {
    icon: 'fa fa-th-large',
    title: 'Home',
    url: 'home',
    permissions: [],
  },
  {
    icon: 'fa fa-shopping-cart',
    title: 'Ventas',
    url: 'sale',
    permissions: ['OPERATION.SALE'],
  },
  {
    icon: 'fa fa-truck',
    title: 'Control de Salida',
    url: 'dispatch-control',
    permissions: ['OPERATION.DISPATCH-CONTROL'],
  },
  {
    icon: 'fa fa-shopping-cart',
    title: 'Ordenes de Compra',
    url: 'purchase-order',
    permissions: ['OPERATION.PURCHASE_ORDER'],
  },
  {
    icon: 'fa fa-boxes',
    title: 'Inventario',
    url: '',
    caret: 'true',
    permissions: ['OPERATION.INVENTORY', 'OPERATION.PRODUCTION', 'OPERATION.KARDEX', 'OPERATION.PRODUCT_RECIPE', 'OPERATION.UNIT_OF_MEASURE'],
    submenu: [
      {
        url: 'inventory',
        title: 'Inventario',
        permissions: ['OPERATION.INVENTORY'],
      },
      {
        url: 'production',
        title: 'Producción',
        permissions: ['OPERATION.PRODUCTION'],
      },
      {
        url: 'kardex',
        title: 'Kardex',
        permissions: ['OPERATION.KARDEX'],
      },
      {
        url: 'product-recipe',
        title: 'Recetas',
        permissions: ['OPERATION.PRODUCT_RECIPE'],
      },
      {
        url: 'unit-of-measure',
        title: 'Unidades de medida',
        permissions: ['OPERATION.UNIT_OF_MEASURE'],
      },
    ],
  },
  {
    icon: 'fa fa-file-invoice-dollar',
    title: 'Finanzas',
    url: '',
    caret: 'true',
    permissions: ['OPERATION.INVOICE_SALE', 'OPERATION.BANK_ACCOUNT', 'OPERATION.EXPENSE', 'OPERATION.INVOICE', 'OPERATION.PAYMENT', 'OPERATION.PAYMENT_SCHEDULE'],
    submenu: [
      {
        url: 'invoice',
        title: 'Facturas de Compra',
        permissions: ['OPERATION.INVOICE'],
      },
      {
        url: 'invoice-sale',
        title: 'Facturas de Venta',
        permissions: ['OPERATION.INVOICE_SALE'],
      },
      {
        icon: 'fa fa-money-bill-alt',
        title: 'Gastos',
        url: 'expense',
        permissions: ['OPERATION.EXPENSE'],
      },
      {
        url: 'payment',
        title: 'Pagos',
        permissions: ['OPERATION.PAYMENT'],
      },
      {
        url: 'payment-schedule',
        title: 'Programación de pagos',
        permissions: ['OPERATION.PAYMENT_SCHEDULE'],
      },
      {
        url: 'bank-account',
        title: 'Cuentas bancarias',
        permissions: ['OPERATION.BANK_ACCOUNT'],
      },
    ],
  },
  
  {
    icon: 'fas fa-user-shield',
    title: 'Operaciones',
    url: '',
    caret: 'true',
    permissions: ['DATA.VENDORS', 'DATA.PRODUCT', 'DATA.ROUTE', 'DATA.DISTRIBUTOR', 'DATA.TRUCK', 'DATA.CORRELATIVE', 'DATA.CATEGORY', 'DATA.CUSTOMER', 'DATA.BANK'],
    submenu: [
      {
        url: 'vendor',
        title: 'Proveedores',
        permissions: ['DATA.VENDORS'],
      },
      {
        url: 'customer',
        title: 'Clientes',
        permissions: ['DATA.CUSTOMER'],
      },
      {
        url: 'product',
        title: 'Productos',
        permissions: ['DATA.PRODUCT'],
      },
      {
        url: 'route',
        title: 'Rutas',
        permissions: ['DATA.ROUTE'],
      },
      {
        url: 'distributor',
        title: 'Distribuidores',
        permissions: ['DATA.DISTRIBUTOR'],
      },
      {
        url: 'truck',
        title: 'Camiones',
        permissions: ['DATA.TRUCK'],
      },
      {
        url: 'correlative',
        title: 'Correlativos',
        permissions: ['DATA.CORRELATIVE'],
      },
      {
        url: 'category',
        title: 'Categorías',
        permissions: ['DATA.CATEGORY'],
      },
      {
        url: 'bank',
        title: 'Bancos',
        permissions: ['DATA.BANK'],
      }
    ]
  },
  
  {
    icon: 'fa fa-file-invoice-dollar',
    title: 'Reportes',
    url: '',
    caret: 'true',
    permissions: [
      'OPERATION.SALE.PENDING_BILLING_REPORT',
      'OPERATION.SALE.VENDOR_REPORT',
      'OPERATION.SALE.PRODUCT_REPORT',
      'OPERATION.SALE.PAYMENT_TYPE_REPORT',
      'OPERATION.PURCHASE_ORDER.REPORT',
      'OPERATION.PURCHASE_ORDER.EXPENSE_REPORT'
    ],
    submenu: [
      {
        url: 'sale/pending-billing-report',
        title: 'Reporte de Facturas Pendientes',
        permissions: ['OPERATION.SALE.PENDING_BILLING_REPORT'],
      },
      {
        url: 'sale/vendor-report',
        title: 'Ranking de vendedores',
        permissions: ['OPERATION.SALE.VENDOR_REPORT'],
      },
      {
        url: 'sale/product-report',
        title: 'Productos vendidos',
        permissions: ['OPERATION.SALE.PRODUCT_REPORT'],
      },
      {
        url: 'sale/payment-type-report',
        title: 'Contado y crédito',
        permissions: ['OPERATION.SALE.PAYMENT_TYPE_REPORT'],
      },
      {
        url: 'purchase-order/report',
        title: 'Reporte de Ordenes de Compra',
        permissions: ['OPERATION.PURCHASE_ORDER.REPORT'],
      },
      {
        url: 'purchase-order/report-expense',
        title: 'Reporte de Gastos',
        permissions: ['OPERATION.PURCHASE_ORDER.EXPENSE_REPORT'],
      }
    ]
  },
  {
    icon: 'fas fa-database',
    title: 'Data',
    url: '',
    caret: 'true',
    permissions: [
      'DATA.TYPES',
      'DATA.TYPE_GROUP',
    ],
    submenu: [
      {
        url: 'type',
        title: 'Types',
        permissions: ['DATA.TYPES'],
      },
      {
        url: 'type-group',
        title: 'Type Groups',
        permissions: ['DATA.TYPE_GROUP'],
      },
    ],
  },
  {
    icon: 'fas fa-cogs',
    title: 'Company Settings',
    url: '',
    caret: 'true',
    permissions: [
      'COMPANY.ROLES',
      'COMPANY.GROUP_ROLES',
      'COMPANY.USER',
      'COMPANY.CONFIGURATION',
      'COMPANY.COMPANY',
      'PROFILE.COMPANY_PROFILE',
    ],
    submenu: [
      {
        url: 'tenant/profile',
        title: 'Profile Company',
        permissions: ['PROFILE.COMPANY_PROFILE'],
      },
      // {
      //   url: 'alert-email',
      //   title: 'Alert Emails', 
      //   permissions: ['PROFILE.COMPANY_PROFILE'],
      // },
      {
        url: 'tenant',
        title: 'Company',
        permissions: ['COMPANY.COMPANY'],
      },
      {
        url: 'configuration',
        title: 'Configurations',
        permissions: ['COMPANY.CONFIGURATION'],
      },
      {
        url: 'user',
        title: 'Users',
        permissions: ['COMPANY.USER'],
      },
      {
        url: 'group-role',
        title: 'Group Roles',
        permissions: ['COMPANY.GROUP_ROLES'],
      },
      {
        url: 'role',
        title: 'Roles',
        permissions: ['COMPANY.ROLES'],
      },
    ],
  }
]
export default pageMenus
