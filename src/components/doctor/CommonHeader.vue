<template>
  <div class="header-container">
    <div class="information">
      <img
        class="picture"
        src="../../image/hospital-icon.jpeg"
        height="50px"
        width="50px"
      />
      <el-button type="text" @click="Visible = true">个人信息</el-button>
      <el-dialog :visible.sync="Visible" width="30%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogVisible1 = true"
              >编辑</el-button
            >
          </div>
          <div class="text item">
            <el-form v-model="Information">
              <el-form-item label="姓名">
                <span>{{ Information.name }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ Information.age }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ Information.gender }}</span>
              </el-form-item>
              <el-form-item label="科室">
                <span>{{ Information.section }}</span>
              </el-form-item>
              <el-form-item label="擅长方向">
                <span>{{ Information.specializedField }}</span>
              </el-form-item>
              <el-form-item label="职位">
                <span>{{ Information.position }}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-dialog
          title="编辑"
          :visible.sync="dialogVisible1"
          width="30%"
          append-to-body
        >
          <el-form label-width="80px" :inline="true">
            <el-form-item label="姓名">
              <el-input
                v-model="Information.name"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input
                v-model="Information.age"
                placeholder="请输入年龄"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="Information.gender"
                placeholder="请选择"
                style="width: 204.22px"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科室">
              <el-input
                v-model="Information.section"
                placeholder="请填写科室"
              ></el-input>
            </el-form-item>
            <el-form-item label="擅长方向">
              <el-input
                v-model="Information.specializedField"
                placeholder="请填写擅长方向"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位">
              <el-input
                v-model="Information.position"
                placeholder="请填写职位"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="updateinfo">确 定</el-button>
          </span>
        </el-dialog>
      </el-dialog>
    </div>
    <div class="text">
      <h2>医院挂号管理系统-医生界面</h2>
    </div>
    <div class="other">
      <div class="register">
        <el-button type="text" @click="dialogFormVisible2 = true"
          >注册</el-button
        >
        <el-dialog
          title="医生注册"
          :visible.sync="dialogFormVisible2"
          width="640px"
        >
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            :inline="true"
          >
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入医生姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                placeholder="请输入医生年龄"
              ></el-input>
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
            <el-form-item label="科室" prop="section">
              <el-input
                v-model="form.section"
                placeholder="请输入所属科室"
              ></el-input>
            </el-form-item>
            <el-form-item label="擅长方向" prop="specializedField">
              <el-input
                v-model="form.specializedField"
                placeholder="请输入擅长方向"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="position">
              <el-input
                v-model="form.position"
                placeholder="请输入医生职位"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="form.userName"
                placeholder="请设置用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                placeholder="请设置密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="emailAddress">
              <el-input
                class="email"
                v-model="form.emailAddress"
                placeholder="请输入邮箱"
              ></el-input>
              <el-button @click="getCode" type="primary" size="small"
                >获取验证码</el-button
              >
            </el-form-item>
            <el-form-item label="验证码" prop="verify">
              <el-input
                v-model="form.verify"
                placeholder="请输入邮箱验证码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="register"> 注 册 </el-button>
            <el-button @click="dialogFormVisible2 = false"> 取 消 </el-button>
          </div>
        </el-dialog>
      </div>
      <div class="logout" @click="logout">
        <h4>退出登录</h4>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../utils/request";

export default {
  data() {
    return {
      Visible: false,
      dialogVisible1: false,
      Information: {
        name: "",
        age: "",
        gender: "",
        section: "",
        specializedField: "",
        position: "",
      },
      dialogFormVisible2: false,
      value: "",
      form: {
        userName: "",
        password: "",
        name: "",
        age: "",
        gender: "",
        section: "",
        specializedField: "",
        position: "",
        verify: "",
        emailAddress: "",
      },
      rules: {
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
        section: [{ required: true, trigger: "blur", message: "请填写科室" }],
        specializedField: [
          { required: true, trigger: "blur", message: "请填写擅长方向" },
        ],
        position: [{ required: true, trigger: "blur", message: "请填写职位" }],
      },
    };
  },
  mounted() {
    this.getInformation();
  },
  methods: {
    getInformation() {
      http({
        url: "doctor/queryInfo",
        method: "get",
      })
        .then((response) => {
          this.Information = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateinfo() {
      http({
        url: "/doctor/updateInfo",
        method: "post",
        data: this.Information,
      })
        .then((response) => {
          console.log(response);
          this.dialogVisible1 = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      localStorage.setItem("token", "");
      this.$router.push("/");
    },
    register() {
      http({
        url: "/doctor/registerOther",
        method: "post",
        data: {
          username: this.form.userName,
          password: this.form.password,
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender,
          section: this.form.section,
          specializedField: this.form.specializedField,
          position: this.form.position,
          verify: this.form.verify,
          emailAddress: this.form.emailAddress,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCode() {
      http({
        url: "verify",
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
  },
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 59px;
  border-bottom: 1px solid #c6c6c6;
  background-color: #f2f2f2;
  .picture {
    margin: 5px 10px;
  }
  .information {
    display: flex;
    align-items: center;
  }
  .other {
    margin-right: 10px;
    display: flex;
    align-items: center;
    .register {
      margin-top: 1px;
      margin-right: 10px;
      .el-button--text {
        font-size: 16px;
        color: black;
        font-weight: bold;
      }
      .el-button--text:hover {
        color: #409eff;
        cursor: pointer;
      }
      .el-form {
        .el-input {
          width: 205px;
        }
        .email {
          margin-right: 10px;
        }
      }
    }
    .logout:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
