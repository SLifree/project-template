<template>
  <div class="aside-left">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="transparent"
      text-color="rgba(0,0,0,.7)"
      active-text-color="#ca4e49"
      :unique-opened="true"
    >
      <el-submenu
        v-for="(item, index) in asideList"
        :key="index"
        :index="String(index)"
      >
        <!-- 一级标题 -->
        <template v-slot:title>
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <template v-for="(item2, index2) in item.subMenus">
          <template v-if="item2.subMenus">
            <el-submenu :key="index2" :index="String(index + '-' + index2)">
              <!-- 二级标题 -->
              <template v-slot:title>
                <i :class="item2.meta.icon"></i>
                <span>{{ item2.meta.title }}</span>
              </template>
              <!-- 三级点击项 -->
              <el-menu-item
                v-for="(item3, index3) in item2.subMenus"
                :key="index3"
                :index="String(index + '-' + index2 + '-' + index3)"
                >{{ item3.meta.title }}</el-menu-item
              >
            </el-submenu>
          </template>
          <!-- 二级点击项 -->
          <el-menu-item
            :key="index2"
            :index="String(index + '-' + index2)"
            v-else
            >{{ item2.meta.title }}</el-menu-item
          >
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      asideList: (state) => state.initData.asideList,
    }),
  },
  created() {
    const list = [
      {
        meta: { icon: "el-icon-s-marketing", title: "标签管理", id: "target" },
        subMenus: [
          {
            meta: {
              icon: "",
              title: "标签列表",
              id: "target-list",
              route: null,
            },
          },
        ],
      },
      {
        meta: {
          icon: "el-icon-s-opportunity",
          title: "算法能力",
          id: "ability",
        },
        subMenus: [
          {
            meta: { icon: "", title: "能力模型", id: "ability-model" },
            subMenus: [
              {
                meta: {
                  icon: "",
                  title: "模型详情",
                  id: "ability-model-detial",
                  route: null,
                },
              },
              {
                meta: {
                  icon: "",
                  title: "查询及导出",
                  id: "ability-model-export",
                  route: null,
                },
              },
            ],
          },
          {
            meta: {
              icon: "",
              title: "能力分析",
              id: "ability-analysis",
              route: null,
            },
          },
        ],
      },
    ];
    this.setAsideList(list);
  },
  methods: {
    ...mapMutations("initData",["additemToTabPanel", "setAsideList"]),
    ...mapActions("initData",["changeTabPanelActive"]),
    handleSelect(key) {
      const path = key.split("-");
      let item = null;
      if (path.length === 2) {
        item = this.asideList[path[0]]["subMenus"][path[1]];
      } else if (path.length === 3) {
        item = this.asideList[path[0]]["subMenus"][path[1]]["subMenus"][path[2]];
      }

      if (!item || !item.meta) return;
      // do something
      if (item.meta.ticket) {
        window.open(item.meta.route);
      } else {
        this.additemToTabPanel(item);
        this.changeTabPanelActive();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.aside-left {
  height: 100%;
  overflow: hidden auto;
}
</style>