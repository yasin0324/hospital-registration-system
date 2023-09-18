<template>
  <el-container>
    <el-header>
      <div class="section">
        <el-select v-model="section" placeholder="请选择科室">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="position">
        <el-select v-model="val" placeholder="请选择类型">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="date">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="search"
          >查询</el-button
        >
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="doctor"
        v-for="item in doctor"
        :key="item.id"
        style="width: 100%"
      >
        <el-table-column label="医生" width="260">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="(dialogFormVisible = true), checkcheck(scope.low)"
              >{{ item.name }}</el-button
            >
            <el-dialog title="医生信息" :visible.sync="dialogFormVisible">
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </template>
          <!-- </el-table-column>
        <el-table-column prop="registrationName" label="挂号名称" width="260">
        </el-table-column>
        <el-table-column prop="estimatedTime" label="时间" width="260">
        </el-table-column>
        <el-table-column prop="count" label="费用" width="260">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="260">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100"> -->
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >挂号</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import http from "../../utils/request";
export default {
  data() {
    return {
      options1: [
        {
          value: "科室1",
          label: "科室1",
        },
        {
          value: "科室2",
          label: "科室2",
        },
        {
          value: "科室3",
          label: "科室3",
        },
        {
          value: "科室4",
          label: "科室4",
        },
        {
          value: "科室5",
          label: "科室5",
        },
      ],
      options2: [
        {
          value: "expert",
          label: "专家",
        },
        {
          value: "general",
          label: "普通",
        },
      ],
      val: "",
      doctor: "",
      loading: false,
      dialogVisible: false,
      tableData: [
        {
          doctor: "xxx",
          registrationName: "xxx",
          estimatedTime: "xxx",
          count: "xxx",
          state: "xxx",
        },
      ],
      dialogFormVisible: false,
      date: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      section: null,
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    checkcheck() {},
    search() {
      console.log(this.date, this.section);
      console.log(this.doctor);
    },
    getdata() {
      http({
        url: "/patient/registration/check",
        method: "post",
        data: {
          date: this.date,
          section: this.section,
        },
      })
        .then((response) => {
          this.doctor = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #a4a4a4;
    padding-bottom: 18px;
  }
  .el-main {
    display: flex;
    flex-direction: column;
    .attribute {
      display: flex;
      justify-content: space-around;
      font-weight: bold;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
