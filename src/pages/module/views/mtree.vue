<template>
  <div>
    <blockquote class="explain-txt">用清晰的层级结构展示信息</blockquote>
    <div style="position:relative;height:28px;margin-bottom:5px;">
      <input type="text" placeholder="搜索" v-model="filterText">
    </div>
    <module-tree ref="tree"
      :data="treeData"
      :options="treeOptions"
      onlyKey='shopId'
      :renderContent='renderContent'
      @node-click="handleNodeClick"></module-tree>
    <a  href="javascript:void(0);" class="btn btn-success" @click="getInfo">获取选中项</a>
    <h3 class="explain-h3">Tree Attributes</h3>
    <table class="explain-table">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>data</td>
          <td>展示数据</td>
          <td>Array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>options</td>
          <td>配置项，详细见下面的表</td>
          <td>Object</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>onlyKey</td>
          <td>每个树节点用来作为唯一标识的属性（必填）</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>renderContent</td>
          <td>树节点的内容区的渲染 Function</td>
          <td>Function(h,{node,model})</td>
          <td>—</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
    <h3 class="explain-h3">Options</h3>
    <table class="explain-table">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>label</td>
          <td>选项的文本</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>children</td>
          <td>子节点</td>
          <td>Array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>isCheckbox</td>
          <td>是否有选中框</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
        <tr>
          <td>isUnfold</td>
          <td>是否展开</td>
          <td>Boolean</td>
          <td>—</td>
          <td>true</td>
        </tr>
      </tbody>
    </table>
    <h3 class="explain-h3">方法</h3>
    <table class="explain-table">
      <thead>
        <tr>
          <th>方法名称</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>filter</td>
          <td>对树节点进行筛选操作</td>
          <td>接收一个任意类型的参数</td>
        </tr>
        <tr>
          <td>getCheckedNodes</td>
          <td>若节点可被选择，则返回目前被选中的节点所组成的数组</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
    <h3 class="explain-h3">Tree Events</h3>
    <table class="explain-table">
      <thead>
        <tr>
          <th>事件名称</th>
          <th>说明</th>
          <th>回调参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>node-click</td>
          <td>节点被点击时的回调</td>
          <td>点击节点的信息</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
import '@/api/tree';

import Tree from '@/components/tree/Tree';
export default {
  'name': 'moduleTree',
  'components': {
    'module-tree': Tree
  },
  data() {
    return {
      'treeData': [],
      'filterText':'',
      'treeOptions': {
        'label':'label',
        'children':'children',
        'isUnfold':false
      }
    };
  },
  mounted(){
  	this.$http.get('/tree').then((treeResp)=>{
  		this.treeData = treeResp.data;
  	});
  },
  'watch':{
      'filterText':function(txt){
          this.$refs.tree.filter(txt);
      }
  },
  'methods':{
  	handleNodeClick(model){
      console.log(model);
  	},
    getInfo(){
      console.log(this.$refs.tree.getCheckedNodes());
    },
    'renderContent':function(h,{node,model}) {
        return (
          <div class="tree-label" style="display:inline-block;">
            <span>{model.label}</span>
            <span>
              <a href='javascript:void(0)' style="font-size: 12px;" type="text" onClick={ () => this.remove(node, model) }>Delete</a>
            </span>
          </div>);
    },
    remove(){
      console.log('删除;');
    }
  }
};

</script>
