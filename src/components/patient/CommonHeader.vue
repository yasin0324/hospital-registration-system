<template>
  <div class="header-container">
    <img
      class="picture"
      src="../../image/hospital-icon.jpeg"
      height="50px"
      width="50px"
    />
    <div class="text">
      <h2>医院挂号系统-患者界面</h2>
    </div>
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.setItem("token", "");
      this.$router.push("/");
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
  .text {
    height: 60px;
    line-height: 60px;
  }
  .logout {
    margin-right: 10px;
  }
  .logout:hover {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
