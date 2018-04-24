import Vue from 'vue';
//引入状态管理
import Vuex from 'vuex';

import StoreUser from '@/store/user/user.js';
import StoreAddRoutes from '@/store/router/index.js';

import getters from './getter.js';

//调用
Vue.use(Vuex);


var store = new Vuex.Store({
 'modules':{
   StoreUser,
   StoreAddRoutes
 },
 getters
});

export default store;