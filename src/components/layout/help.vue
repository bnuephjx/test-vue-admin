<template>
  <div id="app-help-container-react">
    <div class="zent-portal">
      <div id="app-help-container" style="min-height: 716px;">
        <div class="help-container-head">
          <i class="app-help-icon app-help-icon-help"></i>
          <span>本项目提示</span>
          <i class="app-help-icon app-help-icon-close" @click.stop="handleHideHelp"></i>
        </div>
        <div class="help-container-body">
          <div class="help-body-content">
            <p>
              <span class="tips">这是一个练手项目，如有不足欢迎提出，谢谢！</span>
              <br>
              <span class="tips">本项目已开源，如果喜欢，麻烦给个星，谢谢！：</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  'name': 'help'
};

</script>
<style type="text/css">
#app-help-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  min-height: 1400px;
  background: #fff;
  z-index: 99;
  border-left: 1px solid #e5e5e5;
}

#app-help-container .help-container-head {
  line-height: 50px;
  height: 50px;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5
}

#app-help-container .help-container-body {
  padding: 10px 10px 60px
}

#app-help-container .help-body-content {
  padding: 10px;
  margin-bottom: -20px
}

#app-help-container .help-body-content p {
  margin-bottom: .5em;
  line-height: 1.8em
}

#app-help-container .help-body-content span {
  white-space: normal !important
}

#app-help-container .help-body-content span.tips{
  color: #808080;
}

#app-help-container .help-body-content ul li{
  margin: 5px auto;
}
</style>
