<template>
  <div class="login-wrap">
    <div class="ms-title">dealer system</div>
    <nuxt-link to="/login">登录</nuxt-link>
  </div>
</template>

<script>
  export default {
    asyncData(context){
     if(!context.req){
     }

    },
    data: function() {
      return {
        url: '/login_before/account/login',
      }
    },
    mounted() {

    },

    methods: {

    }
  }
</script>

<style scoped>
  .login-wrap {

    width: 100%;
    height: 1000px;
    /*background-color: blue;*/
    background: url("../static/img/loginback.jpg");

  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: darkorange;
  }

  .ms-login {
    position: absolute;
    left: 46%;
    top: 50%;
    width: 400px;
    height: 250px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .ms-login-change {
    color: #666;
    width: 20px;
    height: 30px;
    /*background-color: blue;*/
    font-weight: 600;
  }

  .ms-login-changea {
    color: #409EFF;
  }

  .ms-login-change:hover {
    color: #409EFF;
    cursor: pointer;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
