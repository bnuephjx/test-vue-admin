<template>
  <div :class="['ui-popover ui-popover--confirm',arrow]" v-if="isShow" :style="popoverStyle">
    <div class="ui-popover-inner clearfix">
      <div class="inner__header clearfix">
        <slot>
          <div class="pull-left text-center" style="width: 80px;line-height: 28px;font-size: 14px;">{{content}}</div>
        </slot>
        <div class="pull-right">
          <a href="javascript:;" class="btn btn-small" @click="doToggle">取消</a>
          <a href="javascript:;" class="btn btn-primary btn-small" @click='handleSubmit'>确定</a>
        </div>
      </div>
    </div>
    <div class="arrow"></div>
  </div>
</template>
<script type="text/javascript">
import './index.less';

export default {
  'name': 'popover',
  'props': {
    'arrow': { //箭头方向
      'type': String,
      'default': 'left-center'
    },
    'content': {
      'type': String,
      'default': '提示内容'
    },
    'callback':{
      'type':Function
    }
  },
  data() {
    return {
      'target': {},
      'popoverRef': '',
      'isShow': false,
      'popoverStyle': {}
    };
  },
  mounted() {
    this.target = this.$refs.reference;

    this.target.addEventListener('click', this.doToggle);
    document.addEventListener('click', this.handleDocumentClick);
  },
  'watch': {
    'isShow': function(val) {
      if (val) {
        this.$nextTick(() => {
          this.popoverStyle = {
            'left': this.getPosition().left + 'px',
            'top': this.getPosition().top + 'px'
          };
        });
      }
    }
  },
  'methods': {
    /**
     * [getTargetInfo 目标坐标以宽高信息]
     * @return {[type]} [description]
     */
    'getTargetInfo': function() {
      return {
        'left': this.target.offsetLeft,
        'top': this.target.offsetTop,
        'offsetHeight': this.target.offsetHeight,
        'offsetWidth': this.target.offsetWidth
      };
    },
    /**
     * [getPopoverInfo popover宽高信息]
     * @return {[type]} [description]
     */
    'getPopoverInfo': function() {
      return {
        'offsetHeight': this.$el.offsetHeight,
        'offsetWidth': this.$el.offsetWidth
      };
    },
    /**
     * [getPosition 设置popover的坐标]
     * @return {[type]} [description]
     */
    'getPosition': function() {
      // 目标坐标以宽高信息
      var $targetInfo = this.getTargetInfo();
      // popover宽高信息
      var $popoverInfo = this.getPopoverInfo();
      // 方向
      var _arrow = this.arrow.split('-');

      if (_arrow[0] === 'left') {
        $targetInfo.left -= $popoverInfo.offsetWidth;
      } else if (_arrow[0] === 'right') {
        $targetInfo.left += $targetInfo.offsetWidth;
      } else if (_arrow[0] === 'top') {
        $targetInfo.top += $targetInfo.offsetHeight;
      } else if (_arrow[0] === 'bottom') {
        $targetInfo.top -= $popoverInfo.offsetHeight;
      }

      if (_arrow[0] === 'left' || _arrow[0] === 'right') {
        if (_arrow[1] === 'center') {
          $targetInfo.top -= ($popoverInfo.offsetHeight - $targetInfo.offsetHeight) / 2;
        } else if (_arrow[1] === 'top') {
          $targetInfo.top = $targetInfo.top + $targetInfo.offsetHeight / 2 - $targetInfo.offsetHeight / 2;
        } else if (_arrow[1] === 'bottom') {
          $targetInfo.top = $targetInfo.top - $popoverInfo.offsetHeight / 2 + $targetInfo.offsetHeight / 2;
        }
      } else if (_arrow[0] === 'top' || _arrow[0] === 'bottom') {
        if (_arrow[1] === 'center') {
          $targetInfo.left = $targetInfo.left - ($popoverInfo.offsetWidth - $targetInfo.offsetWidth) / 2;
        } else if (_arrow[1] === 'right') {
          $targetInfo.left -= ($popoverInfo.offsetWidth - $targetInfo.offsetWidth);
        }
      }

      $targetInfo.left = Math.round($targetInfo.left);
      $targetInfo.top = Math.round($targetInfo.top);

      return $targetInfo;
    },
    doToggle() {
      this.isShow = !this.isShow;
    },
    handleSubmit(){
      this.isShow = !this.isShow;
      this.$emit('callback');
    },
    handleDocumentClick(event) {
      if (!this.$el ||
        !this.target ||
        this.$el.contains(event.target) ||
        this.target.contains(event.target)) {
        return;
      }
      this.isShow = false;
    }
  },
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick);
    this.target.removeEventListener('click', this.doToggle);
  }
};

</script>
