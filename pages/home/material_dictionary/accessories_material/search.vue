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
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
              <i class="el-icon-edit"
                 @click="onRoutes(scope.$index,scope.row)"></i>
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

  </div>
</template>

<script>
  export default {
    name: 'orderProduction',
    inject: ['reload'],
    async asyncData(context){
    },
    data() {
      return {
        find_title: -1,
        is_show: process.env.NODE_ENV === 'development',
        tableData: [],
        cur_page: 1,
        loading:true,
        cur_page_num: 10,
        total: 0,
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
        url: '/la/material/curtain/get_all',//获取窗帘物料列表
      }
    },
    mounted() {
      this.dealer_id=localStorage.getItem('id')
      this.getData()
    },
    computed: {
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
        let data = {
          'dealer_id': this.dealer_id,
          'order_number': '',
          'order_status': [1101],
          'order_pay_status': this.select_cate_pay,
          'page_num': this.cur_page - 1,
          'page_size': '10'
        }
        let tableData={
          "code": "200",
          "msg": "请求成功!",
          "time": "2017-06-11T08:40:51.620Z",
          "count": 2,
          "data": [
            {
              "id": "1",
              "material_code": "ALQZ000001",
              "main_class": "AL",
              "series": "MURANO WH",
              "color": "White",
              "supplier": "QZ",
              "purchase_code": "BL201",
              "material_desc": "m ALTERNATED BL2 SERIES  WHITE",
              "material_width": "3.0",
              "head": "K006",
              "SKU": "1",
              "SPU": "5",
              "len": "1.2",
              "width": "0.5",
              "height": "0.2",
              "MOQ": "Hello, world!",
              "loss_factor": "0.91",
              "material_status": "``",
              "cutting_direction": "1",
              "valid": "Y"
            },
            {
              "id": "2",
              "material_code": "ALQZ000001",
              "main_class": "AL",
              "series": "MURANO WH",
              "color": "White",
              "supplier": "QZ",
              "purchase_code": "BL201",
              "material_desc": "m ALTERNATED BL2 SERIES  WHITE",
              "material_width": "3.0",
              "head": "K006",
              "SKU": "1",
              "SPU": "5",
              "len": "1.2",
              "width": "0.5",
              "height": "0.2",
              "MOQ": "Hello, world!",
              "loss_factor": "0.91",
              "material_status": "``",
              "cutting_direction": "1",
              "valid": "Y"
            }
          ]
        }
        this.total=tableData.count
        this.tableData=tableData.data
        setTimeout(()=> {
          this.loading=false
        },500)
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
      },
      //显示详情
      onRoutes(index, row) {
        const item = this.tableData[index]
        this.$router.push({
          name: 'home-material_dictionary-accessories_material-details',
          query: { id: item.id, permissions: 2, }
        })
      },



    },
    watch: {
      'value8': function(val, oldval) {
        this.getData()
      },
      '$route': function(val, old) {

      },
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
