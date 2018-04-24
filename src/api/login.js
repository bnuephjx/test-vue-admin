import Mock from 'mockjs';
import _ from 'lodash';

import usersData from '@/mock/users.js';

Mock.mock('/login', 'post',function(options){
 var _obj = JSON.parse(options.body);

 var _userData = _.filter(usersData,{
  'account':_obj.account
 });

 if (_userData && _userData.length>0) {
	_userData[0]['isLogin'] = true;
 } else {
 	_userData = [{'isLogin':false}];
 }

 return _userData[0];
});

Mock.mock('/logout','get',function(){
 return {
  'isLogin':false
 };
});