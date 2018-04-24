<template>
  <div class="calendarBox">
    <input type="text" @focus="handleFocus" :value="dateValue" v-clickoutside="handleAutoClose">
    <div class="calendar" v-show="pickerVisible">
      <div class="calendar-header">
        <i class="calendar-icon calendar-icon-l-s" @click.stop="prevYear"></i>
        <i v-show="tabType!='year'" class="calendar-icon calendar-icon-l" @click.stop="prevMonth"></i>
        <div class="calendar-set-ym">
          <span v-show="tabType!='month'" @click.stop="renderYearList">{{yearInterval}}</span>
          <span v-show="tabType!='year'" @click.stop="renderMonthList">{{currentMonth}}</span>
        </div>
        <i v-show="tabType!='year'" class="calendar-icon calendar-icon-r" @click.stop="nextMonth"></i>
        <i class="calendar-icon calendar-icon-r-s" @click.stop="nextYear"></i>
      </div>
      <div class="calendar-content">
        <template v-if="tabType==='year'">
          <year-view :defaultDate="defaultDate" :layout="layout"></year-view>
        </template>
        <template v-else-if="tabType==='date'">
          <date-view :defaultDate="defaultDate" :layout="layout"></date-view>
        </template>
        <template v-else-if="tabType==='month'">
          <month-view :defaultDate="defaultDate" :layout="layout"></month-view>
        </template>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Clickoutside from '@/directives/clickoutside';
import DateView from './picker/date-picker.vue';
import YearView from './picker/year-picker.vue';
import MonthView from './picker/month-picker.vue';

export default {
  'name': 'datePicker',
  'components': {
    'date-view': DateView,
    'year-view': YearView,
    'month-view': MonthView
  },
  'directives': { Clickoutside },
  data() {
    return {
      'dateValue': '',
      'layout': this,
      'pickerVisible': false,
      'defaultDate': '',
      'renderView': DateView
    };
  },
  'props': {
    'date': {
      default () {
        return new Date();
      }
    },
    'change': {
      'type': Function
    },
    'format': {
      'type': String,
      'default': 'yyyy-mm-dd'
    }
  },
  'created': function() {
    this.defaultDate = this.date;
  },
  'computed': {
    'tabType': function() {
      if (this.renderView === YearView) {
        return 'year';
      } else if (this.renderView === MonthView) {
        return 'month';
      } else {
        return 'date';
      }
    },
    'yearInterval': function() {
      var year = this.defaultDate.getFullYear();

      if (this.renderView === YearView) {
        return parseInt((year - 7)) + '年-' + parseInt((year + 7)) + '年';
      } else {
        return year + '年';
      }
    },
    'currentMonth': function() {
      var dt = this.defaultDate;
      var month = dt.getMonth() + 1;

      if (this.renderView !== YearView) {
        return month + '月';
      }
    }
  },
  'methods': {
    'handleFocus': function() {
      this.defaultDate = this.dateValue ? new Date(this.dateValue) : this.date;
      var dt = this.defaultDate;
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();

      this.render(year, month, day);
      this.pickerVisible = true;
    },
    'handleClose': function(dt) {
      this.dateValue = dt;
      this.pickerVisible = false;
      this.$emit('change', this.dateValue);
    },
    'handleAutoClose': function() {
      if (this.pickerVisible) {
        this.pickerVisible = false;
      }
    },
    'renderYearList': function() {
      this.renderView = YearView;
    },
    'renderMonthList': function() {
      this.renderView = MonthView;
    },
    'render': function(year, month, day) {
      this.defaultDate = new Date(year + '/' + month + '/' + day);
      this.renderView = DateView;
    },
    'prevYear': function() {
      var dt = this.defaultDate;
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();

      if (this.tabType === 'year') {
        this.defaultDate = new Date((year - 15) + '/' + month + '/' + day);
      } else {
        this.render((year - 1), month, day);
      }
    },
    'nextYear': function() {
      var dt = this.defaultDate;
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();

      if (this.tabType === 'year') {
        this.defaultDate = new Date((year + 15) + '/' + month + '/' + day);
      } else {
        this.render((year + 1), month, day);
      }
    },
    'prevMonth': function() {
      var dt = this.defaultDate;
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();

      if (month === 1) {
        month = 12;
        year = year - 1;
      } else {
        month = month - 1;
      }
      this.render(year, month, day);
    },
    'nextMonth': function() {
      var dt = this.defaultDate;
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();

      if (month === 12) {
        month = 1;
        year = year + 1;
      } else {
        month = month + 1;
      }
      this.render(year, month, day);
    }
  }
};

</script>
<style type="text/css" src="./index.css"></style>
