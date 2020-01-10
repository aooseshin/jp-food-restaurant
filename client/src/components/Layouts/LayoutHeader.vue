<template>
  <el-header class="header">
    <el-menu
      :default-active="navIndex"
      :router="true"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/page1">選單二</el-menu-item>
      <el-menu-item index="/page2">選單三</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    return {
      navIndex: '/',
    }
  },
  created() {
    this.navIndex = this.$route.path;
  },
}
</script>

<style lang="scss" scope>
  .el-header.header {
    padding: 0;
    overflow: auto;
  }
  .el-menu {
    min-width: 500px;
  }
  .menu-button {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
  }
</style>