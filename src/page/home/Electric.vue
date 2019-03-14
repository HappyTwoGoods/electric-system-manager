<template>
  <div id="max">
    <div id="head">
      <router-link to="/addElectric">
      <span>新增电表+</span>
      </router-link>
    </div>
    <div id="content">
      <table cellspacing="0">
        <tr>
          <td>序号</td>
          <td>电表编号</td>
          <td>电表类型</td>
          <td>最后一次抄表数据</td>
          <td>用户名</td>
          <td>余额</td>
          <td>状态</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td>{{item.num}}</td>
          <td v-show="item.type==1">民用电</td>
          <td v-show="item.type==2">工业用电</td>
          <td>{{item.lastData}}</td>
          <td>{{item.username}}</td>
          <td>{{item.money}}</td>
          <td v-show="item.state==1">正常</td>
          <td v-show="item.state==2">停电</td>
          <td><span class="operate" @click="deleteElectric(item.electricId)">删除</span></td>
        </tr>
      </table>
      <div id="bottom"></div>
    </div>
  </div>
</template>

<script>
  import {service} from "../../js/api";

  export default {
    name: "Electric",
    data() {
      return {
        list: null,
      }
    },
    mounted() {
      this.getElectricAll()
    },
    methods: {
      getElectricAll() {
        service("get", "/manager/select/electricAll", {}).then(
          data => {
            if (data == undefined) {
              return
            }
            if (data.code !== 200) {
              alert(data.message)
            }
            if (data.code === 200) {
              this.list = data.data
            }
          }
        )
      },
      deleteElectric(id) {
        if (confirm("确定要删除吗？")) {
          service("get", "/manager/delete/electric", {id: id}).then(
            data => {
              if (data === undefined || data.code !== 200) {
                alert("请求失败，稍后再试！")
              }
              if (data.code === 200) {
                alert("删除成功");
                window.location.href = "/electric"
              }
            }
          )
        }
      }
    }
  }
</script>

<style scoped>
  #max {
    font-family: 新宋体;
    overflow: auto;
    padding-top: 100px;
    padding-left: 100px;
    width: 100%;
    height: 100%;
  }

  #head {
    margin-top: 50px;
    margin-left: 50px;
    text-align: left;
    width: 100%;
  }

  #head span {
    padding: 0.5% 5%;
    background-color: darkgray;
    border-radius: 30px;
  }

  #content {
    margin-left: 50px;
    width: 100%;
  }

  table {
    width: 60%;

  }

  td {
    height: 35px;
    width: 12%;
    border-bottom: 1px black solid;
    border-right: 1px black solid;
  }

  td:last-child {
    width: 20%;
  }

  #bottom {
    height: 200px;
    width: 100%;
  }

  .operate {
    background-color: darkgrey;
    border-radius: 25px;
    padding: 1% 5% 1%;
  }
  a{
    text-decoration-line: none;
    color: black;
  }
</style>
