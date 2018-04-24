import LoginRouter from '@/pages/login/router.js';
import HomeRouter from '@/pages/home/router.js';
import RoleRouter from '@/pages/role/router.js';
import ModuleRouter from '@/pages/module/router.js';

const Comtainer = resolve => require(['@/components/layout/layout'],resolve);
const SideBar = resolve => require(['@/components/layout/sidebar'],resolve);
const Help = resolve => require(['@/components/layout/help'],resolve);
const Footer = resolve => require(['@/components/layout/footer'],resolve);

/**
 * 公共路由
 * @type {Array}
 */
export function commonRoutes() {
    return LoginRouter;
}

/**
 * 以下是权限路由
 */

let layoutObj = {
    'path': '/',
    'name': 'layout',
    'components': { //component就是一个模板，当然也可以把这些合并在一起
      'default'  : Comtainer,
      'sidebar'  : SideBar,
      'help'     : Help,
      'appFooter': Footer
    },
    'redirect': '/index',
    'children': [
        HomeRouter,
        ModuleRouter
    ]
};

/**
 * [AdminRouter 超级管理员]
 * @type {Array}
 */
export function adminRoutes() {
    layoutObj.children = layoutObj.children.concat([
      RoleRouter
    ]);
    return [commonRoutes(),layoutObj];
}

/**
 * [NormalRouer 普通用户]
 * @type {Array}
 */
export function normalRoues() {
    return [commonRoutes(),layoutObj];
}
