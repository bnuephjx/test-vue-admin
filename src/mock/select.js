import Mock from 'mockjs';

var Random = Mock.Random;

export default Mock.mock({
    'list|25': [{
        'selectId|+1': 1,
        'selectTxt': () => Random.ctitle(5)
    }]
});
