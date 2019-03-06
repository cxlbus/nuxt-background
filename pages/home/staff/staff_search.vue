<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> {{$t('staff_search.Title')}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('staff_search.Sub_Title')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model.trim="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">{{$t('staff_search.Search')}}</el-button>
            </div>
            <el-table :data="this.tableData" border style="width: 100%">
                <el-table-column prop="id" :label="$t('staff_search.StaffId')" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="account" :label="$t('staff_search.User')" width="180">
                </el-table-column>
                <el-table-column prop="phone" :label="$t('staff_search.Telephone')" width="200">
                </el-table-column>
                <el-table-column prop="email" :label="$t('staff_search.Email')" width="200">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'basetable',
        data() {
            return {
                count: 0,
                url: '/la/staff/get_all',
                is_show: process.env.NODE_ENV === 'development',
                tableData: [],
                select_word: '',
                is_search: false,
            }
        },

        mounted() {
          this.getData();
        },
        computed: {},
        methods: {
            // 获取用户列表
            getData() {
                this.$axios.post(this.url, {
                    id: this.id,
                }).then((res) => {
                    this.tableData = res.data.data;
                })
            },
            search() {
                this.is_search = true;
                this.getData()
            },
        },
        watch: {
            "$route": function (val, oldval) {
                if (val.path == '/staff_search') {
                    this.getData()
                }
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
