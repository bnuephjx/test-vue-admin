<template>
    <div class="select-dropdown">
        <div class="select-dropdown-input-group" @click.stop="handlOpen">
            <div class="select-dropdown-input">{{defaultText}}</div>
            <div class="select-dropdown-icon-group">
                <div class="select-dropdown-icon-border">
                    <i class="select-dropdown-icon"></i>
                </div>
            </div>
        </div>
        <div class="select-dropdown-menu" v-show="selectVisible" v-clickoutside="handleAutoClose">
            <div :ref="selectSearchBoxRefName" v-show="isScrollShow" class="select-search-box">
                <input type="text" placeholder="搜索" class="txt" v-model="searchText">
            </div>
            <div :ref="selectDropDownMenuWrapRefName" class="select-dropdown-menu-inner" :style="boxStyle" @wheel="handleWheel">
                <ul :ref="refName" class="select-dropdown-menu-list">
                    <li v-for="(item,index) in data" v-show="item.visible"class="list-option" :data-value="item[value]" @click.stop="handlSelected(item)">{{item[label]}}</li>
                </ul>
            </div>
            <div :ref="scrollWrapRefName" v-show="isScrollShow" :style="boxStyle" :class="['select-dropdown-menu-scroll',
          isHover?'select-dropdown-menu-scroll-hover':'',
          isTouch?'select-dropdown-menu-scroll-touch':''
        ]" @mouseover="addHover" @mouseout="removeHover" @mousedown='addTouch' @mouseup="removeTouch">
                <div class="select-dropdown-menu-scroll-inner"></div>
                <div :ref="scrollSliderRefName" class="select-dropdown-menu-scroll-slider" @mouseover="addHover" @mouseout="removeHover" @mousedown='handleDrag' @mouseup="removeTouch"></div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import './index.less';
import Clickoutside from '@/directives/clickoutside';

