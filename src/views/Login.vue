<template>
  <div class="login-in">
    <div class="login-container">
      <sign-in @commit="signIn"></sign-in>
    </div>
  </div>
</template>

<script>
import SignIn from "@/components/login/SignIn";
export default {
  components: {
    SignIn,
  },
  methods: {
    signIn(obj) {
      console.log(obj, "登录信息");
      const isSuccess = true;
      if (isSuccess) {
        this.$router.push("/home");
        // do something
      } else {
        this.openNotification();
      }
    },
    openNotification() {
      this.$notify({
        title: "",
        message: "用户名或密码输入错误，请重新输入",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/variable.less";

.login-in {
  height: 100%;
  position: relative;
  background-color: #d9e8ef;

  .login-container {
    .wh(400px, 500px);
    .position(absolute, 50%, "", "", 50%);
    transform: translate(-50%,-50%);
    background: linear-gradient(
      to bottom,
      rgba(167, 220, 239, 0.6),
      rgba(196, 216, 227, 0.5)
    );
    border-radius: 12px;
    box-sizing: border-box;
    padding: 30px;
    box-shadow: 0 0 10px 5px #a6b5bc;
  }
}
</style>