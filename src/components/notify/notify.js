import Vue from 'vue';

import tml from './notify.vue';

var _Notify = Vue.extend(tml);
var instance = '';

var Notify = function(options){
	var options = options || {};

    //生成组件
    instance = new _Notify({
        'propsData': options
    });
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();

    //append到body
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
};

export default Notify;


