<template>
	<el-container>
		<el-header class="header clearfix">
			<div class="inline-block title">
				轮胎管理系统
			</div>
			<div class="pull-left">

			</div>

			<!-- <div><el-button type="primary" icon="el-icon-d-arrow-left" circle></el-button></div> -->
			<div class="pull-right">
				<el-dropdown class="dropdown-link">
					<span>
						<span class="inline-block bg-cover user-image"></span>
						<span class="inline-block">用户名</span>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>

		</el-header>
		<el-container class="content">
			<el-aside width="200px" class="navbar">
				<el-menu :default-openeds="['1', '3']" background-color="#eff1f6">
					<el-menu-item index="1">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>

				</el-menu>
			</el-aside>

			<el-main class="main">
				<div class="main-header">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>
							<a href="/">活动管理</a>
						</el-breadcrumb-item>
						<el-breadcrumb-item>活动列表</el-breadcrumb-item>
						<el-breadcrumb-item>活动详情</el-breadcrumb-item>
					</el-breadcrumb>
				</div>

				<div class="main-body">
					<el-row class="table">
						<el-table border style="width: 100%">
							<el-table-column prop="date" label="日期" width="180">
							</el-table-column>
							<el-table-column prop="name" label="姓名" width="180">
							</el-table-column>
							<el-table-column prop="address" label="地址">
							</el-table-column>
						</el-table>
					</el-row>

					<el-row class="pager">
						<el-pagination background layout="prev, pager, next" :total="1000">
						</el-pagination>
					</el-row>
				</div>

				<el-footer class="main-footer">Copy</el-footer>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
    name: "Layout"
};
</script>

<style lang="less">
@header-color: #409eff;
@nav-color: #eff1f6;

.header {
    border-bottom: @header-color;
    background-color: @header-color;
    color: white;
    padding-left: 0;

    .title {
        width: 200px;
        font-size: 25px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, 0.06);
        text-align: center;
    }

    .dropdown-link {
        line-height: 60px;
        font-size: 16px;
        color: white;
        cursor: pointer;
        padding: 0 6px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.03);
        }
    }

    .user-image {
        background-image: url(../image/user_image.png);
        height: 40px;
        width: 40px;
        vertical-align: middle;
        margin-right: 4px;
        border-radius: 50%;
    }
}

.content {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;

    .main {
        padding: 0;
        position: relative;

        .main-header,
        .main-body {
            padding: 20px;
        }

        .main-header {
            background-color: #e4e4e4;
        }

        .main-body {
            .table {
                padding-bottom: 16px;
            }

            .pager {
                text-align: center;
            }
        }

        .main-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
			line-height: 40px;
			height: 40px !important;
            text-align: center;
            background-color: #e4e4e4;
        }
    }
}

.navbar {
    background-color: @nav-color;
	border: 1px solid @nav-color;
	
	.el-menu-item.is-active{
		border-right: 3px solid @header-color;
		background-color: rgba(0, 0, 0, 0.06) !important;
	}
}
</style>