<template>
  <div class="treeMenu">
    <ul class="tree">
      <tree-item v-if='hasChildNodes' v-for='(item,index) in data' :layout='layout' :index='index' :key='index' :model='item' :renderContent="renderContent" :options='defaultOptions' :onlyKey='onlyKey'></tree-item>
    </ul>
  </div>
</template>
<script type="text/javascript">
import './index.less';
import TreeItem from '@/components/tree/TreeItem';

export default {
  'components': {
    'tree-item': TreeItem
  },
  'props': {
    'data': {
      'required': true,
      'type': Array,
      default () {
        return [];
      }
    },
    'options': {
      'required': true,
      'type': Object
    },
    'onlyKey': {
      'type': String,
      'required': true
    },
    'renderContent': Function
  },
  data() {
    return {
      'layout': this,
      'defaultOptions': {
        'label': 'label',
        'children': 'children',
        'isUnfold': true,
        'isCheckbox': true
      },
      'checkedArry': []
    };
  },
  'computed': {
    hasChildNodes() {
      return this.data && this.data.length > 0;
    }
  },
  created() {
    this.defaultOptions = Object.assign({}, this.defaultOptions, this.options);
  },
  'methods': {
    /**
     * [getCheckedNodes 获取选中项]
     * @return {[type]} [description]
     */
    'getCheckedNodes': function() {
      this.checkedArry.splice(0, this.checkedArry.length);
      return this._getCheckedNodes(this.data);
    },
    /**
     * [_getCheckedNodes 递归查找勾选项]
     * @param  {[type]} treeModel [description]
     * @return {[type]}           [description]
     */
    '_getCheckedNodes':function(treeModel){
        var children = treeModel[this.defaultOptions.children] || treeModel;

        if (treeModel.checkState!=='unchecked') {
            if (children && children.length>0) {
                children.forEach( function(item) {
                    if (item.checkState==='checked') {
                        this.checkedArry.push(item);
                    }
                    this._getCheckedNodes(item);
                }.bind(this));
            }
        }
        return this.checkedArry;
    },
    'filter':function(value){
        var _childNode;

        if (this.$children && this.$children.length>0){
            this.$children.forEach(function (item) {
                if (item.$children && item.$children.length>0){
                    _childNode = item;
                }
            });
        }
        this.openUnfold(_childNode);
        this._filter(this.data,value);
    },
    '_filter':function(treeModel,value){
        var childNodes = treeModel[this.defaultOptions.children] || treeModel;

        if (this.isArray(childNodes)) {
            // 先遍历所有的节点
            childNodes.forEach(function (child) {
                child.visible = child[this.defaultOptions.label].toLowerCase().indexOf(String(value).toLowerCase()) > -1 ? true : false;
                this._filter(child,value);
            }.bind(this));
        }
        if (!this.isArray(treeModel)) {
            // 然后在根据当前节点的子级是否显示，给当前节点设置
            if (!treeModel.visible && childNodes.length) {
                let allHidden = true;

                childNodes.forEach((child) => {
                    if (child.visible) {
                        allHidden = false;
                    }
                });
                treeModel.visible = allHidden === false ? true : false;
            }
        }
        if (!value) {
            return false;
        }
    },
    'isArray':function(arr){
        return Object.prototype.toString.call(arr)==='[object Array]';
    },
    'openUnfold':function(childNode){
        var _childNodeList = childNode.$children;

        if (_childNodeList && _childNodeList.length>0) {
            childNode.options['isUnfold']= true;
            _childNodeList.forEach(function(item){
                this.openUnfold(item);
            }.bind(this));
        }
    }
  }
};

</script>
