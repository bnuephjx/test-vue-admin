<template>
    <ul class="calendar-content-list calendar-content-month-list">
        <li calendar-month-list="1"
        	v-for="(month,index) in renderMonth"
        	:class="currentMonth==(index+1)?'active':''"
        	@click.stop='handleSelectMonth((index+1))'>{{month}}月</li>
    </ul>
</template>
<script type="text/javascript">
export default{
	'name':'month-picker',
	data(){
		return {
			'renderMonth':['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
		};
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
	'computed':{
		'currentMonth':function(){
			var dt = this.defaultDate;

			return dt.getMonth()+1;
		}
	},
	'methods':{
		'handleSelectMonth':function(month){
			var year = this.defaultDate.getFullYear();
			var day = this.defaultDate.getDate();

			this.layout.render(year,month,day);
		}
	}
};
</script>