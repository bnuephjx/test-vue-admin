<template>
  <aside id="app-sidebar">
    <div id="app-first-sidebar">
      <div>
        <a href="javascript:;" class="team-logo-wrap">
          <div class="team-logo" :style="'background-image: url('+$store.getters.userInfo.avatar+')'"></div>
        </a>
        <nav>
          <ul class="clearfix">
            <template v-for="(item,index) in treeList">
              <router-link :to="{'name':item.name}" tag="li">
                <a><i class="sidebar-icon sidebar-icon-dashboard"></i>{{item.meta.cn}}</a>
              </router-link>
            </template>
          </ul>
        </nav>
      </div>
    </div>
    <div id="app-second-sidebar">
      <div>
        <div class="second-sidebar-title">{{secondTitle}}管理</div>
        <nav>
          <ul>
            <template v-for="(item,index) in secondSidebar">
              <router-link :to="{'name':item.name}" tag="li">
                <a>{{item.meta.cn}}</a>
              </router-link>
            </template>
          </ul>
        </nav>
      </div>
    </div>
    <div id="app-user-info">
      <span class="user-name">{{$store.getters.userInfo.name}}</span>
      <span class="user-arrow"></span>
      <div class="user-dropdown">
        <div class="user-dropdown-meta">
          <div>{{$store.getters.userInfo.account}}</div>
        </div>
        <div class="user-dropdown-select">
          <a href="javascript:;" @click="handleLogout">退出</a>
        </div>
      </div>
    </div>
  </aside>
</template>
<script type='text/javascript'>
import '@/api/login.js';
import _ from 'lodash';
export default {
  'name': 'sidebar',
  data() {
    return {
      'treeList': [],
      'secondSidebar': [],
      'secondTitle': ''
    };
  },
  'watch': {
    $route() {
      this.secondSidebar = this.getSecondSidebar();
      this.handleBodyClassName();
    }
  },
  created() {
    let routesArry =  this.$store.getters.addRoutes;
    let layout = _.find(routesArry, { 'name': 'layout' });
    let sideList = layout.children;

    this.concatSideTree(sideList);

    this.secondSidebar = this.getSecondSidebar();

    this.handleBodyClassName();
  },
  'methods': {
    handleBodyClassName() {
      if (this.secondSidebar && this.secondSidebar.length>0) {
        document.getElementsByTagName('body')[0].className = 'theme theme--blue theme-new-ui show-help';
      } else {
        document.getElementsByTagName('body')[0].className = 'theme theme--blue theme-new-ui show-help without-second-sidebar';
      }
    },
    handleLogout() {
      this.$http.get('/logout')
        .then(() => {
          this.$store.dispatch('StoreUser/removeUser').then(() => {
            this.$router.push('/login');
          });
        });
    },
    /**
     * [concatSideTree 组合菜单]
     * @param  {[type]} arry [description]
     * @return {[type]}      [description]
     */
    concatSideTree(arry) {
      let that = this;

      _.forEach(arry, function(item) {
        that.treeList.push(item);
      });
    },
    /**
     * [getSecondSidebar 二级菜单]
     * @return {[type]} [description]
     */
    getSecondSidebar() {
      let that = this,
        ary = [];

      _.forEach(this.treeList, function(item) {
        if (item.children && item.children.length > 0) {
          let subList = item.children;

          _.forEach(subList, function(subItem) {
            if (subItem.name === that.$route.name) {
              that.secondTitle = item.meta.cn;
              ary = subList;
            }
          });
        }
      });
      return ary;
    }
  }
};

</script>
<style lang="less">
#app-sidebar {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  width: 200px;
  -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  z-index: 99
}

