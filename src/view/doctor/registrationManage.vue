<template>
  <el-container>
    <el-header>
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          @change="registrationCheck"
          value-format="yyyy-MM-dd"
          :default-value="date"
        >
        </el-date-picker>
      </div>
      <div class="manage">
        <el-button type="primary" @click="dialogFormVisible = true"
          >挂号种类管理</el-button
        >
        <el-dialog title="挂号种类管理" :visible.sync="dialogFormVisible">
          <div class="registration" v-for="item in workTypes" :key="item.id">
            <el-form :inline="true">
              <el-form-item label="挂号名称：">{{
                item.registrationName
              }}</el-form-item>
              <el-form-item label="预计时长(min)：">{{
                item.estimatedTime
              }}</el-form-item>
              <el-form-item label="费用：">{{ item.count }}</el-form-item>
            </el-form>
            <div class="button">
              <el-button-group>
                <el-button @click="delType(item)">删除种类</el-button>
                <el-button @click="updateTypeV = true">修改种类</el-button>
              </el-button-group>
            </div>
            <el-dialog
              class="type"
              title="修改种类"
              :visible.sync="updateTypeV"
              append-to-body
            >
              <el-form
                :model="item"
                :inline="true"
                style="display: flex; justify-content: space-around"
              >
                <el-form-item class="type" label="挂号名称">
                  <el-input
                    style="width: 160px"
                    v-model="item.registrationName"
                    :placeholder="item.registrationName"
                  ></el-input>
                </el-form-item>
                <el-form-item class="type" label="预计时长(min)">
                  <el-input
                    style="width: 160px"
                    v-model="item.estimatedTime"
                    :placeholder="item.estimatedTime"
                  ></el-input>
                </el-form-item>
                <el-form-item class="type" label="费用">
                  <el-input
                    style="width: 160px"
                    v-model="item.count"
                    :placeholder="item.count"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div
                slot="footer"
                class="dialog-footer"
                style="margin-top: -25px"
              >
                <el-button @click="updateTypeV = false">取 消</el-button>
                <el-button type="primary" @click="update(item)"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addTypeV = true" type="text"
              >新增挂号种类</el-button
            >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
            <el-dialog
              class="type"
              title="增加种类"
              :visible.sync="addTypeV"
              append-to-body
            >
              <el-form
                :model="newTypes"
                :inline="true"
                style="display: flex; justify-content: space-around"
              >
                <el-form-item class="type" label="挂号名称">
                  <el-input
                    style="width: 160px"
                    v-model="newTypes.registrationName"
                    placeholder="请设置挂号名称"
                  ></el-input>
                </el-form-item>
                <el-form-item class="type" label="预计时长(min)">
                  <el-input
                    style="width: 160px"
                    v-model="newTypes.estimatedTime"
                    placeholder="请设置预计时长(min)"
                  ></el-input>
                </el-form-item>
                <el-form-item class="type" label="费用">
                  <el-input
                    style="width: 160px"
                    v-model="newTypes.count"
                    placeholder="请设置费用"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div
                slot="footer"
                class="dialog-footer"
                style="margin-top: -25px"
              >
                <el-button @click="addTypeV = false">取 消</el-button>
                <el-button type="primary" @click="addType()">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-dialog>
      </div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column prop="appointmentNumber" label="预约时间">
        </el-table-column>
        <el-table-column prop="patientAppiontmentPationInfos" label="姓名">
          <template slot-scope="scope">
            <el-button
              v-for="item in scope.row.patientAppiontmentPationInfos"
              :key="item.patientId"
              type="text"
              @click="patientCheck(item)"
              >{{ item.name }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="patientAppiontmentPationInfos"
          label="性别"
          :formatter="pgender"
        >
        </el-table-column>
        <el-table-column
          prop="patientAppiontmentPationInfos"
          label="年龄"
          :formatter="page"
        >
        </el-table-column>
        <el-table-column
          prop="patientAppiontmentPationInfos"
          label="挂号名称"
          :formatter="registrationName"
        >
        </el-table-column>
        <el-table-column
          prop="patientAppiontmentPationInfos"
          label="挂号状态"
          :formatter="appointmentStatus"
        >
        </el-table-column>
        <el-table-column
          prop="patientAppiontmentPationInfos"
          label="失约次数"
          :formatter="noShowNumber"
        >
        </el-table-column>
      </el-table>
      <el-dialog title="患者信息" :visible.sync="patientVisible">
        <el-card class="box-card" style="width: 690px; margin: 0 auto">
          <div
            slot="header"
            class="clearfix"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span>{{ patientInformation.name }}</span>
            <el-button
              type="primary"
              @click="(inputOnOff = false), (save = true)"
              >编辑</el-button
            >
            <el-button
              type="text"
              v-if="save"
              style="margin-left: -510px"
              @click="setPatient"
              >保存</el-button
            >
          </div>
          <div class="text item">
            <el-form
              v-model="patientInformation"
              :inline="true"
              label-width="80px"
            >
              <el-form-item label="性别">
                <el-input
                  :placeholder="patientInformation.gender"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input
                  :placeholder="patientInformation.age"
                  :disabled="inputOnOff"
                ></el-input>
              </el-form-item>
              <el-form-item label="挂号状态">
                <el-select
                  v-model="patientInformation.appointmentStatus"
                  :placeholder="patientInformation.appointmentStatus"
                  style="width: 204px"
                  @change="showStatus"
                >
                  <el-option label="已预约" value="已预约"></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="已失约" value="已失约"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card" style="width: 690px; margin: 10px auto">
          <div slot="header" class="clearfix">
            <span>历史预约记录</span>
          </div>
          <div class="text item">
            <div class="record">
              <el-table :data="appointment">
                <el-table-column
                  prop="registrationTime"
                  label="预约时间"
                ></el-table-column>
                <el-table-column prop="section" label="科室"></el-table-column>
                <el-table-column
                  prop="doctorName"
                  label="医生名称"
                ></el-table-column>
                <el-table-column
                  prop="registationStatus"
                  label="预约状态"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import http from "../../utils/request";

export default {
  data() {
    return {
      save: false,
      date: this.dateTypeFormat("YYYY-mm-dd", new Date()),
      value1: "",
      dialogFormVisible: false,
      updateTypeV: false,
      addTypeV: false,
      patientVisible: false,
      inputOnOff: true,
      tableData: [
        {
          patientAppiontmentPationInfos: [
            {
              age: "",
              appointmentStatus: "",
              gender: "",
              name: "",
              noShowNumber: "",
              registrationName: "",
              userName: "",
              appointmentId: "",
              patientId: "",
            },
          ],
          appointmentNumber: "",
        },
      ],
      patientInformation: {
        age: "",
        appointmentStatus: "",
        gender: "",
        name: "",
        noShowNumber: "",
        registrationName: "",
        userName: "",
        appointmentId: "",
        patientId: "",
      },
      workTypes: [
        {
          id: "",
          registrationName: "口腔",
          count: "100",
          estimatedTime: "30",
        },
      ],
      newTypes: {
        registrationName: "",
        count: "",
        estimatedTime: "",
      },
      appointment: [
        {
          doctorName: "",
          patientId: "",
          registrationStatus: "",
          registrationTime: "",
          registratiionTypeId: "",
          section: "",
        },
      ],
    };
  },
  mounted() {
    this.registrationCheck();
    this.checkTypes();
  },
  methods: {
    setPatient() {
      http({
        url: "doctor/setPatientCredit",
        method: "post",
        data: {
          age: this.patientInformation.age,
          patientId: this.patientInformation.patientId,
          appointmentId: this.patientInformation.appointmentId,
          gender: this.patientInformation.gender,
          name: this.patientInformation.name,
          status: this.patientInformation.appointmentStatus,
        },
      })
        .then((response) => {
          this.inputOnOff = true;
          this.save = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showStatus() {
      http({
        url: "doctor/setPatientCredit",
        method: "post",
        data: {
          age: this.patientInformation.age,
          patientId: this.patientInformation.patientId,
          appointmentId: this.patientInformation.appointmentId,
          gender: this.patientInformation.gender,
          name: this.patientInformation.name,
          status: this.patientInformation.appointmentStatus,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    patientCheck(item) {
      http({
        url: "/doctor/query/patient/appointment/1",
        method: "get",
      })
        .then((response) => {
          console.log(response.data.data);
          this.appointment = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.patientInformation = item;
      this.patientVisible = true;
    },
    registrationCheck() {
      http({
        url: "/doctor/registration/check",
        method: "get",
        params: { date: this.date },
      })
        .then((response) => {
          this.tableData = response.data;
          console.log(response.data);
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
    delType(item) {
      console.log(item);
      http({
        url: "/doctor/registration/delete",
        method: "post",
        data: [item.id],
      })
        .then((response) => {
          this.checkTypes();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update(item) {
      http({
        url: "/doctor/registration/update",
        method: "post",
        data: item,
      })
        .then((response) => {
          this.updateTypeV = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addType() {
      http({
        url: "/doctor/registration/add",
        method: "post",
        data: this.newTypes,
      })
        .then((response) => {
          this.checkTypes();
          this.addTypeV = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pname(row) {
      let arr = [];
      row.patientAppiontmentPationInfos.forEach((item) => {
        arr.push(item.name);
      });
      return arr.join(",");
    },
    pgender(row) {
      let arr = [];
      row.patientAppiontmentPationInfos.forEach((item) => {
        arr.push(item.gender);
      });
      return arr.join(",");
    },
    page(row) {
      let arr = [];
      row.patientAppiontmentPationInfos.forEach((item) => {
        arr.push(item.age);
      });
      return arr.join(",");
    },
    noShowNumber(row) {
      let arr = [];
      row.patientAppiontmentPationInfos.forEach((item) => {
        arr.push(item.noShowNumber);
      });
      return arr.join(",");
    },
    appointmentStatus(row) {
      let arr = [];
      row.patientAppiontmentPationInfos.forEach((item) => {
        arr.push(item.appointmentStatus);
      });
      return arr.join(",");
    },
    registrationName(row) {
      let arr = [];
      row.patientAppiontmentPationInfos.forEach((item) => {
        arr.push(item.registrationName);
      });
      return arr.join(",");
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #e4e4e4;
  .manage {
    .registration {
      display: flex;
      flex-direction: column;
      border-bottom: 0.5px solid #e4e4e4;
      .el-form {
        display: flex;
        justify-content: space-around;
      }
      .button {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
