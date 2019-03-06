<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> {{$t('staff_add.Title')}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t('staff_add.Sub_Title')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
            </div>
            <template>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="(item,i) in tableDatarole"
                        :key="item.id"
                        :label="item.role"
                        :value="i">
                    </el-option>
                </el-select>
            </template>
            <el-button @click="resetChecked">清空</el-button>
            <el-button @click="getCheckedKeys" type="primary">提交</el-button>
            <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                default-expand-all
                ref="tree"
                :props="defaultProps">
            </el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
          let data2=this.$store.state.sidebar
            return {
                url: '/la/staff/get_all_role',
                url1: '/la/staff/modify_role_permission',
                url2: '/la/staff/get_role_permission',
                tableDatarole: [],
                value: '',
                data2: data2,
                defaultProps: {
                    children: 'subs',
                    label: 'title'
                }
            };
        },
        mounted() {
            this.getDatarole_all()
        },
        methods: {
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                let a = {
                    "id": this.tableDatarole[this.value].id,
                    "role":this.tableDatarole[this.value].role,
                    "permission": this.$refs.tree.getCheckedKeys().join(',')
                }
                this.$axios.post(this.url1, a).then((res) => {
                    if(res.data.code==200){
                        this.$message.success(`修改成功`);
                    }
                })
            },
            /*查询所有角色*/
            getDatarole_all() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                this.$axios.post(this.url, {
                    data: 1
                }).then((res) => {
                    this.tableDatarole = res.data.data;
                })
            },
            /*查询指定角色的权限*/
            getpermission(data) {
                this.$axios.post(this.url2, {"id":data}).then((res) => {
                  let a=res.data.data['permission'].split(',')
                    this.$refs.tree.setCheckedKeys([])
                    a.forEach( (e) =>{
                        this.$refs.tree.setChecked(e,true);
                    })

                })
            },
            resetChecked() {
                if (this.tableDatarole[this.value].id == '2') {
                    this.$refs.tree.setCheckedKeys([9]);
                } else {
                    this.$refs.tree.setCheckedKeys([]);
                }

            },
        },
        watch: {
            'value': function (val, oldval) {
                let a=this.tableDatarole[val].id
                if (a == '2') {
                    this.getpermission(a)
                    this.data2[1].subs[2].disabled = true
                } else {
                    this.data2[1].subs[2].disabled = false
                    this.getpermission(a)
                }
            }
        }
    }
</script>
