<template>
  <div>
    <el-menu router class="el-menu-vertical-demo">
      <!-- <el-menu-item index="2">
        <i class="el-icon-first-aid-kit"></i>
        <span slot="title">挂号模块</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-time"></i>
        <span slot="title">挂号记录 </span>
      </el-menu-item> -->
      <el-menu-item
        v-for="item in menuData"
        :key="item.name"
        :index="item.path"
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
          path: "/patient/registration",
          name: "registration",
          label: "挂号模块",
          icon: "first-aid-kit",
        },
        {
          path: "/patient/record",
          name: "record",
          label: "挂号记录",
          icon: "time",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 1px solid #c6c6c6;
  height: 100vh;
}
</style>
