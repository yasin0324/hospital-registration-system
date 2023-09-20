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
        <el-table-column label="医生">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="(dialogFormVisible = true), checkcheck(scope.low)"
              >{{ item.name }}</el-button
            >
            <el-dialog
              title="医生信息"
              :visible.sync="dialogFormVisible"
              width="30%"
            >
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>医生信息</span>
                </div>
                <div class="text item">
                  <el-form>
                    <el-form-item label="姓名">
                      <span>{{ item.name }}</span>
                    </el-form-item>
                    <el-form-item label="年龄">
                      <span>{{ item.age }}</span>
                    </el-form-item>
                    <el-form-item label="性别">
                      <span>{{ item.gender }}</span>
                    </el-form-item>
                    <el-form-item label="科室">
                      <span>{{ item.section }}</span>
                    </el-form-item>
                    <el-form-item label="擅长方向">
                      <span>{{ item.specializedField }}</span>
                    </el-form-item>
                    <el-form-item label="职位">
                      <span>{{ item.position }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="科室" prop="section"></el-table-column>
        <el-table-column label="职位" prop="position"></el-table-column>
        <el-table-column label="擅长方向" prop="position"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="doctorChose(scope.row)"
              type="primary"
              size="small"
              >挂号</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="挂号" :visible.sync="registrationVisible" width="350px">
        <div>
          <el-card>
            <el-form :model="doctorChoice">
              <el-form-item label="选择挂号种类">
                <el-select
                  v-model="orderChose.registrationTypeId"
                  placeholder="请选择挂号种类"
                >
                  <el-option
                    v-for="item in doctorChoice.registrationTypes"
                    :key="item.id"
                    :label="item.registrationName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择时间段">
                <el-select
                  v-model="orderChose.choiceTime"
                  placeholder="请选择时间段"
                >
                  <el-option :label="timedata.nineten" value="9-10"></el-option>
                  <el-option
                    :label="timedata.teneleven"
                    value="10-11"
                  ></el-option>
                  <el-option
                    :label="timedata.eleventwelve"
                    value="11-12"
                  ></el-option>
                  <el-option
                    :label="timedata.fourteenfifteen"
                    value="14-15"
                  ></el-option>
                  <el-option
                    :label="timedata.fifteensixteen"
                    value="15-16"
                  ></el-option>
                  <el-option
                    :label="timedata.sixteenseventeen"
                    value="16-17"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="margin: 0 85px">
              <el-button @click="orderSubmit" type="primary"
                >提交订单</el-button
              >
            </div>
          </el-card>
        </div>
      </el-dialog>
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
          value: "内科",
          label: "内科",
        },
      ],
      val: "",
      doctor: [
        {
          id: "",
          name: "",
          age: "",
          gender: "",
          section: "",
          specializedField: "",
          position: "",
        },
      ],
      loading: false,
      dialogVisible: false,
      dialogFormVisible: false,
      registrationVisible: false,
      tableData: [
        {
          doctor: "",
          registrationName: "",
          estimatedTime: "",
          count: "",
          state: "",
        },
      ],
      doctorChoice: {
        nineTen: "1",
        tenEleven: "2",
        elevenTwelve: "3",
        fourteenFifteen: "4",
        fifteenSixteen: "5",
        sixteenSeventeen: "6",
        registrationNumberAfternoon: "7",
        registrationNumberMorning: "8",
        registrationTypes: [
          {
            count: "20",
            estimatedTime: "20",
            id: 1,
            registrationName: "1",
          },
          {
            count: "30",
            estimatedTime: "30",
            id: 2,
            registrationName: "2",
          },
        ],
      },
      orderChose: {
        date: "",
        doctorId: "",
        choiceTime: "",
        section: "",
        registrationTypeId: "",
      },
      date: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      section: null,
    };
  },
  computed: {
    timedata: function () {
      return {
        nineten: `9:00-10:00(剩余${this.doctorChoice.nineTen}min)`,
        teneleven: `10:00-11:00(剩余${this.doctorChoice.tenEleven}min)`,
        eleventwelve: `11:00-12:00(剩余${this.doctorChoice.elevenTwelve}min)`,
        fourteenfifteen: `14:00-15:00(剩余${this.doctorChoice.fourteenFifteen}min)`,
        fifteensixteen: `15:00-16:00(剩余${this.doctorChoice.fifteenSixteen}min)`,
        sixteenseventeen: `16:00-17:00(剩余${this.doctorChoice.sixteenSeventeen}min)`,
      };
    },
  },
  mounted() {
    this.getdata();
  },
  methods: {
    checkcheck() {},
    doctorChose(row) {
      console.log(row);
      this.registrationVisible = true;
      // this.orderChose.date = this.date;
      // this.orderChose.doctorId = row.id;
      // this.orderChose.section = row.section;
      http({
        url: "/patient/choice/13",
        method: "get",
        params: row.doctorId,
      })
        .then((response) => {
          for (const item of response.data.data) {
            if (item.date === this.date) {
              console.log(item.date);
              this.doctorChoice = item;
              this.orderChose.date = this.date;
              this.orderChose.doctorId = row.id;
              this.orderChose.section = row.section;
            }
          }
          this.registrationVisible = true;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      this.getdata();
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    orderSubmit() {
      console.log(this.orderChose.registrationTypeId);
      console.log(this.orderChose);
      http({
        url: "/patient/choice/time",
        method: "post",
        data: this.orderChose,
      })
        .then((response) => {
          console.log(response);
          this.registrationVisible = false;
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
    border-bottom: 0.5px solid #e4e4e4;
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
