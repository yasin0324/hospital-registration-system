<template>
  <div>
    <el-menu default-active="workManage" class="el-menu-vertical-demo">
      <el-menu-item
        @click="clickMenu(item)"
        v-for="item in menuData"
        :key="item.name"
        :index="item.name + ''"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: "/doctor/workManage",
          name: "workManage",
          label: "排班管理",
          icon: "edit-outline",
        },
        {
          path: "/doctor/registrationManage",
          name: "registrationManage",
          label: "挂号管理",
          icon: "date",
        },
      ],
    };
  },
  methods: {
    clickMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/information" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 1px solid #c6c6c6;
  height: 100vh;
}
</style>
