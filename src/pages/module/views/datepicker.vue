<template>
  <div>
    <blockquote class="explain-txt">这个组件的样式模仿<a href="http://www.layui.com/laydate/">LayDate</a>，其功能只是模拟一部分。只是提供一些思路，写这个组件原因是，在群里看见很多人去网上找插件，但，都说不太符合自己的预想，所以干脆自己写一个，可以根据自己业务逻辑去修改</blockquote>
    <blockquote class="explain-txt">主要功能很简单：选择日期，年份切换，月份切换</blockquote>
    <module-datePicker @change="handleSelectDate"></module-datePicker>
    <h3 class="explain-h3">Date Attributes</h3>
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
          <td>date</td>
          <td>默认日期</td>
          <td>Date</td>
          <td>—</td>
          <td>new Date()</td>
        </tr>
        <tr>
          <td>format</td>
          <td>格式化日期</td>
          <td>String</td>
          <td>'yyyy-mm-dd','yyyy/mm/dd'</td>
          <td>'yyyy-mm-dd'</td>
        </tr>
      </tbody>
    </table>
    <h3 class="explain-h3">Date Events</h3>
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
          <td>change</td>
          <td>选中日期时触发的事件</td>
          <td>选中的 value 值</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
import DatePicker from '@/components/datePicker/datePicker';
export default {
  'name': 'moduleDatePicker',
  'components': {
    'module-datePicker': DatePicker
  },
  'methods':{
  	handleSelectDate(value){
        alert(value);
    }
  }
};

</script>
