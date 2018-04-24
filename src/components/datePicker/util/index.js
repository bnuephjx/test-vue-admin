var _utils = {
	//判断闰年
	//条件1：年份必须要能被4整除
	//条件2：年份不能是整百数
	//条件3：年份是400的倍数
	//当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
	//如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
	'isLeapYear':function(year){
		var a = year % 4 === 0 && year % 100 !== 0;
		var b = year % 400 === 0;

		if (a || b) {
			return true;
		} else {
			return false;
		}
	},
	//补零
	'addZero':function(num){
		var a = num >= 0 && num < 10;

		return a ? '0' + num : num;
	},
	//格式化时间
	'formatDate':function(year,month,day,format){
		if (/\b(m|M){2}\b/.test(format) && /\b(d|D){2}\b/.test(format)) {
			month = this.addZero(month);
			day = this.addZero(day);
		}

		var _date = '';
		var _arry = [];

		if (/^(y|Y){1,4}-(m|M){1,2}-(d|D){1,2}$/.test(format)) {
			_arry = [year,month,day];

			_date = _arry.join('-');
		} else if (/^(d|D){1,2}-(m|M){1,2}-(y|Y){1,4}$/.test(format)){
			_arry = [day,month,year];

			_date = _arry.join('-');
		} else if (/^(y|Y){1,4}\/(m|M){1,2}\/(d|D){1,2}$/.test(format)){
			_arry = [year,month,day];

			_date = _arry.join('/');
		} else if (/^(d|D){1,2}\/(m|M){1,2}\/(y|Y){1,4}$/.test(format)){
			_arry = [day,month,year];

			_date = _arry.join('/');
		} else {
			_date = '没有这样的格式';
		}

		return _date;
	},
	//复制对象方法
	'cloneObj':function(oldObj){
		if (typeof oldObj !== 'object') {
			return oldObj;
		}

		if (oldObj === null) {
			return oldObj;
		}
		var newObj = Object();

		for (var i in oldObj){
			newObj[i] = this.cloneObj(oldObj[i]);
		}
		return newObj;
	},
	//扩展对象
	'extendObj':function(){
		var args = arguments;//将传递过来的参数数组赋值给args变量

		if (args.length < 2) {
			return;
		}
		var temp = this.cloneObj(args[0]); //调用复制对象方法

		for (var n = 1; n < args.length; n++) {
			for (var i in args[n]) {
				temp[i] = args[n][i];
			}
		}
		return temp;
	}
};

export default _utils;