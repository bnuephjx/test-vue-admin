<template>
  <li v-show="model.visible" :class="['tree-parent','tree-parent-'+index]" :style="hasChildNodes ? '':{'marginLeft':'20px'}">
    <span v-if="hasChildNodes" :class="['tree-icon-caret',isUnfold ? 'tree-icon-caret-down':'tree-icon-caret-right']" @click="toggle"></span>
    <label v-if="isCheckbox" :class="['zent-checkbox-wrap',checkedClass]">
      <span class="zent-checkbox">
          <span class="zent-checkbox-inner"></span>
      <input type="checkbox" v-model="itemChecked">
      </span>
    </label>
    <div class='node-content' @click.stop="handleClick">
      <node-content :model="model" :options='defaultOptions'></node-content>
    </div>
    <ul v-show="isUnfold" v-if="hasChildNodes" :class="['tree-parent-children','tree-parent-'+index+'-children']">
      <TreeItem v-for='(item,index) in model[defaultOptions.children]' :layout='layout' :onlyKey='onlyKey' :index='index' :key='index' :model='item' :options='defaultOptions' :renderContent="renderContent" @dispathParent="changeState"></TreeItem>
    </ul>
  </li>
</template>
<script type="text/javascript">
export default {
  'name': 'TreeItem',
  'props': {
    'layout': Object,
    'model': {
      'required': true,
      'type': Object,
      'default': {}
    },
    'index': {
      'type': Number
    },
    'renderContent': Function,
    'onlyKey': {
      'type': String,
      'required': true
    },
    'options': {
      'required': true,
      'type': Object
    }
  },
  'data': function() {
    return {
      'defaultOptions': {}
    };
  },
  'components': {
    'node-content': {
      'props': {
        'model': Object,
        'options': Object
      },
      'render': function(h) {
        const that = this;
        const node = that.$parent;
        const parent = node.$parent;
        const model = node.model;

        return (
          parent.renderContent ?
          parent.renderContent.call(parent._renderProxy, h, { '_self': parent.$vnode.context, node, model }) :
          <
          span class = "tree-label" > { this.model[this.options.label] } < /span>
        );
      }
    }
  },
  'created': function() {
    //初始化的时候设置每项的状态
    this.$set(this.model, 'checkState', 'unchecked');
    this.$set(this.model, 'visible', true);
    this.defaultOptions = Object.assign({}, this.defaultOptions, this.options);
  },
  'computed': {
    label() {
      return this.defaultOptions.label;
    },
    children() {
      return this.model[this.defaultOptions.children];
    },
    isUnfold() {
      return this.defaultOptions.isUnfold;
    },
    isCheckbox() {
      return this.defaultOptions.isCheckbox;
    },
    hasChildNodes() {
      return this.model[this.defaultOptions.children] && this.model[this.defaultOptions.children].length > 0;
    },
    'checkedClass': function() {
      if (this.model.checkState === 'unchecked') {
        return '';
      } else if (this.model.checkState === 'half-checked') {
        return 'zent-checkbox-indeterminate';
      } else if (this.model.checkState === 'checked') {
        return 'zent-checkbox-checked';
      }
    },
    'itemChecked': {
      'get': function() {
        if (this.model.checkState === 'unchecked' ||
          this.model.checkState === 'half-checked') {
          return false;
        } else {
          return true;
        }
      },
      'set': function(value) {
        this.model.checkState = value ? 'checked' : 'unchecked';
        if (this.hasChildNodes) {
          this.$emit('dispathParent', this.model[this.onlyKey], value);
          this.handleSetChecked(this.model, value);
        } else {
          //向上遍历
          this.$emit('dispathParent', this.model[this.onlyKey], value);
        }
      }
    }
  },
  'methods': {
    handleClick() {
      this.layout.$emit('node-click', this.model);
    },
    toggle() {
      if (this.hasChildNodes) {
        this.defaultOptions.isUnfold = !this.defaultOptions.isUnfold;
      }
    },
    'changeState': function(key, value) {
      this.setCheckedClass(key, value);
      //递归调用，找到根节点为止
      this.$emit('dispathParent', this.model[this.onlyKey], value);
    },
    'setCheckedClass': function(key, value) {
      var isWith = false,
        i = 0,
        _len = this.children.length;

      if (value) {
        this.children.forEach(function(item) {
          if (item[this.onlyKey] === key) {
            isWith = true;
          }
          if (item.checkState === 'checked') {
            i++;
          }
        }.bind(this));
        if (isWith && i === _len) {
          this.model.checkState = 'checked';
        } else if (isWith && i !== _len) {
          this.model.checkState = 'half-checked';
        } else {
          this.model.checkState = 'checked';
        }
      } else {
        this.children.forEach(function(item) {
          if (item.checkState === 'checked' || item.checkState === 'half-checked') {
            isWith = true;
          }
          if (item.checkState === 'unchecked') {
            i++;
          }
        });
        if (!isWith && i === _len) {
          this.model.checkState = 'unchecked';
        } else if (isWith && i !== _len) {
          this.model.checkState = 'half-checked';
        } else {
          this.model.checkState = 'checked';
        }
      }
    },
    'handleSetChecked': function(treeModel, value) {
      if (treeModel[this.defaultOptions.children] && treeModel[this.defaultOptions.children].length > 0) {
        treeModel[this.defaultOptions.children].forEach(function(item) {
          item['checkState'] = value ? 'checked' : 'unchecked';
          this.handleSetChecked(item, value);
        }.bind(this));
      }
    }
  }
};

</script>
