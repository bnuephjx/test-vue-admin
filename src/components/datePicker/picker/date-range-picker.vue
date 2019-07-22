<template>
	<table>
        <thead>
            <th>日</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th>六</th>
        </thead>
        <tbody>
        	<tr v-for="(days,x) in renderDays" :key="x">
        		<template v-for="(today,y) in days">
        			<template v-if="today.isDisable">
        				<td class="disable">{{today.date | getDate}}</td>
        			</template>
        			<template v-else>
            			<td :class="today.isCurrentDay ? 'active':''"
            				@click="handleSelectDate(today)">{{today.date | getDate}}</td>
        			</template>
        		</template>
        	</tr>
        </tbody>
    </table>
</template>
<script type="text/javascript">
import _utils from '../util/index.js';
var MILLISECOND_PER_DAY = 24 * 60 * 60 * 1000;

export default {
	'name':'date-picker',
	data(){
		return {};
	},
	'props':{
		'layout':{
			'type':Object,
			'default':function(){
				return {};
			}
		},
		'defaultDate':{
			'default':new Date()
		}
	},
	'filters':{
		'getDate':function(today){
			var _today = new Date(today);

			return _today.getDate();
		}
	},
	'computed':{
		'renderDays':function(){
			//当前日期
			var today = this.defaultDate ? new Date(this.defaultDate):new Date();
			//当前年
			var year = today.getFullYear();
			//当前月
			var month = today.getMonth()+1;
			//当前日
			var day = today.getDate();

			var formatToday = _utils.formatDate(year,month,day,this.layout.format);

			//当前月总天数
			var countDay = this.getThisMonthDay(year,month);
			//当月第一天
			var firstDay = new Date(year, month - 1, 1);
			//当月最后一天
			var lastDay = new Date(year, month - 1, countDay);
			//当前月1号是星期几
			var firstWeek = this.getThisWeekDay(year, month,1);

			var allDays = [];

			var dateInfo = {
				'isDisable':false,
				'date':'',
				'isCurrentDay':false
			};

			var beforeDay = firstWeek%7===0 ? 7:firstWeek;

			// 上一个月
			for (var x=0;x<beforeDay;x++) {
				var beforeToday = this.numDayAgo(firstDay,beforeDay-x);

				var formatBeforeToday = this.dateFormat(beforeToday);

				dateInfo = {
					'isDisable':true,
					'date':formatBeforeToday
				};

				allDays.push(dateInfo);
			}

			// 当月的天数
			for (var y=1;y<=countDay;y++) {

				var _today = _utils.formatDate(year,month,y,this.layout.format);

				dateInfo = {
					'isDisable':false,
					'date':_today
				};

				var startDate = this.returnDate(this.layout.rangeValue[0]);
				var endDate = this.returnDate(this.layout.rangeValue[1]);
				console.log(`${startDate} - ${endDate}`)

                if(_today === startDate || _today === endDate){
                    dateInfo.isCurrentDay = true
                }

				if(this.layout.rangeValue.length===2 && _today<endDate && _today>startDate){
					dateInfo.isCurrentDay = true
				}
				// if (formatToday === _today) {
				// 	dateInfo.isCurrentDay = true;
				// }

				allDays.push(dateInfo);
			}

			var nextCountDay = 42-beforeDay-countDay;

			//下一个月
			for (var z=1;z<=nextCountDay;z++) {
				var afterToday = this.numDayAfter(lastDay,z);

				var formatAfterToday = this.dateFormat(afterToday);

				dateInfo = {
					'isDisable':true,
					'date':formatAfterToday
				};

				allDays.push(dateInfo);
			}

			//生成二维数组

			var sss = [];
			var item = [];

			for (var i=1;i<=42;i++) {
				item.push(allDays[i-1]);
				if (i%7===0) {
					sss.push(item);
					item = [];
				}
			}

			return sss;
		}
	},
	'methods': {
		'returnDate':function(date) {
			//当前日期
			var today = new Date(date);
			//当前年
			var year = today.getFullYear();
			//当前月
			var month = today.getMonth()+1;
			//当前日
			var day = today.getDate();

			var formatToday = _utils.formatDate(year,month,day,this.layout.format);
			return formatToday;
		},
		//计算某天是星期几,可以从而推导出某月1号是星期几=>getThisWeekDay(2017,11,1)
		//getDay() ：返回Date对象的一周中的星期值；0为星期天，1为星期一、2为星期二，依此类推
		'getThisWeekDay':function(year, month, day){
			var thisDate = new Date(year, month - 1, day);

			return thisDate.getDay();
		},
		'getThisMonthDay':function(year, month){
			var lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			var thisDayCount = lastDays[month - 1]; //获取当前月份的天数

			var isFebruary = month === 2;

			if (isFebruary && _utils.isLeapYear(year)) {
				//若当前月份为2月，并且是闰年，天数加1
				thisDayCount++;
			}

			return thisDayCount;
		},
		//上一月的总天数
		'preMonthDay':function(year,month){
			if (month === 1){
				return this.getThisMonthDay(year,12);
			} else {
				return this.getThisMonthDay(year,month - 1);
			}
		},
		//几天之前
		'numDayAgo':function(dt,day){
			var time = dt.getTime();
			var dayTime = day * MILLISECOND_PER_DAY;
			var dayAgoTime = time - dayTime;
			var dayAgoDate = new Date(dayAgoTime);

			return dayAgoDate;
		},
		//几天之后
		'numDayAfter':function(dt,day){
			var time = dt.getTime();
			var dayTime = day * MILLISECOND_PER_DAY;
			var dayAfterTime= time + dayTime;
			var dayAfterDate = new Date(dayAfterTime);

			return dayAfterDate;
		},
		'dateFormat':function(dt){
			var year = dt.getFullYear();
			var month = dt.getMonth()+1;
			var day = dt.getDate();

			return _utils.formatDate(year,month,day,this.layout.format);
		},
		'handleSelectDate':function(today){
            var length = this.layout.rangeValue.length;
            if(length===0){
                this.layout.rangeValue.push(today.date)
            } else if(length===1){
                var startDate = this.layout.rangeValue[0];
                var currentDate = new Date(today.date);
                if(currentDate<new Date(startDate)){
                    this.layout.rangeValue.unshift(today.date)
                }else{
                    this.layout.rangeValue.push(today.date)
                }
            } else {
                var startDate = this.layout.rangeValue[0];
                var endDate = this.layout.rangeValue[1];
                var currentDate = new Date(today.date);

                if(currentDate<new Date(startDate)){
                    this.layout.rangeValue.splice(0,1,today.date)
                }else if(currentDate>new Date(startDate) && currentDate<new Date(endDate)){
                    var diffL = currentDate - new Date(startDate);
                    var diffR = new Date(endDate) - currentDate;
                    if(diffR > diffL){
                        this.layout.rangeValue.splice(0,1,today.date)
                    } else {
                        this.layout.rangeValue.splice(1,1,today.date);
                    }
                }else if(currentDate>new Date(endDate)){
                    this.layout.rangeValue.splice(1,1,today.date)
                }
            }



            // this.layout.rangeValue.push(today.date);
            // if(this.layout.rangeValue.length===0){
            //     this.layout.rangeValue.push(today.date);
            // }else{
            //     var startDate = this.layout.rangeValue[0];
            //     if(new Date(startDate)<new Date(today.date)){
            //         this.layout.rangeValue.push(today.date)
            //     }else{
            //         this.layout.rangeValue.splice(0,1,today.date);
            //         this.layout.rangeValue.push(startDate);
            //     }
            // }
			console.log(this.layout.rangeValue)
			// if(this.layout.rangeValue.length===2){
			// 	this.layout.handleClose(today.date);
			// }
		}
	}
};
</script>