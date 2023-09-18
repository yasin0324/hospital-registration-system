<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="date" label="日期" width="250">
    </el-table-column>
    <el-table-column prop="doctor" label="医生姓名" width="250">
    </el-table-column>
    <el-table-column prop="registrationName" label="挂号名称" width="250">
    </el-table-column>
    <el-table-column prop="count" label="费用" width="250"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="250">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="primary"
          size="small"
        >
          支付
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          size="small"
        >
          取消预约
        </el-button>
      </template>
    </el-table-column>
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
