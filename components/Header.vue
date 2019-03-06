<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo" v-text="$t('message.header_title')"></div>
    <div class="header-right">
      <div class="header-user-con">

        <div class="btn-lang" @click="changeLocale">
          <span>中文</span>
          <el-tooltip effect="dark" :content="lang?`English`:`中文`" placement="bottom">
            <i class="el-icon-sort"></i>
          </el-tooltip>
          <span>en</span>
        </div>
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark"
                      :content="fullscreen?`${$t('label_cancel_full_screen')}`:`${$t('label_full_screen')}`"
                      placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">

          <i class="el-icon-bell"></i>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator"><img :src="src_img"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <!--<a href="http://chenxiaolei.top/" target="_blank">-->
            <!--<el-dropdown-item>关于作者</el-dropdown-item>-->
            <!--</a>-->
            <el-dropdown-item divided command="loginout">{{$t('btn_login')}}{{$t('btn_exit')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from '../components/bus'

  export default {
    inject: ['reload'],
    asyncData(){

    },
    data() {

      return {
        url_test: '/login_after/staff/password/modify',
        url1: '/login_after/code/get_code_table',
        is_show: process.env.NODE_ENV === 'development',
        collapse: false,
        fullscreen: false,
        lang: false,
        name: 'chenxiaolei',
        username: '',
        header_title: this.$t('message.header_title'),
        src_img: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'

      }
    },
    computed: {},
    mounted() {
      let username = localStorage.getItem('ms_username')
      this.username = username ? username : this.name
    },
    methods: {
      /*中英文切换*/
      changeLocale() {
        this.$confirm(this.$t('layer.toggle'), this.$t('layer.tips'), {
          confirmButtonText: this.$t('button.ok'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        }).then(() => {
          let locale = this.$i18n.locale
          locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
          localStorage.setItem('lang', this.$i18n.locale)
          this.$store.commit('SET_LANG',locale)
          this.$store.commit('SET_SIDEBAR')
          let da = {
            'code': '',
            'label_code': '',
            'language': localStorage.getItem('lang')
          }
          this.lang = !this.lang
        }).catch(() => {
          this.$message({
            type: 'info',
            message: `${this.$t('layer.info')}`
          })
        })
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if (command == 'loginout') {
          this.init()
          this.$store.commit('SET_KEY','smartMI')
          this.$store.commit('SET_TOKEN','8eea162a4fbe0d4b4a92485d80a47bc4')
          this.$router.replace('/login')
        }
      },
      init() {
        localStorage.removeItem('id')
        localStorage.removeItem('phone')
        localStorage.removeItem('ms_username')
        localStorage.removeItem('pwd')
        localStorage.removeItem('token')
        localStorage.removeItem('unit')
        localStorage.removeItem('is_mobile')
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse
        bus.$emit('collapse', this.collapse)
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage()
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: white;
  }
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 60px;
    line-height: 70px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .btn-lang {
    margin-right: 10px;
    line-height: 70px;
  }

  .btn-lang span {
    font-size: 12px;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell, .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 70px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
