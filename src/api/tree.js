import Mock from 'mockjs';
import TreeData from '@/mock/tree.js';

//获取
Mock.mock('/tree', 'get',function(){
    var _list = TreeData.list;

    return _list;
});