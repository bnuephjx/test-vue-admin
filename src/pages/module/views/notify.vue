<template>
  <div>
    <blockquote class="explain-txt">关于这个组件的写法网上一搜一大堆，这里的实现方法和使用方法是差不多的</blockquote>
    <blockquote class="explain-txt">Vue.prototype 添加了全局方法：Vue.prototype.$Notify = Notify；也可以局部使用，直接new</blockquote>
    <button class='btn' @click='handleNotify'>局部使用</button>
    <button class='btn' @click='handleGlobalNotify'>全局使用</button>
    <button class='btn btn-danger' @click='handleErrorlNotify'>错误提醒</button>
    <button class='btn btn-success' @click='handleSuccesslNotify'>成功提醒</button>
    <button class='btn' @click='handleSpeedlNotify'>延迟关闭</button>
    <button class='btn' @click='handleCallBacklNotify'>回调</button>
    <h3 class="explain-h3">Notify Attributes</h3>
    <table class="explain-table">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>content</td>
          <td>默认提示内容</td>
          <td>String</td>
          <td>—</td>
          <td>提示信息</td>
        </tr>
        <tr>
          <td>type</td>
          <td>提示类型</td>
          <td>String</td>
          <td>error,success</td>
          <td>success</td>
        </tr>
        <tr>
          <td>speed</td>
          <td>延迟关闭</td>
          <td>Number</td>
          <td>—</td>
          <td>1000</td>
        </tr>
        <tr>
          <td>callBack</td>
          <td>回调函数</td>
          <td>Funciton</td>
          <td>—</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import Notify from '@/components/notify/notify.js';

export default {
  'name': 'moduleNotify',
  'methods': {
    handleNotify() {
      new Notify({
        'content': '局部使用'
      });
    },
    handleGlobalNotify() {
      this.$Notify({
        'content': '全局使用'
      });
    },
    handleErrorlNotify() {
      this.$Notify({
        'content': '错误提醒',
        'type': 'error'
      });
    },
    handleSuccesslNotify() {
      this.$Notify({
        'content': '成功提醒',
        'type': 'success'
      });
    },
    handleSpeedlNotify() {
      this.$Notify({
        'type': 'success',
        'speed': 3000
      });
    },
    handleCallBacklNotify() {
      this.$Notify({
        'type': 'success',
        callBack() {
          alert('回调函数');
        }
      });
    }
  }
};

</script>
