<template>
    <transition v-if="isShow">
        <div class="notifications">
            <div :class='["alert",type]'>{{ content }}</div>
        </div>
    </transition>
</template>
<script type="text/javascript">
export default {
	'name':'Notify',
	'data':function(){
		return {
			'isShow':true,
			'setTimeOutName':undefined
		};
	},
	'props':{
		'content':{
			'type':String,
			'default':'提示信息'
		},
		'type':{
			'type':String,
			'default':'success'
		},
		'speed':{
			'type':Number,
			'default':1000
		},
		'callBack':{
			'type':Function,
			'default':function(){}
		}
	},
	'created':function(){
		this.type = 'alert-'+this.type;
	},
	'mounted':function(){
		this.handleStart();
	},
	'methods':{
		'handleStart':function(){
			if (this.setTimeOutName && this.setTimeOutName!==undefined) {
				clearTimeout(this.setTimeOutName);
			}
			this.setTimeOutName = setTimeout(function(){
				this.callBack();
				this.isShow = false;
				clearTimeout(this.setTimeOutName);
			}.bind(this),this.speed);
		}
	},
    'befroeDestroy':function(){
		if (this.setTimeOutName && this.setTimeOutName!==undefined) {
			clearTimeout(this.setTimeOutName);
		}
    }
};
</script>
<style type="text/css">
.notifications {
    position: fixed;
    z-index: 10000;
    left: 50%;
    margin-left: -225px;
    -webkit-animation: notifyContentMoveOut 0.3s forwards;
    -moz-animation: notifyContentMoveOut 0.3s forwards;
    animation: notifyContentMoveOut 0.3s forwards
}

.notifications>div {
    width: 400px;
    position: relative;
    text-align: center;
    z-index: 10001;
    margin: 5px 0px;
}
.notifications .alert {
    padding: 10px 35px 10px 15px;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    text-shadow: none
}

.notifications .alert-success {
    background: #45b182;
    border: 1px solid #3aa074
}

.notifications .alert-error {
    background: #ff4343;
    border: 1px solid #e23333
}

@-webkit-keyframes notifyContentMoveOut {
    0% {
        top:0;
    }

    to {
        top:35px;
    }
}

@-moz-keyframes notifyContentMoveOut {
    0% {
        top:0;
    }

    to {
        top:35px;
    }
}

@keyframes notifyContentMoveOut {
    0% {
        top:0;
    }

    to {
        top:35px;
    }
}
</style>