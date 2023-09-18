<template>
  <div class="back">
    <div class="block">
      <el-carousel
        indicator-position="none"
        arrow="never"
        trigger="click"
        :autoplay="false"
      >
        <el-carousel-item class="login" v-if="mode === 'login'">
          <el-form
            ref="logindata"
            :model="logindata"
            :rules="rules"
            :hide-required-asterisk="true"
            :inline="true"
          >
            <h2>医院挂号系统</h2>
            <h3>用户登录</h3>
            <el-form-item class="userName" label="用户名" prop="username">
              <el-input
                v-model="logindata.username"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="logindata.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="go_register" type="text"
                >还没有账号？去注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-carousel-item>
        <el-carousel-item class="register" v-else>
          <el-form ref="form" :model="form" :rules="rules" :inline="true">
            <h2>医院挂号系统</h2>
            <h3>患者注册</h3>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="form.gender"
                placeholder="请选择"
                style="width: 204.22px"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="userName" label="用户名" prop="userName">
              <el-input
                v-model="form.userName"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="emailAddress">
              <el-input
                v-model="form.emailAddress"
                placeholder="请填写邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item class="verify" label="验证码" prop="verify">
              <el-input
                v-model="form.verify"
                placeholder="请填写邮箱验证码"
              ></el-input>
              <el-button type="primary" size="small" @click="getCode"
                >获取</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button @click="go_login" type="text"
                >已有账号？去登录</el-button
              >
              <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import http from "../utils/request.js";

export default {
  data() {
    return {
      logindata: {
        username: "",
        password: "",
      },
      mode: "login",
      form: {
        name: "",
        age: "",
        gender: "",
        userName: "",
        password: "",
        emailAddress: "",
        verify: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        userName: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        age: [{ required: true, trigger: "blur", message: "请输入年龄" }],
        gender: [{ required: true, trigger: "blur", message: "请选择性别" }],
        emailAddress: [
          { required: true, trigger: "blur", message: "请填写邮箱" },
        ],
        verify: [{ required: true, trigger: "blur", message: "请填写验证码" }],
      },
    };
  },
  methods: {
    go_register() {
      this.mode = "register";
    },
    go_login() {
      this.mode = "login";
    },
    login() {
      // this.$api.login(this.logindata)
      http({
        url: "/login",
        method: "post",
        data: this.logindata,
      })
        .then((response) => {
          if (response.data) {
            localStorage.setItem("token", response.data.data.token);
            if (response.data.data.identity === "患者") {
              this.$router.push("/patient");
            }
            if (response.data.data.identity === "医生") {
              this.$router.push("/doctor");
            }
          }
          console.log(response.data.data.token);
          // console.log(response.data.data.identity);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCode() {
      http({
        url: "/verify",
        method: "get",
        params: {
          emailAddress: this.form.emailAddress,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((response) => {
          console.log(response);
        });
    },
    register() {
      http({
        url: "/paitent/register",
        method: "post",
        data: this.form,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../image/login-background.jpg");
  background-size: cover;
}
.block {
  .el-carousel {
    width: 620px;
    height: 640px;
    .login {
      width: 90%;
      margin: 100px 20px;
      background-color: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      box-shadow: 0 0 25px #cac6c6;
      .el-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        align-items: center;
        .userName {
          margin-right: 22px;
        }
      }
    }
    .register {
      height: 600px;
      overflow: visible;
      width: 90%;
      margin: 20px 20px;
      background-color: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      box-shadow: 0 0 25px #cac6c6;
      .el-form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        align-items: center;
        .userName {
          margin-right: 22px;
        }
        .verify {
          margin-left: 40px;
          .el-input {
            width: 204px;
            margin-right: 2px;
          }
        }
      }
    }
  }
  h2 {
    margin-top: 10px;
    color: #409eff;
  }
}
</style>
