import Vue from 'vue';
import App from './App';

import '@/assets/common/validate.js';

import router from './router/index.js';

import store from './store/index.js';

import Notify from '@/components/notify/notify.js';
Vue.prototype.$Notify = Notify;

// 引入请求框架
import axios from 'axios';
Vue.prototype.$http = axios;

let app = new Vue({
  'el': '#app',
  router,
  store,
  render: h => h(App)
});

Vue.use(app);