<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i>{{$t('label_order')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('sidebar_add_order')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="start"
          end-placeholder="end"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2" class='mr10'>
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search">{{$t('btn_search')}}</el-button>
        <el-button type="primary" icon="search" @click="add_new_shutter">{{$t('item_createOrder')}}</el-button>
      </div>

      <el-table :data="tableData" border style="width: 100%" ref="multipleTable" class="self_i"
                v-loading="loading"
                row-class-name
      >
        <el-table-column prop="id" label="ID" width="50" v-if="is_show">
        </el-table-column>
        <el-table-column prop="material_code" label="材料编码" width="120">
        </el-table-column>
        <el-table-column label="材料描述" width="270">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.material_desc" placement="top-start">
              <span class="self_el_table">
                {{scope.row.material_desc}}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="190">
        </el-table-column>
        <el-table-column width="250">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="$t('label_orderEdit')" placement="top-start">
              <i class="el-icon-edit"
                 @click="onRoutes(scope.$index, scope.row)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btn_delete')" placement="top-start">
              <i class="el-icon-delete" style="color: #dd6161;"
                 @click="handle_methods(scope.$index, scope.row,'删除')"></i>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 添加新的卷帘物料 -->
    <el-dialog title="添加新的卷帘物料" :visible.sync="addVisible" width="60%">
      <el-form ref="form" :model="form" label-width="25%">
        <el-form-item label="ID" v-if="is_show">
          <el-input v-model="form.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="材料编码" >
          <el-input v-model="form.material_code" ></el-input>
        </el-form-item>
        <el-form-item label="材料描述" >
          <el-input v-model="form.material_desc" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible=false">{{$t('btn_cancel')}}</el-button>
                <el-button type="primary" @click="add_to_shutter">{{$t('btn_ok')}}</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'curtainMaterialModify',
    inject: ['reload'],
    async asyncData(context){
    },
    data() {
      return {
        find_title: -1,
        is_show: process.env.NODE_ENV === 'development',
        dealer_id: '',
        tableData: [],
        cur_page: 1,
        loading:true,
        cur_page_num: 10,
        total: 0,
        select_cate: [],
        select_cate_pay: '',
        order_base: {
          'id': '',
          'order_number': ''
        },
        orderCode: '',
        is_search: false,
        pickerOptions2: {
          shortcuts: [{
            text: 'latest week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value7: '',
        idx: -1,
        addVisible:false,
        form:{},
        url: '/login_after/order/orders',//获取订单列表
        url1: '/la/material/roll_shade/',//删除订单
        url2: '/login_after/order/copy',//复制订单
        url3: '/login_after/order/new',//创建新订单
        url4: '/login_after/order/modify'//修改订单
      }
    },
    mounted() {
      this.dealer_id=localStorage.getItem('id')
      this.getData()
    },
    computed: {
      data_after() {
        return this.tableData.filter((d) => {
          let is_del = false
          d.orderTime = new Date(d.orderTime).Format('yyyy-MM-dd hh:mm')
          return d
        })
      },
      value8() {
        if (this.value7) {
          return this.value7
        } else {
          this.value7 = ''
          return this.value7
        }
      }
    },
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
          'count': 2,
          'data': [
            {
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
            },
            {
              'id': '2',
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
          ]
        }
        this.total = tableData.count
        this.tableData = tableData.data
        setTimeout(() => {
          this.loading = false
        }, 500)

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
      /*新增卷帘物料*/
      add_new_shutter() {
        this.addVisible=true
        this.form={}
      },
      add_to_shutter(){
        let data=this.form
        this.addVisible=false
        // this.$axios.post(this.url, data).then((res) => {
        // this.addVisible=false
        //   })
        // })
      },

      /*删除单个数据*/
      del_Data(order_id) {
        // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
        // console.log('chanchu'+order_id)
      },
      search() {
        this.is_search = true
        this.getData()
      },
      onRoutes(index, row) {
        const item = this.tableData[index]
        this.$router.push({
          name: 'home-material_dictionary-curtain_material-details',
          query: { id: item.id, permissions: 1, }
        })
      },
      handle_methods(index, row, v) {
        const item = this.tableData[index]
        if (v === '删除') {
          this.$axios.post(this.url1, { id: item.id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(`已经删除了${item.order_number}`)
              this.getData()
            }
          })
        } else if (v === '复制') {
          let a = {
            'dealer_id': this.dealer_id,
            'order_id': item.id,
            'order_number': item.order_number,
            'description': this.$t('label_orderDesc')
          }
          this.$axios.post(this.url2, a).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(`已经复制了${item.order_number}`)
              this.getData()
            }
          })
        } else if (v === '终止') {
          let a = {
            'dealer_id': this.dealer_id,
            'id': item.id,
            'order_number': item.order_number,
            'status': '11098'
          }
          this.$axios.post(this.url4, a).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(`已经终止了${item.order_number}`)
              this.getData()
            }
          })
        }
      }
    },
    watch: {
      'value8': function(val, oldval) {
        this.getData()
      },
      '$route': function(val, old) {

      },
      'select_cate': function(val, old) {
        this.getData()
      },
      'select_cate_pay': function(val, old) {
        this.getData()
      }
    }

  }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .del-dialog-cnt {
    font-size: 16px;
    text-align: center
  }


</style>
