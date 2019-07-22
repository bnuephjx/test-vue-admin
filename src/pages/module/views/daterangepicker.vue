<template>
  <div>
    <blockquote class="explain-txt">选择时间段</blockquote>
    <module-dateRangePicker @change="handleSelectDate"></module-dateRangePicker>
  </div>
</template>
<script type="text/javascript">
import DateRangePicker from '@/components/datePicker/dateRangePicker';
export default {
  'name': 'moduleDateRangePicker',
  'components': {
    'module-dateRangePicker': DateRangePicker
  },
  'methods':{
  	handleSelectDate(value){
        alert(value);
    }
  }
};

</script>
