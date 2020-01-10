<template>
  <div id="app">
    <vue-headful
      :title="title"
      :description="description"
    />
    <el-container direction="vertical">    
      <layout-header></layout-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <layout-footer></layout-footer>
    </el-container>
  </div>
</template>

<script>
import vueHeadful from 'vue-headful';
import LayoutHeader from './components/Layouts/LayoutHeader.vue';
import LayoutFooter from './components/Layouts/LayoutFooter.vue';

export default {
  name: 'app',
  data() {
    return {
      title: '',
      description: '',
    }
  },
  created() {
    this.title = this.$route.meta.title ? `${this.$route.meta.title} | 系統` : '系統';
    this.description = this.$route.meta.description ? this.$route.meta.description : '';
  },
  watch:{
    $route (to){
      this.title = to.meta.title ? `${to.meta.title} | 系統` : '系統';
      this.description = to.meta.description ? to.meta.description : '';
    }
  },
  components: {
    vueHeadful,
    LayoutHeader,
    LayoutFooter
  }
}
</script>
