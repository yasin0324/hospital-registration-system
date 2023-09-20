<template>
  <div class="main">
    <el-card
      v-for="item in dataSee"
      :key="item.registrationTime"
      shadow="hover"
    >
      <div class="time test">挂号时间：{{ item.registrationTime }}</div>
      <div class="name test">医生姓名：{{ item.doctorName }}</div>
      <div class="section test">科室：{{ item.section }}</div>
      <div class="type test">挂号种类:{{ item.registrationName }}</div>
      <div class="status test">
        <el-button
          class="sta"
          type="info"
          v-if="gopay && item.registrationStatus === 'topay'"
          @click="gopay = false"
          >未支付</el-button
        >
        <el-button
          v-if="gopay === false && item.registrationStatus === 'topay'"
          @click="cancel"
          >取消预约</el-button
        >
        <el-button
          v-if="gopay === false && item.registrationStatus === 'topay'"
          type="primary"
          @click="confirm"
          >确认付款</el-button
        >
        <el-button
          class="sta"
          type="success"
          v-if="item.registrationStatus === 'payed'"
          >已完成</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "../../utils/request";

export default {
  data() {
    return {
      history: [
        {
          doctorName: "",
          registrationStatus: "topay",
          registrationTime: "1",
          registrationTypeId: 1,
          section: "",
          registrationName: "",
        },
        {
          doctorName: "",
          registrationStatus: "payed",
          registrationTime: "2",
          registrationTypeId: 2,
          section: "",
          registrationName: "",
        },
        {
          doctorName: "",
          registrationStatus: "payed",
          registrationTime: "3",
          registrationTypeId: 1,
          section: "",
          registrationName: "",
        },
        {
          doctorName: "",
          registrationStatus: "payed",
          registrationTime: "4",
          registrationTypeId: "",
          section: "",
          registrationName: "",
        },
        {
          doctorName: "",
          registrationStatus: "payed",
          registrationTime: "5",
          registrationTypeId: "",
          section: "",
          registrationName: "",
        },
        {
          doctorName: "",
          registrationStatus: "payed",
          registrationTime: "6",
          registrationTypeId: "",
          section: "",
          registrationName: "",
        },
      ],
      types: [
        {
          id: 1,
          registrationName: "111",
          count: "",
          estimatedTime: "",
        },
        {
          id: 2,
          registrationName: "222",
          count: "",
          estimatedTime: "",
        },
      ],
      gopay: true,
    };
  },
  computed: {
    dataSee: function () {
      let temp = [{}];
      for (const item1 of this.history) {
        for (const item2 of this.types) {
          if (item1.registrationTypeId === item2.id) {
            item1.registrationName = item2.registrationName;
          }
        }
      }
      temp = this.history;
      return temp;
    },
  },
  mounted() {
    this.appointment();
  },
  methods: {
    workTypes() {
      http({
        url: "/doctor/registration/query",
        method: "get",
      })
        .then((response) => {
          this.types = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    appointment() {
      http({
        url: "/patient/query/patient/appointment",
        method: "get",
      })
        .then((response) => {
          this.history = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel() {
      http({
        url: "/patient/cancelPayment",
        method: "post",
      });
    },
    confirm() {
      http({
        url: "/patient/confirmPayment",
        method: "post",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .el-card {
    height: 300px;
    width: 20%;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    :deep(.el-card__body) {
      height: 300px;
    }

    .time {
      height: 19%;
      line-height: 50px;
    }
    .name {
      height: 19%;
      line-height: 50px;
    }
    .section {
      height: 19%;
      line-height: 50px;
    }
    .type {
      height: 19%;
      line-height: 50px;
    }
    .status {
      height: 24%;
      line-height: 62px;
      .el-button {
        width: 48%;
        height: 62px;
      }
      .sta {
        width: 100%;
        height: 62px;
      }
    }
  }
}
</style>
