<template>
  <div id="max">
    <div id="background">
      <img src="../assets/login.jpg"/>
    </div>
    <div id="content">
      <div id="title">管理员登录</div>
      <div id="frame">
        <div class="input">
          <input placeholder="请输入手机号" type="text" v-model="userPhone"/>
          <span v-show="userPhone" @click="getCode" id="code">获取验证码</span>
        </div>
        <div class="input">
          <input placeholder=" 请输入验证码" type="password" v-model="code"/>
        </div><br/>
        <span id="login" @click="userLogin">登录</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'

  export default {
    data() {
      return {
        userPhone: null,
        code: null
      }
    },
    methods: {
      getCode() {
        service('post', '/manager/verifyCode', {
          phone: this.userPhone
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          console.log(data.message);
          alert("您的验证码为：" + data.message);
        })
      },
      userLogin() {
        service('post', '/manager/login', {
          phone: this.userPhone,
          code: this.code
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("登录成功！");
          window.location.href = "/"
        })

      }
    }
  }

</script>
<style scoped>
  #max {
    font-family: 仿宋;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
  }

  #background {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
  }

  #content {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
  }

  #title {
    margin-top: 15%;
    font-size: 40px;
  }

  #frame {
    background: transparent;
    display: inline-block;
    margin-top: 3%;
    width: 25%;
    height: 25%;
  }

  .input {
    display: inline-block;
    width: 60%;
    border-bottom: 0.5px black solid;
    margin-top: 10%;

  }
  input{
    background: transparent;
    border: none;
    height: 20%;
    width: 40%;
  }
  input:focus{
    outline: none;
  }
  #login{
    font-size: 20px;
    display: inline-block;
    margin-top: 10%;
    padding: 1% 5%;
    border-radius: 25px;
    background-color: rgba(255,255,255,0.6);
  }
  #code{
    padding: 2%;
    border-radius: 10px;
    background-color: rgba(255,255,255,0.6);
  }
</style>
