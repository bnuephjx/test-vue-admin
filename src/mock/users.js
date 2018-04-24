import Mock from 'mockjs';
var Random = Mock.Random;

export default Mock.mock([{
 'name':'@cname()',
 'account': Random.email(), //名称
 'roles': ['admin'], //权限
 'avatar': Random.image('32x32', '#4A7BF7', '#FFFFFF', 'A') //头像
}, {
 'name':'@cname()',
 'account': Random.email(), //名称
 'roles': ['normal'], //权限
 'avatar': Random.image('32x32', '#4A7BF7', '#FFFFFF', 'N') //头像
}]);