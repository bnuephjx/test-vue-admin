import Vue from 'vue';
//引入表单验证插件
import VeeValidate, {Validator} from 'vee-validate';
//引入中文文件
import zh from 'vee-validate/dist/locale/zh_CN';
//设置中文
Validator.localize('zh_CN', zh);
// 自定义公共的validate
const dictionary = {
    'zh_CN': {
      'messages': {
        'email':function(){
            return '请输入正确的邮箱格式';
        },
        'numeric':function(){
           return '只能填写数字';
        },
        'required':function(){ //可以接受参数field
            return '必填项';
        }
      },
      'attributes':{//自定义属性。当传入进来的是email这个字段，就是替换成‘邮箱’
        'email':'邮箱',
        'mobile':'手机号'
      }
  }
};

// 配置信息
Validator.localize(dictionary);
// 或者下面这样
//Validator.localize('zh_CN',dictionary.zh_CN);

//扩展规则
Validator.extend('mobile', {
  'getMessage': ()=>{ //接受参数：field, params, data
    return '必须是11位手机号码';
  },
  'validate': value => { //验证规则
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
  }
});

// 验证插件配置
const config = {
    'errorBagName': 'errors',//错误检查函数名称
    'delay'       : 0,//延迟时间
    'locale'      : 'zh_CN',//语言设置
    'messages'    : null,//提示信息
    'strict'      : true//是否开启严格模式
};

//使用表单验证插件
Vue.use(VeeValidate,config);