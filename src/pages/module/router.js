const pageView = resolve => require(['@/components/layout/page.vue'],resolve);

const notifyView = resolve => require(['@/pages/module/views/notify.vue'],resolve);
const datePickerView = resolve => require(['@/pages/module/views/datepicker.vue'],resolve);
const popoverView = resolve => require(['@/pages/module/views/mpopover.vue'],resolve);
const treeView = resolve => require(['@/pages/module/views/mtree.vue'],resolve);
const selectView = resolve => require(['@/pages/module/views/mselect.vue'],resolve);

const router = {
 'path':'/module',
 'name':'module',
 'redirect': '/module/notify',
 'meta':{
  'cn':'组件'
 },
 'component':pageView,
 'children':[{
    'path':'notify',
    'name':'notify',
    'meta':{
     'cn':'消息通知'
    },
    'component':notifyView
  },{
    'path':'datePicker',
    'name':'dataPicker',
    'meta':{
      'cn':'日历组件'
    },
  	'component':datePickerView
  },{
    'path':'select',
    'name':'select',
    'meta':{
      'cn':'下拉选择'
    },
    'component':selectView
  },{
    'path':'popover',
    'name':'popover',
    'meta':{
      'cn':'气泡弹窗'
    },
    'component':popoverView
  },{
    'path':'tree',
    'name':'tree',
    'meta':{
      'cn':'树形控件'
    },
    'component':treeView
  }]
};

export default router;