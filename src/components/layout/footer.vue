<template>
  <div id="app-footer">
    <a href="javascript:;">备案号</a>
  </div>
</template>
<script type="text/javascript">
export default {
  'name': 'appFooter',
  data() {
    return {};
  }
};

</script>
<style type="text/css">
#app-footer {
  position: absolute;
  bottom: 0;
  left: 200px;
  right: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}

#app-footer a {
  display: block;
  margin: 0 auto;
}

body.without-second-sidebar #app-footer {
  left: 90px
}

body.hide-help #app-footer {
  right: 0
}

</style>
