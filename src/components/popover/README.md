# 提示弹窗组件

*  	使用方法：
*	this.$Notify(options);
*
*	配置参数如下：
*	@param  {[String]} type [类型],有"error","success"这两个类型
*
*	@param  {[String]} content [内容],自定义提示内容

/**
 * [提示弹窗]
 * 使用方法：
 * import ConfirmPopover from '@/components/popover/Confirm.js'
 *
 * @click.stop="handleFunction($event,其它参数)";
 *
 * handleFunction: function(event,其它参数) {
        new ConfirmPopover({
            arrow: 'left-center',
            target: $(event.target),
            callBack:function(){}
        });
    }
 *
 */