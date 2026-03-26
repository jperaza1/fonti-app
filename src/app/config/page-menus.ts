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
    permissions: [],
  },
  {
    icon: 'fa fa-money-bill-alt',
    title: 'Gastos',
    url: 'expense',
    permissions: [],
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
    title: 'Operaciones',
    url: '',
    caret: 'true',
    permissions: ['DATA.VENDORS', 'DATA.PRODUCT', 'DATA.ROUTE', 'DATA.CORRELATIVE', 'DATA.CATEGORY'],
    submenu: [
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
      {
        url: 'route',
        title: 'Rutas',
        permissions: ['DATA.ROUTE'],
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
