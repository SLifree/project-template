<template>
  <div :class="['tab-panel', { 'non-existent': tabPanel.length <= 0 }]">
    <el-tabs
      v-model="tabPanelActive"
      type="card"
      closable
      @tab-remove="handleTabsRemove"
    >
      <el-tab-pane
        :key="item.meta.id"
        v-for="item in tabPanel"
        :label="item.meta.title"
        :name="item.meta.id"
      >
        <!-- ************iframe 嵌套*********** -->
        <iframe
          :src="item.meta.route"
          width="100%"
          height="100%"
          frameborder="0"
          ref="iframe"
          v-if="!item.meta.isComponent"
        ></iframe>
        <!-- ************自定义组件*********** -->
      </el-tab-pane>
    </el-tabs>
    <el-button
      class="close-all"
      v-if="tabPanel.length > 0"
      @click="handleTabsRemove('all')"
      >关闭全部</el-button
    >
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      tabPanel: (state) => state.initData.tabPanel,
    }),
    ...mapGetters("initData", ["tabPanelLastId"]),
    tabPanelActive: {
      get() {
        return this.$store.state.initData.tabPanelActive;
      },
      set(val) {
        this.setTabPanelActive(val);
      },
    },
  },
  methods: {
    ...mapMutations("initData", [
      "deleteItemFromTabPanel",
      "setTabPanelActive",
    ]),
    handleTabsRemove(name) {
      this.deleteItemFromTabPanel(name);
      if (name === this.tabPanelActive) {
        this.tabPanelActive = this.tabPanelLastId;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variable.less";

.tab-panel {
  .wh(100%, 100%);
  position: relative;

  &.non-existent {
    .background("../img/home.png");

    .el-tabs /deep/ .el-tabs__content {
      background: transparent;
    }
  }

  .close-all {
    .position(absolute, 5px, 0, "", "");
    padding: 6px 10px;
    &:focus {
      color: #606266;
      border-color: #dcdfe6;
      background-color: transparent;
    }
    &:hover {
      color: @color6;
      border-color: @color6;
      background-color: transparent;
    }
  }

  .components {
    .wh(100%,100%);
    position: relative;
  }
}
</style>