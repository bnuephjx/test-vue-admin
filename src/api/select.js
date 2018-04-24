import Mock from 'mockjs';
import SelectData from '@/mock/select.js';

//获取
Mock.mock('/select', 'get',function(){
    var _list = SelectData.list;

    return _list;
});