<template>
    <layout class="body">
        <!-- <router-view></router-view> -->
    </layout>
</template>

<script>
import Layout from "@manage/component/Layout";

export default {
    name: "App",
    components: {
        Layout
    }
};
</script>

<style lang="less">
// @import (reference) 可以使用里面的变量
// ubuntu 系统导入less 要使用 ～@manage，别名要添加～
@import '~@manage/less/reset';
@import '~@manage/less/common';



</style>
