import Mock from 'mockjs';

var Random = Mock.Random;

var list = Mock.mock({
    'list': [{
        treeId: 1,
        label: () => '一级 1'+ Random.ctitle(2),
        'shopId': 1,
        'children|2': [{
            'treeId': 2,
            'shopId|+1': 2,
            label: () => '二级 1-1'+ Random.ctitle(2),
            'children|2': [{
                treeId: 3,
                'shopId|+1': 2000,
                label: () => '三级 1-1-1'+ Random.ctitle(2)
            }]
        }]
    }]
});

export default list;
