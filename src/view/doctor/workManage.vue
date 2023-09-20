<template>
  <el-container>
    <el-header>
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          @change="workCheck"
          value-format="yyyy-MM-dd"
          :default-value="date"
        >
        </el-date-picker>
        <!-- <el-date-picker
          v-model="date"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
        >
        </el-date-picker> -->
        <el-date-picker
          v-model="month"
          value-format="yyyy-MM"
          type="month"
          placeholder="选择月"
          @change="workCheckMonth"
        >
        </el-date-picker>
        <el-button class="copy" type="primary" @click="copyVisible = true">
          复 制
        </el-button>
        <el-button type="primary" @click="deliver">放号</el-button>
        <el-dialog
          class="copydialog"
          title="复制"
          :visible.sync="copyVisible"
          width="700px"
        >
          <div class="copy">
            <el-date-picker
              v-model="sourDay"
              type="date"
              placeholder="选择日期"
              style="margin-right: 3px"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-date-picker
              v-model="targetDay"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-button type="primary" @click="copyDay">日复制</el-button>
          </div>
          <div class="copy">
            <el-date-picker
              v-model="sourWeekNumber"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
              style="margin-right: 3px"
            >
            </el-date-picker>
            <el-date-picker
              v-model="targetWeekNumber"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
            >
            </el-date-picker>
            <el-button type="primary" @click="copyWeek">周复制</el-button>
          </div>
          <div class="copy">
            <el-date-picker
              v-model="sourMonthNumber"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月"
              style="margin-right: 3px"
            >
            </el-date-picker>
            <el-date-picker
              v-model="targetMonthNumber"
              value-format="yyyy-MM"
              type="month"
              placeholder="选择月"
            >
            </el-date-picker>
            <el-button type="primary" @click="copyMonth">月复制</el-button>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="copyRight">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="manage">
        <el-button type="primary" @click="dialogFormVisible = true"
          >排班模板管理</el-button
        >
        <el-dialog title="排版模板" :visible.sync="dialogFormVisible">
          <div
            class="orderTemplate"
            v-for="item in orderTemplate"
            :key="item.id"
          >
            <el-form label-width="110px" :inline="true">
              <el-form-item label="排班名称："
                >{{ item.templateName }}
              </el-form-item>
              <el-form-item label="挂号种类：">
                <span v-for="type in item.registrationTypes" :key="type.id">
                  {{ type.registrationName }}
                </span>
              </el-form-item>
              <el-form-item label="上午问诊人数："
                >{{ item.morningCheckNumber }}
              </el-form-item>
              <el-form-item label="下午问诊人数："
                >{{ item.afternoonCheckNumber }}
              </el-form-item>
            </el-form>
            <div class="but">
              <el-button-group>
                <el-button @click="delTemplate(item)">删除模板</el-button>
                <el-button @click="upVisible = true">修改模板</el-button>
              </el-button-group>
            </div>
            <el-dialog
              title="修改模板"
              :visible.sync="upVisible"
              append-to-body
            >
              <el-form :model="workTemplate" label-width="100px" :inline="true">
                <el-form-item label="排班名称">
                  <el-input
                    v-model="item.templateName"
                    :placeholder="item.templateName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="挂号种类">
                  <el-select
                    v-model="item.registrationTypes"
                    multiple
                    placeholder="挂号种类"
                    style="width: 205px"
                  >
                    <el-option
                      v-for="item in workTypes"
                      :key="item.id + item.registrationName"
                      :label="item.registrationName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上午问诊人数">
                  <el-input
                    v-model="item.morningCheckNumber"
                    :placeholder="item.morningCheckNumber"
                  ></el-input>
                </el-form-item>
                <el-form-item label="下午问诊人数">
                  <el-input
                    v-model="item.afternoonCheckNumber"
                    :placeholder="item.afternoonCheckNumber"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="upVisible = false">取 消</el-button>
                <el-button type="primary" @click="upTemplate(item)"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible = true" type="text"
              >新增排版模板</el-button
            >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
            <el-dialog
              class="addtemplate"
              title="新增排班模板"
              :visible.sync="addVisible"
              append-to-body
            >
              <el-form :model="workTemplate" label-width="100px" :inline="true">
                <el-form-item label="排班名称">
                  <el-input
                    v-model="workTemplate.templateName"
                    placeholder="请填写排班名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="上午问诊人数">
                  <el-input
                    v-model="workTemplate.morningCheckNumber"
                    placeholder="请设置上午问诊人数"
                  ></el-input>
                </el-form-item>
                <el-form-item label="下午问诊人数">
                  <el-input
                    v-model="workTemplate.afternoonCheckNumber"
                    placeholder="请设置下午问诊人数"
                  ></el-input>
                </el-form-item>
                <el-form-item label="挂号种类">
                  <el-select
                    v-model="workTemplate.registrationTypes"
                    multiple
                    placeholder="请选择挂号种类"
                    style="width: 205px"
                  >
                    <el-option
                      v-for="item in workTypes"
                      :key="item.registrationName"
                      :label="item.registrationName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTemplate">确 认</el-button>
              </div>
            </el-dialog>
          </div>
        </el-dialog>
      </div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%" max-height="687px">
        <el-table-column prop="date" label="日期" width="230">
        </el-table-column>
        <el-table-column
          prop="registrationTypes"
          label="挂号种类"
          :formatter="registrationName"
          width="230"
        >
        </el-table-column>
        <el-table-column
          prop="registrationTypes"
          label="费用"
          :formatter="count"
          width="230"
        >
        </el-table-column>
        <el-table-column
          prop="registrationTypes"
          :formatter="estimatedTime"
          label="预计时长"
          width="230"
        >
        </el-table-column>
        <el-table-column
          prop="morningCheckNumber"
          label="上午看诊人数"
        ></el-table-column>
        <el-table-column
          prop="afternoonCheckNumber"
          label="下午看诊人数"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              @click="update(scope.row)"
              type="primary"
              v-if="scope.row.deliver === 0"
              >修改
            </el-button>
            <el-button type="info" v-if="scope.row.deliver === 1"
              >修改
            </el-button>
            <el-button
              @click="getDate(scope.row)"
              size="small"
              style="margin-right: 5px"
              >选择模板
            </el-button>
            <span v-if="scope.row.deliver === 1">已放号</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="选择排版模板" :visible.sync="choseVisible">
        <div class="orderTemplate" v-for="item in orderTemplate" :key="item.id">
          <el-form label-width="110px" :inline="true">
            <el-form-item label="排班名称："
              >{{ item.templateName }}
            </el-form-item>
            <el-form-item
              v-for="type in item.registrationTypes"
              :key="type.registrationName"
              label="挂号种类："
              >{{ type.registrationName }}
            </el-form-item>
            <el-form-item label="上午问诊人数："
              >{{ item.morningCheckNumber }}
            </el-form-item>
            <el-form-item label="下午问诊人数："
              >{{ item.afternoonCheckNumber }}
            </el-form-item>
          </el-form>
          <div class="but">
            <el-button-group>
              <el-button @click="chose(item)" type="primary">
                使用模板
              </el-button>
            </el-button-group>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="修改排班" :visible.sync="updateVisible" width="1000px">
        <el-form :model="toUpdate" label-width="100px" :inline="true">
          <el-form-item label="上午问诊人数">
            <el-input
              v-model="toUpdate.morningCheckNumber"
              placeholder="请设置上午问诊人数"
            ></el-input>
          </el-form-item>
          <el-form-item label="下午问诊人数">
            <el-input
              v-model="toUpdate.afternoonCheckNumber"
              placeholder="请设置下午问诊人数"
            ></el-input>
          </el-form-item>
          <el-form-item label="挂号种类">
            <el-select
              v-model="toUpdate.registrationTypes"
              multiple
              placeholder="请选择挂号种类"
              style="width: 205px"
            >
              <el-option
                v-for="item in workTypes"
                :key="item.id"
                :label="item.registrationName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: -25px">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateWork">确 定</el-button>
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
      yon: true,
      choseDate: "",
      date: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      month: this.dateTypeFormat("YYYY-mm", new Date()),
      sourDay: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      sourWeekNumber: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      sourMonthNumber: this.dateTypeFormat("YYYY-mm", new Date()),
      targetDay: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      targetWeekNumber: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      targetMonthNumber: this.dateTypeFormat("YYYY-mm", new Date()),
      dialogFormVisible: false,
      addVisible: false,
      upVisible: false,
      copyVisible: false,
      choseVisible: false,
      updateVisible: false,
      tableData: [
        {
          data: "",
          doctorId: "",
          morningCheckNumber: "",
          afternoonCheckNumber: "",
          deliver: 0,
          registrationTypes: [
            {
              id: "",
              registrationName: "",
              count: "",
              estimatedTime: "",
            },
          ],
        },
        {
          data: "",
          doctorId: "",
          morningCheckNumber: "",
          afternoonCheckNumber: "",
          deliver: 1,
          registrationTypes: [
            {
              id: "",
              registrationName: "",
              count: "",
              estimatedTime: "",
            },
          ],
        },
      ],
      toUpdate: {
        afternoonCheckNumber: "",
        date: "",
        morningCheckNumber: "",
        doctorId: "",
        registrationTypes: [
          {
            id: "",
            registrationName: "",
            count: "",
            estimatedTime: "",
          },
        ],
      },
      workTemplate: {
        templateName: "",
        morningCheckNumber: "",
        afternoonCheckNumber: "",
        registrationTypes: [
          {
            id: "",
            registrationName: "",
            count: "",
            estimatedTime: "",
          },
        ],
      },
      workTypes: [
        { id: "1", registrationName: "111", count: "", estimatedTime: "" },
        { id: "2", registrationName: "222", count: "", estimatedTime: "" },
      ],
      orderTemplate: [
        {
          afternoonCheckNumber: "",
          morningCheckNumber: "",
          doctorId: "",
          id: "",
          templateName: "",
          registrationTypes: [
            {
              count: "",
              estimatedTime: "",
              id: "",
              registrationName: "",
            },
          ],
        },
      ],
    };
  },
  computed: {
    typesComputed: function () {
      let temp = [];
      for (const item of this.workTemplate.registrationTypes) {
        for (const item2 of this.workTypes) {
          if (item2.id === item) {
            temp.push(item2);
          }
        }
      }
      return temp;
    },
    typesComputed2: function () {
      let temp = [];
      for (const item of this.toUpdate.registrationTypes) {
        for (const item2 of this.workTypes) {
          if (item2.id === item) {
            temp.push(item2);
          }
        }
      }
      return temp;
    },
  },
  mounted() {
    this.workCheck();
    this.checkTypes();
    this.checkTemplates();
  },
  methods: {
    getDate(row) {
      // console.log(row);
      this.choseDate = row.data;
      // console.log(this.choseDate);
      this.choseVisible = true;
    },
    addTemplate() {
      this.workTemplate.registrationTypes = this.typesComputed;
      console.log(this.typesComputed);
      console.log(this.workTemplate.registrationTypes);
      http({
        url: "/doctor/template/add",
        method: "post",
        data: {
          templateName: this.workTemplate.templateName,
          morningCheckNumber: this.workTemplate.morningCheckNumber,
          afternoonCheckNumber: this.workTemplate.afternoonCheckNumber,
          registrationTypes: this.workTemplate.registrationTypes,
        },
      })
        .then((response) => {
          console.log(response);
          this.checkTemplates();
          this.addVisible = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkTypes() {
      http({
        url: "/doctor/registration/query",
        method: "get",
      })
        .then((response) => {
          this.workTypes = response.data.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkTemplates() {
      http({
        url: "/doctor/template/query",
        method: "get",
      })
        .then((response) => {
          this.orderTemplate = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delTemplate(item) {
      console.log(item.id);
      http({
        url: "doctor/template/delete",
        method: "post",
        data: [item.id],
      })
        .then((response) => {
          console.log(this.orderTemplate, response);
          this.checkTemplates();
          console.log(this.orderTemplate);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    upTemplate(item) {
      this.workTemplate = item;
      this.workTemplate.registrationTypes = this.typesComputed;
      this.checkTemplates();
      // http({
      //   url: "doctor/template/update",
      //   method: "post",
      //   data: {
      //     id: item.id,
      //     templateName: item.templateName,
      //     morningCheckNumber: item.morningCheckNumber,
      //     afternoonCheckNumber: item.afternoonCheckNumber,
      //     registrationTypes: item.registrationTypes,
      //   },
      // })
      //   .then((response) => {
      //     this.checkTemplates();
      //     console.log(response);
      //     this.upVisible = false;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    chose(item) {
      http({
        url: "/doctor/schedule/template",
        method: "post",
        data: {
          date: this.choseDate,
          templateId: item.id,
        },
      })
        .then((response) => {
          console.log(response);
          this.choseVisible = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update(row) {
      console.log(row);
      this.choseDate = row.date;
      console.log(this.choseDate);
      this.toUpdate = row;
      this.updateVisible = true;
    },
    updateWork() {
      this.toUpdate.registrationTypes = this.typesComputed2;
      http({
        url: "/doctor/schedule/set",
        method: "post",
        data: {
          afternoonCheckNumber: this.toUpdate.afternoonCheckNumber,
          data: this.choseDate,
          morningCheckNumber: this.toUpdate.morningCheckNumber,
          registrationTypes: this.toUpdate.registrationTypes,
        },
      });
    },
    registrationName(row) {
      let arr = [];
      row.registrationTypes.forEach((item) => {
        arr.push(item.registrationName);
      });
      return arr.join(",");
    },
    count(row) {
      let arr = [];
      row.registrationTypes.forEach((item) => {
        arr.push(item.count);
      });
      return arr.join(",");
    },
    estimatedTime(row) {
      let arr = [];
      row.registrationTypes.forEach((item) => {
        arr.push(item.estimatedTime);
      });
      return arr.join(",");
    },
    workCheck() {
      http({
        url: "doctor/schedule/query",
        method: "get",
      })
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].date === this.date) {
              let temp = [];
              for (let j = 0; j < 14; j++) {
                temp[j] = response.data.data[i];
                i++;
              }
              this.tableData = temp;
              break;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    workCheckMonth() {
      this.month += "-01";
      http({
        url: "doctor/schedule/query",
        method: "get",
      })
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].data === this.month) {
              let temp = [];
              for (let j = 0; j < 30; j++) {
                temp[j] = response.data.data[i];
                i++;
              }
              this.tableData = temp;
              break;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    copyDay() {
      http({
        url: "/doctor/schedule/copy/day",
        method: "post",
        data: {
          sourDay: this.sourDay,
          targetDay: this.targetDay,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    copyWeek() {
      http({
        url: "/doctor/schedule/copy/week",
        method: "post",
        data: {
          sourWeekNumber: this.$moment(this.sourWeekNumber).format("YYYY - ww"),
          targetWeekNumber: this.$moment(this.targetWeekNumber).format(
            "YYYY - ww"
          ),
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    copyMonth() {
      http({
        url: "/doctor/schedule/copy/month",
        method: "post",
        data: {
          sourMonthNumber: this.sourMonthNumber,
          targetMonthNumber: this.targetMonthNumber,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    debug() {
      console.log(this.date);
    },
    copyRight() {
      this.checkTemplates();
      this.copyVisible = false;
    },
    deliver() {
      http({
        url: "/doctor/registration/deliver",
        method: "get",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #e4e4e4;
  }
}
.addtemplate {
  .el-form {
    .el-input {
      width: 205px;
    }
  }
}
.orderTemplate {
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #e4e4e4;
  .el-form {
    margin-left: 45px;
    margin-top: 10px;
    .el-form-item {
      width: 350px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      padding-left: 5px;
    }
  }
  .but {
    display: flex;
    justify-content: center;
  }
}
.date {
  .copy {
    margin: 0 50px;
  }
  .copydialog {
    display: flex;
    flex-direction: column;
    .copy {
      margin: 5px 0;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>
