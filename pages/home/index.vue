<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row>
          <el-col>
            <el-card shadow="hover" class="mgb20">
              <div class="user-info">
                <div class="user-avator">
                  <img :src="imageUrl" alt="">
                </div>
                <div class="user-info-cont">
                  <div class="user-info-name">{{name}}</div>
                  <div>{{role}}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <el-carousel :interval="2000" type="card" height="500px">
            <el-carousel-item v-for="item in 3" :key="item">
            </el-carousel-item>
          </el-carousel>
        </el-card>

      </el-col>
    </el-row>

  </div>

</template>

<script>

  export default {
    name: 'home',

    components: {
    },
    head () {
      return {
        title: '首页',
    }},

    data() {
      return {
        imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        name: '',
      }
    },
    methods: {
    },
    mounted(){
      this.name=localStorage.getItem('ms_username')
    },
    computed: {
      role() {
        return this.name === 'root' ? '超级管理员' : '普通用户';
      }
    }
  }

</script>


<style scoped>

  .el-carousel__item:nth-child(3) {
    background-image: url('../../static/img/smartlux3.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .el-carousel__item:nth-child(4) {
    background-image: url('../../static/img/smartlux5.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .el-carousel__item:nth-child(5) {
    background-image: url('../../static/img/smartlux7.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
  }
  .user-avator img{
    width: 100%;
    height: 100%;
  }
  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

</style>
