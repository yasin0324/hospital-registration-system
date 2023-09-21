<template>
  <div class="main">
    <el-card
      v-for="(item, index) in history"
      :key="item.oddNumber"
      shadow="hover"
    >
      <div slot="header" class="clearfix">
        <span>订单号：{{ item.oddNumber }}</span>
      </div>
      <div class="time test">挂号时间：{{ item.registrationTime }}</div>
      <div class="name test">医生姓名：{{ item.doctorName }}</div>
      <div class="section test">科室：{{ item.section }}</div>
      <div class="type test">
        挂号种类:{{ item.registrationTypes[0].registrationName }}
      </div>
      <div class="status test">
        <el-button
          class="sta"
          v-if="item.gopay === false && item.registrationStatus === 'unpaid'"
          @click="goPay(item)"
          >未支付({{ countdown1[index] }})</el-button
        >
        <el-button
          v-if="item.gopay && item.registrationStatus === 'unpaid'"
          @click="cancel(item)"
          >取消预约</el-button
        >
        <el-button
          v-if="item.gopay && item.registrationStatus === 'unpaid'"
          type="primary"
          @click="confirm(item)"
          >确认付款</el-button
        >
        <el-button
          class="sta"
          type="primary"
          v-if="item.registrationStatus === 'waiting'"
          >待问诊</el-button
        >
        <el-button
          class="sta"
          type="success"
          v-if="item.registrationStatus === 'visited'"
          >已完成</el-button
        >
        <el-button
          class="sta"
          type="info"
          v-if="item.registrationStatus === 'noVisited'"
          >已失约</el-button
        >
        <el-button
          class="sta"
          type="info"
          v-if="item.registrationStatus === 'stopped'"
          >已终止</el-button
        >
        <el-button
          class="sta"
          type="info"
          v-if="item.registrationStatus === 'canceled'"
          >已取消</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "../../api/request";

export default {
  data() {
    return {
      history: [
        // {
        //   oddNumber: "",
        //   id: "",
        //   doctorName: "张三",
        //   doctorId: "",
        //   patientId: "",
        //   registrationStatus: "unpaid",
        //   gopay: true,
        //   registrationTime: "",
        //   lastTime: 15,
        //   countDown: "",
        //   section: "",
        //   registrationTypes: [
        //     {
        //       count: "",
        //       estimatedTime: "",
        //       id: "",
        //       registrationName: "",
        //     },
        //   ],
        // },
        // {
        //   id: "",
        //   doctorName: "王华",
        //   patientId: "",
        //   registrationStatus: "unpaid",
        //   registrationTime: "",
        //   lastTime: 10,
        //   countDown: "",
        //   section: "",
        //   registrationTypes: [
        //     {
        //       count: "",
        //       estimatedTime: "",
        //       id: "",
        //       registrationName: "",
        //     },
        //   ],
        // },
        // {
        //   id: "",
        //   doctorName: "",
        //   patientId: "",
        //   registrationStatus: "unpaid",
        //   registrationTime: "",
        //   lastTime: 5,
        //   countDown: "",
        //   section: "",
        //   registrationTypes: [
        //     {
        //       count: "",
        //       estimatedTime: "",
        //       id: "",
        //       registrationName: "",
        //     },
        //   ],
        // },
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
    };
  },
  mounted() {
    this.appointment();
    this.countdown();
  },

  computed: {
    countdown1: function () {
      let temp = [];
      for (let item of this.history) {
        if (item.lastTime === 0) {
          temp.push("00:00");
        } else {
          let minutes = Math.floor(item.lastTime / 60);
          let seconds = Math.floor(item.lastTime % 60);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          temp.push(minutes + ":" + seconds);
        }
      }
      return temp;
    },
  },
  methods: {
    goPay(item) {
      console.log(item.gopay);
      item.gopay = true;
    },
    addStatus() {
      for (let item of this.history) {
        item.gopay = false;
      }
    },
    countdown() {
      for (let item of this.history) {
        const interval = setInterval(() => {
          if (item.lastTime !== 0) item.lastTime--;
          // let minutes = Math.floor(item.lastTime / 60);
          // let seconds = Math.floor(item.lastTime % 60);
          // minutes = minutes < 10 ? "0" + minutes : minutes;
          // seconds = seconds < 10 ? "0" + seconds : seconds;
          // item.countDown = minutes + ":" + seconds;
          this.appointment();
          if (item.lastTime === 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
      // this.interval = setInterval(() => {
      //   for (let item of this.history) {
      //     item.lastTime--;
      //     let minutes = Math.floor(item.lastTime / 60);
      //     let seconds = Math.floor(item.lastTime % 60);
      //     minutes = minutes < 10 ? "0" + minutes : minutes;
      //     seconds = seconds < 10 ? "0" + seconds : seconds;
      //     item.countDown = minutes + ":" + seconds;
      //     if (item.lastTime === 0) {
      //       clearInterval(this.interval);
      //     }
      //   }
      // }, 1000);
    },
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
      // this.addStatus();
      http({
        url: "/patient/query/patient/appointment",
        method: "get",
      })
        .then((response) => {
          console.log(response.data);
          this.history = response.data.data;
          console.log(this.countdown1);
          // this.addStatus();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancel(item) {
      this.$store.commit("getInformation2", item);
      this.$store.commit("checkId");
      console.log(this.$store.state.tab.historyItem);
      http({
        url: "/patient/cancelPayment",
        method: "post",
        data: {
          choiceTime: item.registrationTime.slice(11, 22),
          date: item.registrationTime.slice(0, 10),
          doctorId: this.$store.state.tab.historyItem.doctorId,
          registrationTypeId: item.registrationTypes[0].id,
          section: item.section,
          oddNumber: item.oddNumber,
        },
      })
        .then((response) => {
          this.appointment();
          if (response.data.code === 200) {
            this.$message({
              message: response.data.msg,
              type: "success",
              duration: 1500,
            });
          }
          if (response.data.code !== 200) {
            this.$message({
              message: response.data.msg,
              type: "warning",
              duration: 1500,
            });
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirm(item) {
      this.$store.commit("getInformation2", item);
      this.$store.commit("checkId");
      // this.getDoctorid(item.doctorName);
      // console.log(
      //   item.registrationTime.slice(11, 22),
      //   item.registrationTime.slice(0, 10),
      //   item.registrationTypes[0].id
      // );
      http({
        url: "/patient/confirmPayment",
        method: "post",
        data: {
          choiceTime: item.registrationTime.slice(11, 22),
          date: item.registrationTime.slice(0, 10),
          doctorId: this.$store.state.tab.historyItem.doctorId,
          registrationTypeId: item.registrationTypes[0].id,
          section: item.section,
          oddNumber: item.oddNumber,
        },
      })
        .then((response) => {
          this.appointment();
          if (response.data.code === 200) {
            this.$message({
              message: response.data.msg,
              type: "success",
              duration: 1500,
            });
          }
          if (response.data.code !== 200) {
            this.$message({
              message: response.data.msg,
              type: "warning",
              duration: 1500,
            });
          }
          console.log(response);
        })
        .catch((error) => {
          console.lof(error);
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
    height: 340px;
    width: 25%;
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
