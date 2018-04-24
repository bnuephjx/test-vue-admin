const RoleView = resolve => require(['@/pages/role/role.vue'],resolve);

const router = {
 'path':'/role',
 'name':'role',
 'meta':{
  'cn':'权限'
 },
 'component':RoleView
};

export default router;