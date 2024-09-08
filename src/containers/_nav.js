export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    className: "dashboard",
    icon: 'cil-speedometer'
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employee Management',
    route: '/employee-management',
    className: "employee-management",
    icon: 'cil-list',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Registration',
        to: '/employee-management/employee-register',
        icon: 'cil-user'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee List',
        to: '/employee-management/employee-list',
        icon: 'cil-people'
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin Register and List',
    to: '/admin-management/admin-reg-list',
    className: "admin",
    icon: 'cil-lock-locked',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/logout',
    className: "logout",
    icon: 'cil-trash'
  },
 
 
]

