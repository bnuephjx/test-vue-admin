<template>
  <div>
    <blockquote class="explain-txt">常用于展示鼠标点击（click）时的提示信息。通常是提示用户是否进行操作。</blockquote>
    <blockquote class="explain-txt">在这里提供12种不同方向的展示方式</blockquote>
    <div class="popover-showBox">
      <div class="top">
        <module-popover ref='topLeft' arrow="top-left"></module-popover>
        <button class='btn' v-popover:topLeft>上左</button>
        <module-popover ref='topCenter' arrow="top-center"></module-popover>
        <button class='btn' v-popover:topCenter>上中</button>
        <module-popover ref='topRight' arrow="top-right"></module-popover>
        <button class='btn' v-popover:topRight>上右</button>
      </div>
      <div class="left pull-left">
        <div>
          <module-popover ref='leftTop' arrow="left-top"></module-popover>
          <button class='btn' v-popover:leftTop>左上</button>
        </div>
        <div>
          <module-popover ref='leftCenter' arrow="left-center"></module-popover>
          <button class='btn' v-popover:leftCenter>左中</button>
        </div>
        <div>
          <module-popover ref='leftBottom' arrow="left-bottom"></module-popover>
          <button class='btn' v-popover:leftBottom>左下</button>
        </div>
      </div>
      <div class="right pull-right">
        <div>
          <module-popover ref='rightTop' arrow="right-top"></module-popover>
          <button class='btn' v-popover:rightTop>右上</button>
        </div>
        <div>
          <module-popover ref='rightCenter' arrow="right-center"></module-popover>
          <button class='btn' v-popover:rightCenter>右中</button>
        </div>
        <div>
          <module-popover ref='rightBottom' arrow="right-bottom"></module-popover>
          <button class='btn' v-popover:rightBottom>右下</button>
        </div>
      </div>
      <div class="bottom">
        <module-popover ref='bottomLeft' arrow="bottom-left"></module-popover>
        <button class='btn' v-popover:bottomLeft>下左</button>
        <module-popover ref='bottomCenter' arrow="bottom-center"></module-popover>
        <button class='btn' v-popover:bottomCenter>下中</button>
        <module-popover ref='bottomRight' arrow="bottom-right"></module-popover>
        <button class='btn' v-popover:bottomRight>下右</button>
      </div>
    </div>
    <blockquote class="explain-txt">提供修改提示内容和确定回调函数的方法</blockquote>
    <module-popover ref='content' arrow="bottom-center" content="要删除么?"></module-popover>
    <button class='btn' v-popover:content>提示内容</button>
    <module-popover ref='slot' arrow="bottom-center">
      <div>slot</div>
    </module-popover>
    <button class='btn' v-popover:slot>slot</button>
    <module-popover ref='callback' arrow="bottom-center" @callback='handlePopover'></module-popover>
    <button class='btn' v-popover:callback>确定回调函数</button>
    <h3 class="explain-h3">Popover Attributes</h3>
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
          <td>arrow</td>
          <td>箭头方向</td>
          <td>String</td>
          <td>top-left,top-center,top-right,right-top,right-center,right-bottom,bottom-left,bottom-center,bottom-right,left-top,left-center,left-bottom</td>
          <td>left-center</td>
        </tr>
        <tr>
          <td>content</td>
          <td>显示的内容，也可以通过 slot 传入 DOM</td>
          <td>String</td>
          <td>—</td>
          <td>提示内容</td>
        </tr>
      </tbody>
    </table>
    <h3 class="explain-h3">Popover Events</h3>
    <table class="explain-table">
      <thead>
        <tr>
          <th>事件名称</th>
          <th>说明</th>
          <th>回调参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>callback</td>
          <td>点击确定时触发</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
import mpopover from '@/components/popover/popover.vue';
import popover from '@/directives/popover.js';

export default {
  'name': 'modulePopover',
  'components': {
    'module-popover': mpopover
  },
  'directives': { popover },
  data() {
    return {};
  },
  'methods': {
    handlePopover() {
      alert('回调函数');
    }
  }
};

</script>
<style lang='less'>
.popover-showBox {
  width: 300px;
  margin: 10px  0;
  .top,
  .bottom{
    text-align: center;
  }
  .left,
  .right{
    margin:10px auto;
    &> div{
      margin: 5px auto;
    }
  }
  .bottom{
    clear: both;
  }
}

</style>
