<template>
  <div class="header-top">
    <div class="logo">LOGO</div>
    <div class="button">
      <i
        v-for="(item, index) in icons"
        :key="index"
        :class="item.icon"
        @click="drawer(item.type)"
      ></i>
      <span class="title">项目标题</span>
    </div>
    <div class="user">
      <el-avatar size="small" :src="userImg"></el-avatar>
      <span class="user-info">
        <span> {{ role }} {{ name }} </span>
        <i class="el-icon-arrow-down"></i>
      </span>

      <div class="box-card">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item"
          @click="handleClick(item)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import userImg from "../../assets/img/user.png";

export default {
  data() {
    return {
      icons: [
        { icon: "el-icon-set-up", type: "fold" },
        { icon: "el-icon-full-screen", type: "full" },
      ],
      userImg,
      role: "超级管理员",
      name: "admin",
      list: [
        { name: "个人中心", icon: "el-icon-user-solid", type: "person" },
        { name: "登出", icon: "el-icon-switch-button", type: "signout" },
      ],
    };
  },
  created() {
    
  },
  methods: {
    ...mapMutations(["setAsideList", "deleteItemFromTabPanel"]),
    drawer(type) {
      this.$emit("drawer", type);
    },
    handleClick(e) {
      const type = e.type;
      if (type === "signout") {
        // do something
        this.setAsideList();
        this.deleteItemFromTabPanel("all");
        this.$router.push("/");
      } else if (type === "person") {
        console.log(`handle ${type}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variable.less";

.header-top {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;

  .logo {
    .wh(146px, 40px);
    margin-top: 10px;
    margin-left: 22px;
    line-height: 40px;
    text-align: center;
  }

  .button {
    font-size: @size6;
    .position(absolute, 50%, "", "", 210px);
    transform: translateY(-50%);
    line-height: 60px;
    color: @color5;

    i {
      margin: 0 10px;
      cursor: pointer;

      &:hover {
        color: @color1;
      }
    }

    .title {
      font-size: 26px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: bold;
      margin-left: 30px;
    }
  }

  .user {
    .position(absolute, 0, 0, "", "");
    height: 100%;
    color: @color4;
    display: flex;
    align-items: center;

    .user-info {
      margin-left: 10px;
      cursor: pointer;
    }

    &:hover .box-card {
      transform: scaleY(1);
    }
  }

  .box-card {
    border: 1px solid @color3;
    background-color: @color2;
    color: @color4;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;
    padding: 5px 0;
    transition: height 1.5s linear;
    width: 110px;
    transform: scaleY(0);
    transition: transform 0.3s linear;
    transform-origin: 0 0;
    .position(fixed, 50px, 20px, "", "");
    z-index: 999;

    .item {
      font-size: @size1;
      line-height: 30px;
      text-indent: 7px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      i {
        margin-right: 10px;
      }
    }
  }
}
</style>