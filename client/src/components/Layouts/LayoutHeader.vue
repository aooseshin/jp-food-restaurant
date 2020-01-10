<template>
  <el-header class="header">
    <el-menu
      :default-active="navIndex"
      :router="true"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">日式餐廳</el-menu-item>
      <div class="menu-button" style="float: right">
        <el-button type="danger" @click="$router.push('/tw/')">中文</el-button>
        <el-button type="danger" @click="$router.push('/en/')">英文</el-button>
      </div>
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