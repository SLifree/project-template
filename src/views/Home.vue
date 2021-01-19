<template>
  <el-container>
    <el-header :height="full ? '0px' : '60px'">
      <header-top @drawer="pullDrawer" v-show="!full"></header-top>
    </el-header>
    <!-- 模块详情 -->
    <el-container class="main-container">
      <el-aside :width="fold || full ? '0px' : '230px'">
        <aside-left></aside-left>
      </el-aside>
      <el-main :class="{ full: full }">
        <tab-panel></tab-panel>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderTop from "../components/home/HeaderTop";
import AsideLeft from "../components/home/AsideLeft";
import TabPanel from "../components/home/TabPanel";

export default {
  name: "home",
  components: {
    HeaderTop,
    AsideLeft,
    TabPanel,
  },
  data() {
    return {
      fold: false, //左侧折叠
      full: false, //全屏
    };
  },
  mounted() {
    let that = this;
    document.onkeyup = function (e) {
      if (e.keyCode !== 27) return;
      e.preventDefault();
      that.full = false;
    };
  },
  methods: {
    pullDrawer(type) {
      this[type] = !this[type];
      if (type === "full") this.openNotification();
    },
    openNotification() {
      this.$notify({
        title: "",
        message: "Esc键 关闭全屏模式",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: calc(100% - 60px);

  .full {
    padding: 0;
  }
}
</style>