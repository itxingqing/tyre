<template>
    <div>
        <template v-for="(item, index) in menu">

            <template v-if="item.children && item.children.length">
                <el-submenu :key="item.name + index + item.url" :index="item.url">
                    <span slot="title">
                        <template v-if="item.icon">
                            <font-awesome-icon :icon="item.icon" class="icon" /> 
                        </template>
                        {{item.name}}
                    </span>
                    <menu-tree :menu="item.children"></menu-tree>
                </el-submenu>
            </template>

            <template v-if="!item.children">
                <el-menu-item :key="item.name + index + item.url" :index="item.url">
                    <template v-if="item.icon">
                        <font-awesome-icon :icon="item.icon" class="icon" /> 
                    </template>
                    {{item.name}}
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: "MenuTree",
    props: {
        menu: {
            type: Array,
            default: []
        }
    }
};
</script>
<style lang='less' scoped>
.icon {
    margin-right: 10px;
    margin-top: -2px;
}
</style>