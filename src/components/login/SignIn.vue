<template>
  <div class="sign-in">
    <div class="tip">项目标题</div>
    <el-form :model="message" ref="message" class="login-ruleForm">
      <el-form-item prop="username" :rules="rules.username">
        <el-input
          type="text"
          :placeholder="placeholder.username"
          prefix-icon="el-icon-user"
          v-model.number="message.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="rules.password">
        <el-input
          type="password"
          :placeholder="placeholder.password"
          prefix-icon="el-icon-lock"
          v-model.number="message.password"
          clearable
          @keyup.enter.native="submitForm('message')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="message.checked">记住我</el-checkbox>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="submitForm('message')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        username: "",
        password: "",
        checked: false
      },
      placeholder: {
        username: "用户名",
        password: "密码"
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空" },
          { min: 3, max: 20, message: "用户名长度 3 - 20" },
          // /^[A-Za-z0-9]+$/
          {
            // pattern: /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{3,20}$/,
            message: "请输入正确的账户名"
          }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 8, max: 30, message: "密码长度 8 - 30" },
          {
            pattern: /(^(?![0-9]+$)(?![A-Za-z]+$)[0-9A-Za-z]*$)|(^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]*$)/,
            message: "请输入字母数字或特殊字符"
          }
        ]
      }
    };
  },
  created() {
    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // do something
        if (valid) {
          this.$emit("commit", this.message);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>

.sign-in {
  height: 100%;
  color: #000;

  .tip {
    text-align: center;
    font-size: 32px;
    line-height: 120px;
    font-weight: bold;
    color: #067af2;
  }
}
</style>