<template>
  <div id="app" class="clearfix">
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
    <router-view name="help"></router-view>
    <router-view name="appFooter"></router-view>
  </div>
</template>
<style lang='css' rel="stylesheet/css" src="@/assets/style/pc.css"></style>
