<template>
    <div class="login-container">

        <form class="login-form">
            <div class="login-title">系统登录</div>
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
            <el-input v-model="password" type="password" placeholder="请输入用户密码"></el-input>
            <el-button type="primary" :loading="loading" @click="submitHandler">登录</el-button>
        </form>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: "",
            loading: false,

            error: {
                open: false,
                title: "错误",
                message: "错误信息"
            }
        };
    },

    methods: {
        submitHandler() {
            this.$message.error('用户或密码错误,请重试.');
        }
    }
};
</script>
<style lang='less'>
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #12afe3;

    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 35px 15px;
        background-color: white;
        border: 1px solid #d2cece;
        border-radius: 6px;
        max-width: 350px;

        input,
        div {
            margin-bottom: 10px;
        }

        button {
            width: 100%;
        }

        .login-title {
            text-align: center;
            font-size: 1.2em;
        }
    }
}
</style>