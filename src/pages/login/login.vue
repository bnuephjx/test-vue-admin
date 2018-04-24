<template>
  <div class="login">
    <form class="form-horizontal">
      <div class="control-group-container">
        <div class="control-group">
          <label class="control-label">账号</label>
          <div class="controls">
            <input type="text" class="css-mobile" name="account" placeholder="账号" v-validate="'required'" v-model="account" autocomplete="off">
          </div>
        </div>
        <div v-show='errors.has("account")' class="err-msg">{{errors.first('account')}}</div>
      </div>
      <div class="control-group-container">
        <div class="control-group">
          <label class="control-label">登录密码</label>
          <div class="controls">
            <input type="password" placeholder="随便填" v-model="password" v-validate="'required|numeric'" name="password">
          </div>
        </div>
        <div v-show='errors.has("password")' class="err-msg">{{errors.first('password')}}</div>
      </div>
      <button class="login-btn" @click.prevent="loginSubmit" :disabled="delayLoading">
        {{ delayLoading ? '正在登录...':'登录'}}
      </button>
      <p style="font-size:14px;margin:10px auto;">管理员账号:{{accountArry[0].account}}</p>
      <p style="font-size:14px;margin:10px auto;">普通账号:{{accountArry[1].account}}</p>
    </form>
  </div>
</template>
<script type="text/javascript">
import userData from '@/mock/users.js';
import '@/api/login.js';

export default {
  'name': 'login',
  data() {
    return {
      'delayLoading': false,
      'accountArry': userData,
      'account': '',
      'password': ''
    };
  },
  'methods': {
    loginSubmit() {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.delayLoading = true;
            var _data = {
              'account': this.account,
              'password': this.password
            };

            this.$http.post('/login', _data)
              .then((response) => {
                if (response.data.isLogin) {
                    this.$store.dispatch('StoreUser/setUser', response.data).then(() => {
                    var _roles = this.$store.getters.userInfo.roles;

                    this.$store.dispatch('StoreAddRoutes/getRoutes',_roles).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // 动态添加可访问路由表
                        this.$router.addRoutes(this.$store.getters.addRoutes);

                        const isProduction = process.env.NODE_ENV === 'production';

                        isProduction ? window.location.replace('http://demo.bnuephjx.com/test-vue-admin.github.io'):window.location.replace('/');
                        // http://demo.bnuephjx.com/test-vue-admin.github.io
                    });
                  });
                } else {
                  this.$Notify({
                    'content':'登录失败',
                    'type':'error'
                  });
                  this.delayLoading = false;
                }
              });
          } else {
            return false;
          }
        });
    }
  }
};

</script>
<style lang="less">
.login {
  width: 320px;
  height: 220px;
  margin: 0 auto;
  margin-top: 110px;
  padding: 10px;
  -webkit-transform: translateY(50%);
  -moz-transform: translateY(50%);
  -ms-transform: translateY(50%);
  transform: translateY(50%);

  .form-horizontal {
    .control-group-container {
      height: 52px;
    }
    .control-group {
      border-bottom: 1px solid #333;
      margin-bottom: 1px;
    }
    .control-label {
      line-height: 18px;
      float: left;
      width: 100px;
      text-align: left;
      color: #333;
      font-size: 14px;
      font-weight: bold;
    }
    .controls {
      margin-left: 100px;
      word-break: break-all;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .control-group-container input,
    .control-group-container input:focus {
      outline: none;
      border: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      color: #38f;
      text-shadow: 0 0 0 #3333336b;
      -webkit-text-fill-color: transparent;
    }
    .control-group-container input {
      width: 100%;
      height: 20px;
      padding: 4px 6px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;
      background-color: #f2f2f2;
    }
    .controls .css-mobile {
      border-radius: 0 2px 2px 0;
    }
    .err-msg {
      font-size: 12px;
      color: #FF4444;
      margin-left: 100px;
      height: 20px;
    }
  }

  .login-btn {
    width: 100%;
    border: 1px solid #ddd;
    cursor: pointer;
    color: #fff;
    height: 45px;
    background-color: #3388FF;
    border-color: #2277FF;
    border-radius: 2px;
    font-size: 16px;
    margin-top: 15px;
  }
}

</style>