export default {
    'name': 'select-dropdown',
    'props': {
        'placeholder': {
            'type': String,
            'default': '请选择'
        },
        'change': {
            'type': Function
        },
        'data': { //数据
            'required': true
        },
        'label': { //数据value
            'required': true,
            'type': String
        },
        'value': { //数据key
            'required': true,
            'type': String
        }
    },
    data() {
        return {
            'refName': '', //ref的名称
            'scrollSliderRefName': '', //scrollSlider的ref
            'selectSearchBoxRefName': '', //selectSearchBox的ref
            'selectDropDownMenuWrapRefName': '', //selectDropDownMenuWrap的ref
            'scrollWrapRefName': '', //scrollWrap的ref
            'defaultText': this.placeholder, //默认提示文本
            'defaultNum': 5, //默认显示5个的高度
            'itemH': 30, //每个选项的高度
            'selectVisible': false, //是否可见
            'isHover': false, //是否hover
            'isTouch': false, //是否touch
            'distance': 0, //移动距离
            'searchText': '', //搜索文本
        };
    },
    'directives': { Clickoutside },
    'computed': {
        boxStyle() {
            var _height = this.defaultNum * this.itemH + 'px';
            var _marginTop = this.data.length > this.defaultNum ? '28px' : 0;
            var _style = {
                'height': _height,
                'marginTop': _marginTop
            };

            return _style;
        },
        isScrollShow() {
            return this.data.length > this.defaultNum ? true : false;
        }
    },
    mounted() {
        this.refName = 'selectDropDownMenuList' + this._uid;
        this.scrollSliderRefName = 'scrollSlider' + this._uid;
        this.selectSearchBoxRefName = 'selectSearchBox' + this._uid;
        this.selectDropDownMenuWrapRefName = 'selectDropDownMenuWrap' + this._uid;
        this.scrollWrapRefName = 'scrollWrap' + this._uid;
    },
    'watch': {
        // 由于数据一开始没有visible这个数据，因此在异步接受数据后根据data变化去初始化这个属性
        // 如果数据一开始就有这个数据就不用这样处理
        data(){
          this.data.forEach( (item, index)=> {
            item['visible']=true;
          });
          if (this.data.length < this.defaultNum) {
              this.defaultNum = this.data.length;
          }
        },
        'searchText': function(txt) {
            if (txt === '') {
                this.data.forEach(function(item) {
                    item['visible'] = true;
                });
                this.defaultNum = 5;
            } else {
                var _num = 0;

                this.data.forEach(function(item) {
                    if (item[this.label].indexOf(txt) === -1) {
                        item['visible'] = false;
                    } else {
                        item['visible'] = true;
                        _num++;
                    }
                }.bind(this));

                if (_num > 0) {
                    this.$refs[this.refName].style.marginTop = 0;
                    this.$refs[this.scrollSliderRefName].style.top = 0;
                }

                this.defaultNum = _num;
            }
        }
    },
    'methods': {
        handlOpen() {
            this.selectVisible = true;
            this.isHover = false;
            this.isTouch = false;
            this.searchText = '';
            if (this.data.length < this.defaultNum) {
                this.defaultNum = this.data.length;
            }
            this.$refs[this.scrollSliderRefName].style.top = 0;
            this.$refs[this.refName].style.marginTop = 0;
        },
        handleAutoClose() {
            if (this.selectVisible) {
                this.selectVisible = false;
            }
        },
        handlSelected(item) {
            this.defaultText = item[this.label];
            this.selectVisible = false;
            this.$emit('change', item);
        },
        addHover() {
            this.isHover = true;
        },
        removeHover() {
            this.isHover = false;
        },
        addTouch() {
            this.isTouch = true;
        },
        removeTouch() {
            this.isTouch = false;
        },
        handleDrag(event) {
            this.addTouch();
            var target = event.target;
            var disY = event.clientY - target.offsetTop;
            var that = this;

            document.onmousemove = function(ev) {
                ev = ev || event;
                var T = ev.clientY - disY;

                that.scroll(T, target);
            };

            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
            };
        },
        handleWheel(event) {
            var delta = 0;

            if (!event) { /* For IE. */
                event = window.event;
            }

            event.preventDefault();

            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
            } else if (event.detail) { /* Mozilla. */
                delta = -event.detail / 3;
            } else if (event.deltaY) { /* Mozilla. */
                delta = -event.deltaY / 3;
            }
            // var dir = delta > 0 ? 'Up' : 'Down';
            // 因为这里有一个搜索框，所以要加上这个搜索框的高度
            var _searchBox = this.isScrollShow ? this.$refs[this.selectSearchBoxRefName].offsetHeight : 0;

            this.distance = this.$refs[this.scrollSliderRefName].offsetTop - this.$refs[this.selectDropDownMenuWrapRefName].offsetTop + _searchBox;

            if (delta > 0) {
                this.distance -= 10;
            } else {
                this.distance += 10;
            }

            this.scroll(this.distance);
        },
        scroll(distance) {
            var barHeight = this.$refs[this.scrollWrapRefName].offsetHeight;

            if (distance < 0) {
                distance = 0;
            } else if (distance > barHeight - this.$refs[this.scrollSliderRefName].offsetHeight) {
                distance = barHeight - this.$refs[this.scrollSliderRefName].offsetHeight;
            }

            this.$refs[this.scrollSliderRefName].style.top = distance + 'px';

            var boxHeight = this.$refs[this.selectDropDownMenuWrapRefName].offsetHeight;
            var contentHeight = this.$refs[this.refName].offsetHeight;

            // 滚动距离 = 滑块移动距离 ÷ 窗口高度(除去滚动条高度) x 页面长度(内容长度-窗口长度)

            var roat = distance / (barHeight - this.$refs[this.scrollSliderRefName].offsetHeight);
            var scrollDistance = parseInt(roat * (contentHeight - boxHeight));

            this.$refs[this.refName].style.marginTop = -scrollDistance + 'px';
        }
    }
};
</script>