var pageMenus = [
  {
    icon: 'fa fa-th-large',
    title: 'Home',
    url: 'home',
    permissions: [],
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
    url: 'inventory',
    permissions: ['OPERATION.INVENTORY'],
  },
  {
    icon: 'fa fa-list-alt',
    title: 'Servicios Especiales',
    url: 'special-service',
    permissions: ['OPERATION.SPECIAL_SERVICE'],
  },
  {
    icon: 'fa fa-list-alt',
    title: 'Ordenes de Requisición',
    url: 'office-requisition',
    permissions: ['OPERATION.OFFICE_REQUISITION'],
  },
  {
    icon: 'fa fa-file-invoice-dollar',
    title: 'Reportes',
    url: '',
    caret: 'true',
    permissions: ['OPERATION.REPORT', 'OPERATION.EXPENSE_REPORT'],
    submenu: [
      {
        url: 'purchase-order/report',
        title: 'Reporte de Ordenes de Compra',
        permissions: ['OPERATION.REPORT'],
      },
      {
        url: 'purchase-order/report-expense',
        title: 'Reporte de Gastos',
        permissions: ['OPERATION.EXPENSE_REPORT'],
      },
    ]
  },
  {
    icon: 'fas fa-user-shield',
    title: 'RRHH',
    url: '',
    caret: 'true',
    permissions: ['RRHH.EMPLOYEE'],
    submenu: [
      {
        url: 'employee',
        title: 'Empleados',
        permissions: ['RRHH.EMPLOYEE'],
      },
    ]
  },
  {
    icon: 'fas fa-store',
    title: 'Punto de Venta',
    url: '',
    caret: 'true',
    permissions: ['OPERATION.SALE'],
    submenu: [
      {
        url: 'dish',
        title: 'Platos',
        permissions: ['OPERATION.SALE'],
      },
      {
        url: 'side-item',
        title: 'Complementos',
        permissions: ['OPERATION.SALE'],
      },
    ]
  },
  {
    icon: 'fa fa-file-invoice-dollar',
    title: 'Finanzas',
    url: '',
    caret: 'true',
    permissions: ['OPERATION.INVOICE', 'OPERATION.SALE'],
    submenu: [
      {
        url: 'invoice',
        title: 'Facturas',
        permissions: ['OPERATION.INVOICE'],
      },
      {
        url: 'sale',
        title: 'Ventas',
        permissions: ['OPERATION.SALE'],
      },
    ]
  },
  {
    icon: 'fas fa-user-shield',
    title: 'Operaciones',
    url: '',
    caret: 'true',
    permissions: ['DATA.CAFETERIA', 'DATA.REGISTER', 'DATA.VENDORS', 'DATA.PRODUCT'],
    submenu: [
      {
        url: 'cafeteria',
        title: 'Cafeterias',
        permissions: ['DATA.CAFETERIA'],
      },
      {
        url: 'register',
        title: 'Cajas',
        permissions: ['DATA.REGISTER'],
      },
      {
        url: 'vendor',
        title: 'Proveedores',
        permissions: ['DATA.VENDORS'],
      },
      {
        url: 'customer',
        title: 'Clientes',
        permissions: [],
      },
      {
        url: 'product',
        title: 'Productos',
        permissions: ['DATA.PRODUCT'],
      },
    ]
  },
  {
    icon: 'fas fa-database',
    title: 'Data',
    url: '',
    caret: 'true',
    permissions: [
      'DATA.STATES',
      'DATA.COUNTRIES',
      'DATA.CITIES',
      'DATA.TRUCKS',
      'DATA.TRAILERS',
      'DATA.VENDORS',
      'DATA.TERMS',
      "DATA.DEFAULT_USER_TASK"
    ],
    submenu: [
      {
        url: 'type',
        title: 'Types',
        permissions: [],
      },
      {
        url: 'type-group',
        title: 'Type Groups',
        permissions: [],
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
