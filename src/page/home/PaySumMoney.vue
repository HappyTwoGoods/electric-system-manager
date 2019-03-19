<template>
  <div id="max">
    <div id="content">
      <div id="head">
        <div id="back" @click="getBack">返回</div>
        电表编号:<input type="text" v-model="electricNum" class="a"/>
        开始时间:<select v-model="start.year" class="a">
        <option v-for="n in 10" :value="date.getFullYear()-n+1">{{date.getFullYear()-n+1}}</option>
      </select>年
        <select v-model="start.month" class="a">
          <option v-for="n in 12" :value="n">{{n}}</option>
        </select>月
        结束时间:<select v-model="end.year" class="a">
        <option v-for="n in 10" :value="date.getFullYear()-n+1">{{date.getFullYear()-n+1}}</option>
      </select>年
        <select v-model="end.month" class="a">
          <option v-for="n in 12" :value="n">{{n}}</option>
        </select>月
        <input type="button" @click="getData" value="查询"/>
      </div>
      <table cellspacing="0">
        <tr>
          <td>序号</td>
          <td>电表编号</td>
          <td>用户名</td>
          <td>缴费总额</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td>{{item.electricNum}}</td>
          <td>{{item.username}}</td>
          <td>{{item.money}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>共计</td>
          <td id="count"></td>
        </tr>
      </table>
      <div id="bottom"></div>
    </div>
  </div>
</template>

<script>
  import {service} from "../../js/api";
  import $ from 'jquery'

  export default {
    name: "PayRecord",
    data() {
      return {
        list: null,
        electricNum: "",
        start: {"year": new Date().getFullYear() - 9, "month": 1},
        end: {"year": new Date().getFullYear(), "month": new Date().getMonth() + 1},
        CountPrice: null,
        date: new Date()
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        let startMonth = this.start.month < 10 ? "0" + this.start.month : this.start.month
        let endMonth = this.end.month < 10 ? "0" + this.end.month : this.end.month
        service("get", "/manager/select/paySumMoney", {
          electricNum: this.electricNum,
          start: this.start.year + "-" + startMonth + "-01",
          end: this.end.year + "-" + endMonth + "-28"
        }).then(
          data => {
            if (data === undefined) {
              return
            }
            if (data.code !== 200) {
              alert(data.message)
              this.list = null
              return
            }
            if (data.code === 200) {
              this.list = data.data
              this.sumPrice(this.list)
              return
            }
          }
        )
      },
      getBack() {
        this.$router.push({path: "/payRecord"});
      },
      sumPrice(list) {
        this.CountPrice=0
        for (let a in list) {
          this.CountPrice = list[a].money * 100 + this.CountPrice
        }
        $("#count").text((+this.CountPrice + "").substr(0, (+this.CountPrice + "").length - 2) + "." + (+this.CountPrice + "").substr((+this.CountPrice + "").length - 2))
      }
    }
  }
</script>

<style scoped>
  #max {
    font-family: 仿宋;
    overflow-y: auto;
    padding-top: 100px;
    padding-left: 100px;
    width: 100%;
  }

  #content {
    margin-left: 50px;
    width: 100%;
  }

  #head {
    width: 60%;
    margin: 3% 0%;
    display: inline-block;
    float: left;
  }

  #back {
    display: inline-block;
    padding: 0.5% 1%;
    border-radius: 25px;
    background-color: rgba(176, 196, 222, 0.5);
  }

  table {
    width: 60%;
  }

  input[type="text"] {
    width: 70px
  }

  input[type="button"] {
    margin-left: 2%;
  }

  td {
    height: 50px;
    width: 12%;
    border-bottom: 1px black solid;
    border-right: 1px black solid;
  }

  #bottom {
    height: 50px;
  }
</style>
