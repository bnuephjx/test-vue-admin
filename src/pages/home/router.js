const HomeView = resolve => require(['@/pages/home/home.vue'],resolve);

const router = {
 'path':'/index',
 'name':'index',
 'meta':{
  'cn':'概况'
 },
 'component':HomeView
};

export default router;
