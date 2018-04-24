# 树组件

参数如下:
 * @param  {[String]} onlyKey [每个节点的唯一key],必填
 *
 * @param  {[Array]} treeModel [数据],必填
 *
 * @param  {[Function]} renderContent(LiNode,treeModel) [可替换的模板],选填
 *  LiNode: 表示当前行的节点
 *  treeModel: 表示当前行的数据
 *
 * @param  {[Object]} options [配置项],选填
 *  options{
        label:'label',          //节点文本
        children:'children',    //子节点数据
        isCheckbox:true,        //是否开启复选框
        isUnfold:false,         //是否展开节点树
    }
 *
 * @param  {[Object]} ref [指定当前树的ref]，只有指定了才能可以获取以下方法
 *  getCheckedNodes() => 获取整棵树所有选中的节点
 *	fitler(value) => 搜索
 *
 * @param  {[Event]} node-click [当前节点事件]
 *