<template>
    <ul class="calendar-content-list calendar-content-year-list">
    	<li v-for="(year,index) in renderYearList"
    		:calendar-year-list="year"
    		:class="currentYear==year?'active':''"
    		@click.stop='handleSelectYear(year)'>{{year}}年</li>
    </ul>
</template>
<script type="text/javascript">
export default{
	'name':'year-picker',
	data(){
		return {
			// 'renderYearList':[]
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
		'currentYear':function(){
			return this.defaultDate.getFullYear();
		},
		'renderYearList':function(){
			var year = this.defaultDate.getFullYear();
			var count = year - 7;
			var arry = [];

			for(var i=0;i<15;i++){
				arry.push(count);
				count++;
			}
			return arry;
		}
	},
	'mounted':function(){
		var year = this.defaultDate.getFullYear();
		var count = year - 7;

		for(var i=0;i<15;i++){
			this.renderYearList.push(count);
			count++;
		}
	},
	'methods':{
		'handleSelectYear':function(year){
			var month = this.defaultDate.getMonth()+1;
			var day = this.defaultDate.getDate();

			this.layout.render(year,month,day);
		}
	}
};
</script>