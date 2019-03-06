import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    locales: ['en', 'zh'],
    locale: 'en',
    is_mobile:false,
    user_info:{tag:'标记'},
    code:{},
    key:'smartMI',
    token:'8eea162a4fbe0d4b4a92485d80a47bc4',
    height:'',
    sidebar:[
      {
        icon: 'el-icon-setting',
        index: '/home/system',
        title: "首页",
        id: 1001,
        show: true,
      },
      {
        icon: 'el-icon-service',
        index: '员工管理',
        title: '员工管理',
        show: true,
        id: 1002,
        subs: [
          {
            id: 2001,
            index: '/home/staff/staff_search',
            title: '员工查询',
            show: true,
          },
          {
            id: 2011,
            index: '/home/staff/staff_modify',
            title: '修改员工'
          },
          {
            id: 2002,
            index: '/home/staff/allocate',
            title: '角色管理'
          },
        ]
      },
      {
        icon: 'el-icon-rank',
        index: '物料字典',
        title: '物料字典',
        show: true,
        id: 1003,
        subs: [
          {
            id: 2003,
            index: "卷帘物料",
            title: '卷帘物料',
            subs: [{
              id: 3001,
              index: '/home/material_dictionary/shutter_material/search',
              title: '查询卷帘物料',
            },{
              id: 3002,
              index: '/home/material_dictionary/shutter_material/modify',
              title: '修改卷帘物料',
            }]
          },
          {
            id: 2004,
            index: '窗帘物料',
            title: '窗帘物料',
            subs: [{
              id: 3003,
              index: '/home/material_dictionary/curtain_material/search',
              title: '查询卷帘物料',
            },{
              id: 3004,
              index: '/home/material_dictionary/curtain_material/modify',
              title: '修改卷帘物料',
            }]
          },
          {
            id: 2005,
            index: '配件',
            title: '配件',
            subs: [{
              id: 3005,
              index: '/home/material_dictionary/accessories_material/search',
              title: '查询卷帘物料',
            },{
              id: 3006,
              index: '/home/material_dictionary/accessories_material/modify',
              title: '修改卷帘物料',
            }]
          },
        ]
      },
      {
        icon: 'el-icon-edit-outline',
        index: '仓储模块',
        title: '仓储模块',
        id: 1004,
        subs: [
          {
            id: 2006,
            index: '仓储管理',
            title: '仓储管理',
            subs: [
              { id: 3007,
              index: '/home/storage_module/warehouse_management/search',
              title: '查询仓储管理',
              },
              { id: 3008,
              index: '/home/storage_module/warehouse_management/modify',
              title: '修改仓储管理',}
              ]
          },
          {
            id: 2007,
            index: '卷帘物料管理',
            title: '卷帘物料管理',
            subs: [
              { id: 3009,
                index: '/home/storage_module/shutter_material_management/search',
                title: '查询卷帘物料管理',},
              { id: 3010,
                index: '/home/storage_module/shutter_material_management/modify',
                title: '修改卷帘物料管理',
              }
            ]
          },
          {
            id: 2008,
            index: '窗帘物料管理',
            title: '窗帘物料管理',
            subs: [
              { id: 3011,
                index: '/home/storage_module/curtain_material_management/search',
                title: '查询窗帘物料管理',},
              { id: 3012,
                index: '/home/storage_module/curtain_material_management/modify',
                title: '修改窗帘物料管理',}
            ]
          },
          {
            id: 2009,
            index: '配件物料管理',
            title: '配件物料管理',
            subs: [
              { id: 3013,
                index: '/home/storage_module/accessories_management/search',
                title: '查询配件物料管理',},
              { id: 3014,
                index: '/home/storage_module/accessories_management/modify',
                title: '修改配件物料管理',}
            ]
          },
          {
            id: 2010,
            index: '入库单管理',
            title: '入库单管理',
            subs: [
              { id: 3015,
                index: '/home/storage_module/inbound_order_management/search',
                title: '查询入库单管理',},
              { id: 3016,
                index: '/home/storage_module/inbound_order_management/modify',
                title: '修改入库单管理',
              }
            ]
          },
        ]
      },
    ]
  },
  mutations: {
    SET_SIDEBAR(state) {
      state.sidebar=state.locale=='en'?[
        {
          icon: 'el-icon-setting',
          index: '/home/system',
          title: "sidebar_home_page",
          id: 1,
          show: true,
        },
        {
          icon: 'el-icon-service',
          index: '0',
          title: 'sidebar_administrator',
          show: true,
          id: 2,
          subs: [
            {
              id: 7,
              index: '/home/staff_search',
              title: 'sidebar_check_staff'
            },
            {
              id: 8,
              index: '/home/staff_modify',
              title: 'sidebar_modify_staff'
            },
            {
              id: 9,
              index: '/home/to_allocate',
              title: 'sidebar_allocate'
            }
          ]
        },
        {
          icon: 'el-icon-rank',
          index: '1',
          title: '/home/sidebar_dealer',
          show: true,
          id: 3,
          subs: [
            {
              id: 10,
              index: '/home/Dealers_add',
              title: 'sidebar_add_dealer'
            },
            {
              id: 11,
              index: '/home/Dealers_search',
              title: 'sidebar_search_dealer'
            }
          ]
        },
        {
          icon: 'el-icon-edit-outline',
          index: '4',
          title: 'sidebar_order',
          id: 4,
          subs: [
            {
              id: 12,
              index: '/home/order/orderlistnew',
              title: 'sidebar_add_order'
            },
            {
              id: 13,
              index: '/home/order/orderList_measured',
              title: 'sidebar_measured_order'
            },
            {
              id: 14,
              index: '/home/order/orderList_have_order',
              title: 'sidebar_have_order'
            },
            {
              id: 15,
              index: '/home/order/orderList_over',
              title: 'sidebar_completed'
            },
          ]
        },
        {
          icon: 'el-icon-location',
          index: '5',
          title: 'sidebar_address',
          id: 5,
          subs: [
            {
              id: 16,
              index: '/home/address/Address_info',
              title: 'sidebar_address_info'
            },

          ]
        },
        {
          icon: 'el-icon-star-off',
          index: '6',
          title: 'sidebar_personal_info',
          id: 6,
          subs: [
            {
              id: 17,
              index: '/home/personalinfo/personalinfoa/base_info',
              title: 'sidebar_personal_info'
            },
          ]
        },
        {
          icon: 'el-icon-star-off',
          index: '20',
          title: 'staff',
          id: 20,
          subs: [
            {
              id: 18,
              index: '/home/staff/allocate',
              title: 'staff/allocate'
            },
            {
              id: 21,
              index: '/home/staff/staff_search',
              title: 'staff/staff_search'
            },
            {
              id: 19,
              index: '/home/staff/staff_modify',
              title: 'staff/staff_modify'
            },

          ]
        },
      ]:[
        {
          icon: 'el-icon-setting',
          index: '/home/system',
          title: "nihaoaha",
          id: 1,
          show: true,
        },
          {
            icon: 'el-icon-service',
            index: '0',
            title: 'sidebar_administrator',
            show: true,
            id: 2,
            subs: [
              {
                id: 7,
                index: '/home/staff_search',
                title: 'sidebar_check_staff'
              },
              {
                id: 8,
                index: '/home/staff_modify',
                title: 'sidebar_modify_staff'
              },
              {
                id: 9,
                index: '/home/to_allocate',
                title: 'sidebar_allocate'
              }
            ]
          },
          {
            icon: 'el-icon-rank',
            index: '1',
            title: '/home/sidebar_dealer',
            show: true,
            id: 3,
            subs: [
              {
                id: 10,
                index: '/home/Dealers_add',
                title: 'sidebar_add_dealer'
              },
              {
                id: 11,
                index: '/home/Dealers_search',
                title: 'sidebar_search_dealer'
              }
            ]
          },
          {
            icon: 'el-icon-edit-outline',
            index: '4',
            title: 'sidebar_order',
            id: 4,
            subs: [
              {
                id: 12,
                index: '/home/order/orderlistnew',
                title: 'sidebar_add_order'
              },
              {
                id: 13,
                index: '/home/order/orderList_measured',
                title: 'sidebar_measured_order'
              },
              {
                id: 14,
                index: '/home/order/orderList_have_order',
                title: 'sidebar_have_order'
              },
              {
                id: 15,
                index: '/home/order/orderList_over',
                title: 'sidebar_completed'
              },
            ]
          },
          {
            icon: 'el-icon-location',
            index: '5',
            title: 'sidebar_address',
            id: 5,
            subs: [
              {
                id: 16,
                index: '/home/address/Address_info',
                title: 'sidebar_address_info'
              },

            ]
          },
          {
            icon: 'el-icon-star-off',
            index: '6',
            title: 'sidebar_personal_info',
            id: 6,
            subs: [
              {
                id: 17,
                index: '/home/personalinfo/personalinfoa/base_info',
                title: 'sidebar_personal_info'
              },
            ]
          },
          {
            icon: 'el-icon-star-off',
            index: '20',
            title: 'staff',
            id: 20,
            subs: [
              {
                id: 18,
                index: '/home/staff/allocate',
                title: 'staff/allocate'
              },
              {
                id: 21,
                index: '/home/staff/staff_search',
                title: 'staff/staff_search'
              },
              {
                id: 19,
                index: '/home/staff/staff_modify',
                title: 'staff/staff_modify'
              },

            ]
          },
        ]
    },
    SET_LANG(state, locale) {
      if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale
      }
    },
    IS_MOBILE(state,dealertable) {
      state.is_mobile=dealertable.is_mobile
    },
    SET_USER(state,user_info){
      state.user_info=user_info
    },
    SET_TOKEN(state,token){
      state.token=token
    },
    SET_KEY(state,key){
      state.key=key
    },
    SET_CODE(state,code){
      state.code=code
    },
    SET_HEIGHT(state,height){
      state.height=height
    }
  },
  actions: {}
})

export default store
