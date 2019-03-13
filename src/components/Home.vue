<template>
  <div id="max">
    <div id="head">欢迎登录电力管理系统后端</div>
    <div id="left">
      <div class="title"></div>
      <div>
        <div v-for='item in listOne' class="menu">
          <router-link :to='item.path'>
            <span class="a">{{item.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        listOne: [
          {
            'path': '/copyReader',
            'name': '电表信息'
          },
          {
            'path': '/electric',
            'name': '抄表员信息'
          },
          {
            'path': '/electricPrice',
            'name': '电价信息'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  #max {
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
  }

  #head {
    font-family: 仿宋;
    font-size: 40px;
    color: yellow;
    line-height: 100px;
    background: linear-gradient(45deg, red, white);
    width: 100%;
    height: 100px;
  }

  #left {
    float: left;
    height: 100%;
    width: 100px;
    position: fixed;
    z-index: 100;
    overflow-y: auto;
    background: linear-gradient(45deg, white, red);
  }

  .menu {
    color: yellow;
    font-size: 20px;
    font-family: 仿宋;
    margin-top: 20%;
  }

  a {
    text-decoration-line: none;
    color: #000;
  }

  .router-link-active {
    color: yellow;
  }

  #content {
    float: right;
    width: 100%;
    height: 100%;
  }
</style>
