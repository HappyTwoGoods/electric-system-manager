<template>
  <div id="max">

    <div id="title">
      新增操表员
    </div>
    <div id="content">
      抄表员姓名:<input type="text" v-model="readerName" class="data"/><br/>
      抄表员电话:<input type="text" v-model="readerPhone" class="data"/><br/>
      <input type="button" value="提交" @click="goAddReader"/>
    </div>
  </div>
</template>

<script>
  import {service} from "../../js/api";

  export default {

    name: "AddReader",
    data() {
      return {
        readerName: null,
        readerPhone: null
      }
    },
    methods: {
      goAddReader() {
        service("post", "/manager/addReader", {
          name: this.readerName,
          phone: this.readerPhone
        }).then(
          data => {
            if (data === undefined) {
              alert("服务异常，稍后再试")
              return
            }
            if (data.code !== 200) {
              alert(data.message)
            }
            if (data.code === 200) {
              alert("新增成功")
              this.$router.push({path: "/copyReader"});
            }
          }
        )
      }
    }
  }
</script>

<style scoped>
  #max {
    padding-left: 100px;
    padding-top: 100px;
    width: 100%;
    height: 100%;
  }

  #title {
    display: inline-block;
    width: 20%;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
  }

  #content {
    width: 100%;
    height: 100%;
  }

  .data {
    width: 200px;
    height: auto;
    margin-top: 20px;
  }

  input[type=button] {
    margin-top: 20px;
  }
</style>
