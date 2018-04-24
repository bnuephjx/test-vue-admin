import Vue from 'vue';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let seed = 0;
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleAutoClose">
 * ```
 */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;

    el[ctx] = {
      id,
      'methodName': binding.expression,
      'bindingFn': function(e){
        if (!el.contains(e.target)) {
          binding.value();
        }
      }
    };
    document.addEventListener('click', el[ctx].bindingFn);
  },


  // update(el, binding, vnode) {
  //   el[ctx].methodName = binding.expression;
  //   el[ctx].bindingFn = function(e){
  //     if (!el.contains(e.target)) {
  //       binding.value();
  //     }
  //   };
  //   document.addEventListener('click', el[ctx].bindingFn);
  // },

  unbind(el) {
    let len = nodeList.length;

    document.removeEventListener('click', el[ctx].bindingFn);
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};