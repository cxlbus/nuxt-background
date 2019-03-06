<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i>{{$t('label_order')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sidebar_add_order')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-for="(value,key) in form" :key="key" class="text item">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          {{key}}:
          <el-input v-model.trim="form[key]" :readonly="permissions===2" ></el-input>
        </div>
      </el-col>
    </div>
    <div style="clear:both">

    </div>
    <template v-if="permissions===1">
      <div>
        <el-button type="primary" @click="edit_to_shutter">{{$t('btn_ok')}}</el-button>
      </div>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'curtainMaterialDetails',
    inject: ['reload'],
    async asyncData(context) {
    },
    data() {
      return {
        id: this.$route.query.id,
        permissions: this.$route.query.permissions,
        is_show: process.env.NODE_ENV === 'development',
        dealer_id: '',
        loading: true,
        form: {},
        url: '/la/material/roll_shade'//获取卷帘列表
      }
    },
    mounted() {
      this.dealer_id = localStorage.getItem('id')
      this.getData()
    },
    beforeDestroy(){

    },
    computed: {},
    methods: {
      // 分页导航
      handleCurrentChange(val) {
        this.cur_page = val
        this.getData()
      },
      // 获取 easy-mock 的模拟数据
      getData() {

        let tableData = {
          'code': '200',
          'msg': '请求成功!',
          'time': '2017-06-11T08:40:51.620Z',
          'data': {
            'id': '1',
            'material_code': 'ALQZ000001',
            'main_class': 'AL',
            'series': 'MURANO WH',
            'color': 'White',
            'supplier': 'QZ',
            'purchase_code': 'BL201',
            'material_desc': 'm ALTERNATED BL2 SERIES  WHITE',
            'material_width': '3.0',
            'head': 'K006',
            'SKU': '1',
            'SPU': '5',
            'len': '1.2',
            'width': '0.5',
            'height': '0.2',
            'MOQ': 'Hello, world!',
            'loss_factor': '0.91',
            'material_status': '``',
            'cutting_direction': '1',
            'valance_open_roll': 'Y/N',
            'valance_pvc': 'Y/N',
            'valance_3_cassettle_f': 'Y/N',
            'valance_3_cassettle': 'Y/N',
            'valance_35_cassettle_f': 'Y/N',
            'valance_35_cassettle': 'Y/N',
            'valance_3_fasica': 'Y/N',
            'valance_4_fasica': 'Y/N',
            'flat_bar': 'Y/N',
            'tube_1_1_2': 'Y/N',
            'tube_1_3_4': 'Y/N',
            'side_return': 'Y/N',
            'valid': 'Y'
          }
        }
        this.form = tableData.data

        // this.$axios.post(this.url, data).then((res) => {
        //   this.loading=false
        //   this.total = res.data.data_total
        //   this.tableData = res.data.data.filter((d) => {
        //     d.create_time = new Date(d.create_time).Format('yyyy-MM-dd hh:mm:ss')
        //     d.delivery_time = new Date(d.delivery_time).Format('yyyy-MM-dd hh:mm:ss')
        //     return d
        //   })
        // })
      },
      edit_to_shutter() {
        this.$message.success('修改成功')
        console.log(this.form)
        // this.$axios.post(this.url, data).then((res) => {
        //   this.loading=false
        //   this.total = res.data.data_total
        //   this.tableData = res.data.data.filter((d) => {
        //     d.create_time = new Date(d.create_time).Format('yyyy-MM-dd hh:mm:ss')
        //     d.delivery_time = new Date(d.delivery_time).Format('yyyy-MM-dd hh:mm:ss')
        //     return d
        //   })
        // })
      },
      search() {
        this.is_search = true
        this.getData()
      }
    },
    watch: {}

  }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }


</style>
