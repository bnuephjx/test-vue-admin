<template>
  <div class="home">
    <h2>本项目运用了以下技术栈：</h2>
    <ol>
      <li>vue</li>
      <li>vue-router--路由</li>
      <li>vuex--状态管理</li>
      <li>mock.js--模拟数据</li>
      <li>axios--网络请求库</li>
      <li>js-cookie--Cookie处理</li>
      <li>lodash--函数库</li>
    </ol>
    <h2 style="margin-top:20px;">本项目实现功能：</h2>
    <ol>
      <li>登录</li>
      <li>登录拦截</li>
      <li>权限控制</li>
      <li>自定义组件</li>
    </ol>
    <h2 style="margin-top:20px;">自定义组件有以下：</h2>
    <ol>
      <li>Notify消息通知</li>
      <li>Popover气泡弹窗</li>
      <li>Tree组件</li>
      <li>Select组件</li>
      <li>DatePikcker日历组件</li>
    </ol>
  </div>
</template>
<script type="text/javascript">
export default {
  'name': 'home'
};

</script>
<style lang="less">
.home {
  ol {
    padding-left: 20px;
    li {
      list-style: inherit;
      padding: 3px;
    }
  }
}

</style>
