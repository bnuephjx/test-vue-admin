<template>
  <div>
    <blockquote class="explain-txt">当选项过多时，使用下拉菜单展示并选择内容（暂时没提供选择多项的操作）</blockquote>
    <blockquote class="explain-txt">打开控制台可以看见选中项的对象</blockquote>
    <module-select placeholder="选择快递" @change="handleSelectChange" :data="selectData" value='selectId' label='selectTxt'></module-select>
    <h3 class="explain-h3">Select Attributes</h3>
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
          <td>placeholder</td>
          <td>占位符</td>
          <td>String</td>
          <td>—</td>
          <td>请选择</td>
        </tr>
        <tr>
          <td>data</td>
          <td>展示数据</td>
          <td>Array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>label</td>
          <td>选项的标签</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>value</td>
          <td>选项的值</td>
          <td>String</td>
          <td>—</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
    <h3 class="explain-h3">Select Events</h3>
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
          <td>选中值发生变化时触发</td>
          <td>目前的选中项的对象</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
import Select from '@/components/select/select';
import '@/api/select';

export default {
  'name': 'moduleSelect',
  'components': {
    'module-select': Select
  },
  data() {
    return {
      'selectData': []
    };
  },
  mounted() {
    this.$http.get('/select')
      .then((response) => {
        response.data.forEach((item) => {
          this.selectData.push(item)
        });
      });
  },
  'methods': {
    handleSelectChange(item) {
      console.log(item)
    }
  }
};

</script>
