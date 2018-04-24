const LoginView = resolve => require(['@/pages/login/login.vue'],resolve);

const router = {
 'path':'/login',
 'name':'login',
 'component':LoginView
};

export default router;