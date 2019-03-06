<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> {{$t('staff_search.Title')}}</el-breadcrumb-item>
                <el-breadcrumb-item>修改员工信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model.trim="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">{{$t('staff_search.Search')}}</el-button>
                <el-button type="primary" icon="search" @click="addEdit">添加新员工</el-button>
            </div>
            <el-table :data="this.tableData" border style="width: 100%">
                <el-table-column prop="id" :label="$t('staff_search.StaffId')" width="80" v-if="is_show">
                </el-table-column>
                <el-table-column prop="account" :label="$t('staff_search.User')" width="100">
                </el-table-column>
                <el-table-column prop="phone" :label="$t('staff_search.Telephone')" width="120">
                </el-table-column>
                <el-table-column prop="email" :label="$t('staff_search.Email')" width="200">
                </el-table-column>
                <el-table-column :label="this.$t('staff_search.Operation')" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                            {{$t('staff_search.Edit')}}
                        </el-button>
                        <el-button size="small"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)"
                        >{{$t('staff_search.Modify_roles')}}
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新建弹出框 -->
        <el-dialog title="添加员工" :visible.sync="addVisible" width="40%">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="this.$t('staff_add.User')" prop="account">
                    <el-input v-model.number="ruleForm2.account" ></el-input>
                </el-form-item>
                <el-form-item :label="this.$t('staff_add.Password')" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"  ></el-input>
                </el-form-item>
                <el-form-item :label="this.$t('staff_add.Secound')" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item :label="this.$t('staff_add.Telephone')" prop="phone">
                    <el-input v-model.number="ruleForm2.phone" auto-complete='phone' ></el-input>
                </el-form-item>
                <el-form-item :label="this.$t('staff_add.Email')" prop="email">
                    <el-input v-model.number="ruleForm2.email"  auto-complete="email" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm2')">{{$t('staff_search.Cancel')}}</el-button>
                <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('staff_search.Ok')}}</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog :title="$t('staff_search.Edit')" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item :label="$t('staff_search.StaffId')" v-if="is_show">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item :label="$t('staff_search.User')">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item :label="$t('staff_search.Telephone')">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('staff_search.Email')">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">{{$t('staff_search.Cancel')}}</el-button>
                <el-button type="primary" @click="saveEdit">{{$t('staff_search.Ok')}}</el-button>
            </span>
        </el-dialog>

        <!-- 修改角色的提示框 -->
        <el-dialog :title="$t('staff_search.Modify_roles')" :visible.sync="delVisible" width="600px" center
                   @close='quxiaomodifyrol'>
            <el-table :data="this.tableDatarole" border style="width: 100%;" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="角色ID" width="200" v-if="is_show">
                </el-table-column>
                <el-table-column prop="role" label="角色名称" width="200">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="quxiaomodifyrol">{{$t('staff_search.Cancel')}}</el-button>
                <el-button type="primary" @click="modifyRow">{{$t('staff_search.Ok')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'basetable',
        data() {

            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.password !== '') {
                        this.$refs.ruleForm2.validateField('password');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                count: 0,
                id: localStorage.getItem('id'),
                url: '/la/staff/get_all',
                url2: '/la/staff/get_role',
                url3: '/la/staff/modify',
                url4: '/la/staff/modify_role',
                url5: '/la/staff/get_all_role',
                url6: '/la/staff/add',
                is_show: process.env.NODE_ENV === 'development',
                tableData: [],
                tableDatarole: [],
                Selected_default: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                del_list: [],
                is_search: false,
                addVisible:false,
                editVisible: false,
                delVisible: false,
                ruleForm2: {
                    account:'',
                    phone:'',
                    pass: '',
                    password: '',
                    email: ''
                },
                old_password:"",
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    account: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    email: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                },
                formrole: {
                    id: '',
                    staffType: '',
                },
                form: {
                    id: '',
                    phone: '',
                    email: '',
                    account: '',
                },
                idx: -1
            }
        },

        mounted() {
          this.getData();
          this.getDatarole_all();
        },
        computed: {},
        methods: {
            //获取默认选中
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            // 获取用户列表
            getData() {
                this.$axios.post(this.url, {
                    id: this.id,
                }).then((res) => {
                    this.tableData = res.data.data;
                })
            },
            //获取已有角色
            getDatarole(data) {
                this.$axios.post(this.url2, {id: data}).then((res) => {
                    let newdata = this.tableDatarole.filter(function (item, index) {
                        for (let i = 0; i < res.data.data.role_data.length; i++) {
                            if (res.data.data.role_data[i].id == item.id) {
                                return item
                            }
                        }
                    })
                    this.Selected_default = newdata
                })
            },
            /*查询所有角色*/
            getDatarole_all(data) {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                this.$axios.post(this.url5, {
                    data: this.id
                }).then((res) => {
                    this.tableDatarole = res.data.data;
                })
            },
            //
            search() {
                this.is_search = true;
                this.getData()
            },
            //添加按钮
            addEdit() {
                this.addVisible = true;
            },
              //确认添加员工
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data={
                                account:this.ruleForm2.account,
                                phone:this.ruleForm2.phone,
                                pass: this.ruleForm2.pass,

                                password: this.$crypto().md5(this.ruleForm2.password),

                                email: this.ruleForm2.email
                        }

                        this.$axios.post(this.url6,data).then((res) => {
                            if (res.data.code == 200) {
                                this.$refs['ruleForm2'].resetFields();
                                this.$message.success('上传成功');
                                this.getData();
                                this.addVisible=false
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置按钮
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.addVisible=false
            },
            //编辑按钮
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = item
                this.editVisible = true;
            },

            //修改角色按钮
            handleDelete(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.formrole = item
                this.getDatarole(item.id)
                this.delVisible = true;

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 保存编辑基本信息
            saveEdit() {
                let dataJson = this.form
                let _this = this
                if (this.form.password) {
                    dataJson.password = this.$crypto().md5( _this.form.password)
                }
                this.$axios.post(this.url3, {data: dataJson}).then((res) => {
                    if (res.data.code == 200) {
                        this.editVisible = false;
                        this.getData();
                    }
                })
            },
            // 确定修改角色
            modifyRow() {
                let dataJson = {
                    id: this.formrole.id,
                    role_data: this.multipleSelection
                }
                this.$axios.post(this.url4, dataJson).then((res) => {
                    if (res.data.code == 200) {
                        this.$refs.multipleTable.clearSelection();
                        this.multipleSelection = []
                        this.delVisible = false;
                    }
                })

            },
            // 取消修改角色
            quxiaomodifyrol() {
                this.$refs.multipleTable.clearSelection();
                this.multipleSelection = []
                this.Selected_default = []
                this.delVisible = false
            },
        },
        watch: {
            "Selected_default": function (val, oldval) {
                let _this = this
                if (val) {
                    setTimeout(function (e) {
                        _this.toggleSelection(val)
                    }, 1)
                }
            },
            "$route":function (val,oldval) {

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
