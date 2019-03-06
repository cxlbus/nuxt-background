<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324155"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router collapse-transition>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
            </template>

            <template v-for="submenu in item.subs">
              <template v-if="submenu.subs">
                <el-submenu :index="submenu.index" :key="submenu.index">
                  <template slot="title">
                    <i :class="submenu.icon"></i><span slot="title">{{submenu.title}}</span>
                  </template>
                  <template v-for="submenu_submenu in submenu.subs">
                    <el-menu-item :index="submenu_submenu.index" :key="submenu_submenu.index">
                      <i :class="submenu_submenu.icon"></i><span slot="title">{{submenu_submenu.title}}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="submenu.index" :key="submenu.index">
                  <i :class="submenu.icon"></i><span slot="title">{{submenu.title}}</span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>

      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from './bus'

  export default {
    data() {
      return {
        collapse: false,
        items: []
      }
    },
    beforeCreate(){
      console.log(2)
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '')
      }
    },
    mounted() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg
      })
      this.getData()

    },
    methods: {
      getData() {
        const data = localStorage.getItem('role').split(',')
        let items = this.$store.state.sidebar
        let a = data
        let tinjia = function(e) {
          let add = function(e) {
            let arr = new Array()
            a.forEach((el, i) => {
              for (let h = 0; h < e.length; h++) {
                if (Number(el) ==e[h].id) {
                  let obj = new Object()
                  obj.id = e[h].id
                  obj.icon = e[h].icon
                  obj.index = e[h].index
                  obj.title = e[h].title
                  if (e[h].subs) {
                    obj.subs = add(e[h].subs)
                  }
                  arr.push(obj)
                }
              }
            })
            return arr
          }
          return add(e)

        }
        this.items = tinjia(items)
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .icon-cangkumingcheng {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
