<template>
  <div id="max">
    <div id="head">
    </div>
    <div id="content">
      <table cellspacing="0">
        <tr>
          <td>序号</td>
          <td>用电类型</td>
          <td>价格</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td v-show="item.typeNum==1">居民用电</td>
          <td v-show="item.typeNum==2">工业用电</td>
          <td><input :value="item.price" disabled :id="'index'+index"/></td>
          <td><span class="operate" @click="changeType('index'+index,'ind'+index,item.typeNum)" :id="'ind'+index">修改</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import {service} from "../../js/api";
  import $ from 'jquery'

  export default {
    name: "ElectricPrice",
    data() {
      return {
        list: null,
      }
    },
    mounted() {
      this.getReader()
    },
    methods: {
      getReader() {
        service("get", "/manager/query/typeAll", {}).then(
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
      changeType(idOne, idTwo,num) {
        if ($("#" + idTwo).text() == "修改") {
          $("#" + idTwo).text("完成")
          $("#" + idOne).removeAttr("disabled")
          return
        }
        if ($("#" + idTwo).text() == "完成") {
          service("post", "/manager/update/type", {num:num, price: $("#" + idOne).val()}).then(data => {
            if (data === undefined) {
              alert("服务异常，稍后再试")
              return
            }
            if (data.code !== 200) {
              alert(data.message)
            }
            if (data.code === 200) {
              alert("修改成功")
              window.location.href='/electricPrice'
            }
          })
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

  .operate {
    background-color: darkgrey;
    border-radius: 25px;
    padding: 1% 5% 1%;
  }

  td input {
    border: none;
    background: transparent;
  }

  td input:focus {
    outline: none;
  }

</style>
