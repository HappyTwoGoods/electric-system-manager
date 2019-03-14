<template>
  <div id="max">

    <div id="title">
      新增电表
    </div>
    <div id="content">
      电表编号:<input type="text" v-model="electricNum" class="data"/><br/>
      电表类型:<select v-model="electricType" class="data">
      <option value="1">居民用电</option>
      <option value="2">工业用电</option>
    </select><br/>
      电表数据:<input type="text" v-model="electricData" class="data"/><br/>
      <input type="button" value="提交" @click="goAddElectric"/>
    </div>
  </div>
</template>

<script>
  import {service} from "../../js/api";

  export default {

    name: "AddElectric",
    data() {
      return {
        electricNum: null,
        electricType: 1,
        electricData: null
      }
    },
    methods: {
      goAddElectric() {
        service("post", "manager/add/electric", {
          num: this.electricNum,
          type: this.electricType,
          data: this.electricData
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
              this.$router.push({path: "/electric"});
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
