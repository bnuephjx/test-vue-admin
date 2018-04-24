import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

import Cookie from 'js-cookie';

import { commonRoutes } from '@/mock/router';

Vue.use(VueRouter);

var router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
        return { 'x': 0, 'y': 0 };
    }
  }
});

//根据是否有cookie来判断是否进行初始化
if (Cookie.getJSON('accountData') && Cookie.getJSON('accountData').isLogin) {
    console.log('有cookie');
    store.dispatch('StoreUser/setUser',Cookie.getJSON('accountData')).then(() => {
        var _roles = store.getters.userInfo.roles;

        // 根据roles权限生成可访问的路由表
        store.dispatch('StoreAddRoutes/getRoutes',_roles).then(() => {
            router.addRoutes(store.getters.addRoutes);// 动态添加可访问路由表
        });
    });
} else {
    router.addRoutes([commonRoutes()]);
}

router.beforeEach((to, from, next) => {
  if (Cookie.getJSON('accountData') && Cookie.getJSON('accountData').isLogin) { // 判断是否有token
    next();//当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
  } else if (to.path === '/login') {
    next();
  } else {
    next('/login'); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
  }
});

export default router;