#app-first-sidebar {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  width: 90px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #444;

  .team-logo-wrap {
    display: block;
    width: 90px;
    height: 63px;
    overflow: hidden
  }

  .team-logo {
    margin: 14px auto 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #fff;
    background-size: cover;
    background-position: 50% 50%;
    background-color: #fff
  }

  nav {
    padding: 0 0 60px 0;
    width: 90px;

    li {
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      margin-bottom: 14px;
      cursor: pointer;
      &:hover {
        background: #666;

        a {
          color: #fff
        }

        .sidebar-icon-dashboard {
          background-position: -54px 0px
        }

        .sidebar-icon-shop {
          background-position: -54px -18px
        }

        .sidebar-icon-goods {
          background-position: -54px -36px
        }

        .sidebar-icon-order {
          background-position: -54px -54px
        }

        .sidebar-icon-fans {
          background-position: -54px -72px
        }

        .sidebar-icon-stat {
          background-position: -54px -90px
        }

        .sidebar-icon-asset {
          background-position: -54px -108px
        }

        .sidebar-icon-app {
          background-position: -54px -126px
        }

        .sidebar-icon-setting {
          background-position: -54px -144px
        }

        .sidebar-icon-youzan {
          background-position: -54px -162px
        }
      }

      &.router-link-active {
        background: #F8F8F8;

        a {
          color: #333
        }

        .sidebar-icon-dashboard {
          background-position: -18px 0px
        }

        .sidebar-icon-shop {
          background-position: -18px -18px
        }

        .sidebar-icon-goods {
          background-position: -18px -36px
        }

        .sidebar-icon-order {
          background-position: -18px -54px
        }

        .sidebar-icon-fans {
          background-position: -18px -72px
        }

        .sidebar-icon-stat {
          background-position: -18px -90px
        }

        .sidebar-icon-asset {
          background-position: -18px -108px
        }

        .sidebar-icon-app {
          background-position: -18px -126px
        }

        .sidebar-icon-setting {
          background-position: -18px -144px
        }

        .sidebar-icon-youzan {
          background-position: -18px -162px
        }
      }

      .sidebar-icon {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        background: url("../../assets/image/sidebar/sidebar-icon-20160530.png") no-repeat
      }

      .sidebar-icon-dashboard {
        background-position: 0px 0px
      }

      .sidebar-icon-shop {
        background-position: 0px -18px
      }

      .sidebar-icon-goods {
        background-position: 0px -36px
      }

      .sidebar-icon-order {
        background-position: 0px -54px
      }

      .sidebar-icon-fans {
        background-position: 0px -72px
      }

      .sidebar-icon-stat {
        background-position: 0px -90px
      }

      .sidebar-icon-asset {
        background-position: 0px -108px
      }

      .sidebar-icon-app {
        background-position: 0px -126px
      }

      .sidebar-icon-setting {
        background-position: 0px -144px
      }

      .sidebar-icon-youzan {
        background-position: 0px -162px
      }

      .c-no-auth {

        .sidebar-icon-dashboard {
          background-position: -36px 0px
        }

        .sidebar-icon-shop {
          background-position: -36px -18px
        }

        .sidebar-icon-goods {
          background-position: -36px -36px
        }

        .sidebar-icon-order {
          background-position: -36px -54px
        }

        .sidebar-icon-fans {
          background-position: -36px -72px
        }

        .sidebar-icon-stat {
          background-position: -36px -90px
        }

        .sidebar-icon-asset {
          background-position: -36px -108px
        }

        .sidebar-icon-app {
          background-position: -36px -126px
        }

        .sidebar-icon-setting {
          background-position: -36px -144px
        }

        .sidebar-icon-youzan {
          background-position: -36px -162px
        }
      }

      a {
        color: #CACACA;
        display: block;
        padding-left: 18px
      }
    }
  }
}

#app-user-info {
  position: fixed;
  bottom: 0px;
  color: #e5e5e5;
  height: 50px;
  padding: 10px 0;
  word-break: break-word;
  background: #535353;
  z-index: 100;

  &:hover .user-dropdown,
  &.hover .user-dropdown {
    display: block
  }

  span {
    &.user-name {
      width: 90px;
      display: block;
      line-height: 30px;
      padding: 0 12px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden
    }
  }

  .user-dropdown {
    background: #fff;
    display: none;
    position: absolute;
    bottom: 45px;
    left: 10px;
    color: #333;
    width: 145px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);

    &::after {
      content: ' ';
      width: 0;
      height: 0;
      position: absolute;
      left: 28px;
      border: 6px solid #fff;
      border-color: #fff transparent transparent transparent
    }
  }

  .user-dropdown-meta {
    padding: 10px 20px;
    line-height: 24px;
    background: #f8f8f8;
    border-radius: 2px 0 0 2px;

    div {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden
    }
  }

  .user-dropdown-select {
    padding: 10px 0;
    line-height: 30px;

    a {
      display: block;
      color: #666;
      padding: 0 20px;
      line-height: 30px;

      &.new-select {
        color: #FF4444
      }

      &:hover {
        background: #3283FA;
        color: #fff
      }
    }
  }
}

#app-second-sidebar {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 90px;
  width: 110px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;

  .second-sidebar-title {
    padding-left: 20px;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f2f2
  }

  .second-sidebar-subtitle {
    padding: 20px 10px 0;
    margin: -5px 10px 0;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #999;
    border-top: 1px solid #eee
  }

  .second-sidebar-title+.second-sidebar-subtitle {
    border-top: none;
    margin-top: 0
  }

  nav {
    padding: 13px 10px;
    width: 110px;

    h4 {
      display: none
    }

    li {
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      margin-bottom: 14px;
      overflow: hidden;
      cursor: pointer;
      border-radius: 2px;

      &:hover {
        a {
          color: #3283FA
        }
      }

      &.router-link-active {
        background: #f8f8f8;

        a {
          color: #333
        }
      }

      a {
        color: #666;
        display: block;
        padding: 0 10px
      }

      a[href=''] {
        color: #ddd;
        pointer-events: none;
        cursor: default
      }

      .short-margin {
        margin-bottom: 7px
      }

      .split {
        height: 0px;
        margin-bottom: 7px;
        border-top: 1px solid #e5e5e5
      }

      .changed a {
        padding-right: 0
      }
    }
  }
}

</style>
