<!-- 页面模版 -->
<template>
    <div>
        <el-steps :active="order_status" process-status="finish" finish-status="success">
            <el-step title="新订单" description="等待发货"></el-step>
            <el-step title="已发货" description="等待收货"></el-step>
            <el-step title="已收货" description="订单完成"></el-step>
        </el-steps>
    </div>
</template>
<script>
    export default {
        data: () => ({
        }),
        props: ['order_status'],
        created() {
        },
        computed: {

        },
        mounted() {

        },
        methods: {
            ready: function () {

            }
        }
    }
</script>
<style>
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display: none
    }
</style>
