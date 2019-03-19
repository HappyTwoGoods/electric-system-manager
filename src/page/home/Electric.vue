<template>
  <div id="max">
    <div id="head">

      <router-link to="/addElectric">
        <span id="headspan">新增电表+</span>
      </router-link>
      <span style="margin-left: 50px">电表编号:</span><input type="text" style="width: 70px;" v-model="num"/>
      <span>电表类型:</span><select v-model="type">
      <option value="">所有</option>
      <option value="1">居民用电</option>
      <option value="2">工业用电</option>
    </select>
      <span>电表状态:</span><select v-model="state">
      <option value="">所有</option>
      <option value="1">正常</option>
      <option value="0">停电</option>
    </select>
      <input type="button" value="查询" style="margin-left: 50px" @click="getElctric"/>
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
          <td v-show="item.state==0">停电</td>
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
        num: null,
        state: "",
        type: ""
      }
    },
    mounted() {
      this.getElectricAll()
    },
    methods: {
      getElectricAll() {
        service("get", "/manager/select/electricAll", {}).then(
          data => {
            if (data.code !== 200) {
              alert(data.message)
            }
            if (data.code === 200) {
              this.list = data.data
            }
          }
        )
      },
      getElctric() {
        service("get", "/manager/select/electricByCondition", {
          type: this.type,
          state: this.state,
          num: this.num
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message)
          }
          if (data.code === 200) {
            this.list = data.data
          }
        })
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
    font-family: 仿宋;
    overflow-y: auto;
    padding-top: 100px;
    padding-left: 100px;
    width: 100%;
    height: 100%;
  }

  #head {
    margin-top: 1%;
    text-align: left;
    width: 100%;
  }

  #headspan {
    padding: 0.5% 5%;
    background-color: darkgray;
    border-radius: 30px;
  }

  #content {
    margin-top: 50px;
    margin-left: 50px;
    width: 100%;
  }

  table {
    width: 60%;
  }

  td {
    height: 50px;
    width: 12%;
    border-bottom: 1px black solid;
    border-right: 1px black solid;
  }

  td:first-child + td + td + td {
    width: 15%;
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

  a {
    text-decoration-line: none;
    color: black;
  }
</style>
