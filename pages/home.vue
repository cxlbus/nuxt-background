<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content" v-if="isRouterAlive">
        <nuxt-child/>
      </div>
      <div class="footer">
        <p>Pro </p>
        <p>
          Copyright 2018 smartlux chen
        </p>

      </div>
    </div>
  </div>
</template>

<script>
  import vHead from '@/components/Header.vue'
  import vSidebar from '@/components/Sidebar.vue'
  import bus from '@/components/bus'

  export default {
    asyncData(context){
      console.log('进入了home。vue')

    },
    data() {
      return {
        collapse: false,
        isRouterAlive: true,
        xs: 768
      }
    },
    provide() { // 注册一个方法
      return {
        reload: this.reload
      }
    },
    components: {
      vHead, vSidebar
    },
    mounted() {
      let _this = this
      const clientWidth = window.innerWidth
      localStorage.setItem('is_mobile', clientWidth <= _this.xs)
      this.$store.commit('IS_MOBILE', {
        is_mobile: clientWidth <= _this.xs
      })
      window.onresize = function() {
        const clientWidth = window.innerWidth
        localStorage.setItem('is_mobile', clientWidth <= _this.xs)
        _this.$store.commit('IS_MOBILE', {
          is_mobile: clientWidth <= _this.xs
        })
      }
      bus.$on('collapse', msg => {
        this.collapse = msg
      })

    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>
<style scoped>
  div.footer {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 5px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
  }
</style>
