<template>
  <div id="app-container" class="clearfix">
    <div class="app">
      <div id="app-third-sidebar">
        <div class="zent-breadcrumb"><span>{{$route.meta.cn}}</span></div>
      </div>
      <div id="app-help-button"><i class="app-help-icon app-help-icon-help"></i>帮助和服务</div>
      <div class="app-inner clearfix">
        <div class="app-init-container">
          <div class="app__content page-showcase-dashboard">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  'name': 'layout',
  data() {
    return {};
  }
};

</script>
<style type="text/css">
#app-container {
  background: #f2f2f2;
  width: auto;
  margin: 0 0 0 200px;
  margin-right: 200px;
  padding-bottom: 50px;
  -webkit-transition: margin-right 0.5s;
  transition: margin-right 0.5s;
}

.app {
  width: 100%;
  float: left;
}

#app-third-sidebar {
  position: relative;
  height: 50px;
  min-width: 750px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 100px 0 5px;

  &.with-box-shadow {
    -webkit-box-shadow: 0px 9px 10px -13px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 9px 10px -13px rgba(0, 0, 0, 0.6)
  }

  .ui-nav {
    border-bottom: none;
    margin-bottom: 0;

    ul {
      margin-bottom: 0
    }

    li {
      margin-left: 0;
      &:hover span {
        color: #3283FA
      }
      &.active span {
        color: #333;
        border-bottom: 2px solid #0099FC
      }

      a {
        padding: 0;
        height: 50px;
        padding: 0 20px;
        min-width: 0;
        border: none;
        background: transparent;
        font-size: 14px;
        color: #666666
      }

      span {
        display: inline-block
      }
    }

    a {
      line-height: 48px
    }
  }
}

#app-third-sidebar .zent-breadcrumb {
  padding: 17px 21px
}

body.show-help #app-third-sidebar {
  padding-right: 210px;
}

.zent-breadcrumb {
  color: #333;
  font-size: 0;
  line-height: 0;
  padding: 15px 0
}

.zent-breadcrumb a,
.zent-breadcrumb span {
  font-size: 14px;
  line-height: 1em;
  display: inline-block;
  vertical-align: middle;
  text-decoration: none
}

.zent-breadcrumb a:after,
.zent-breadcrumb span:after {
  content: "/";
  display: inline-block;
  vertical-align: middle;
  color: #ccc;
  margin-left: 5px;
  margin-right: 5px
}

.zent-breadcrumb a:last-child:after,
.zent-breadcrumb span:last-child:after {
  content: "";
  display: none
}

.zent-breadcrumb span {
  color: #333
}

.zent-breadcrumb a {
  color: #0099fc
}

.zent-breadcrumb.zent-breadcrumb-nav {
  padding: 0
}

.zent-breadcrumb.zent-breadcrumb-nav a {
  display: inline-block;
  height: 50px;
  line-height: 48px;
  padding: 0 20px;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box
}

.zent-breadcrumb.zent-breadcrumb-nav a:after {
  display: none
}

.zent-breadcrumb.zent-breadcrumb-nav .zent-breadcrumb-nav-active:after {
  display: block;
  color: #333;
  border-bottom: 2px solid #0099fc;
  content: "";
  margin: 0
}

#app-help-button {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 50px;
  padding: 0 20px;
  border-left: 1px solid #e5e5e5;
  cursor: pointer;
}

#app-container .app-inner {
  margin: 10px;
  padding: 15px;
  min-width: 750px;
  min-height: 500px;
  -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2)
}

.app-inner {
  min-height: 800px;
  margin: 0 0 0 150px;
  padding-bottom: 60px;
  background-color: #fff;
}

</style>
