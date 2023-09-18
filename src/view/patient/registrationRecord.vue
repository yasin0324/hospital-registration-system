<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column prop="doctor" label="医生" width="250">
    </el-table-column>
    <el-table-column prop="section" label="挂号科室" width="250">
    </el-table-column>
    <el-table-column prop="time" label="时间" width="250">
    </el-table-column>
    <el-table-column prop="count" label="费用" width="250"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style></style>
