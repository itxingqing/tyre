<template>
    <div>

        <el-dialog :visible.sync="dialogTableVisible">
            <add>
                addddd
            </add>
        </el-dialog>
        <edit>
            <el-dialog :visible.sync="dialogTableVisible">
                <add>
                    addddd
                </add>
            </el-dialog>
        </edit>
    </div>
</template>

<script>
import Add from "./add";
import Edit from "./edit";
export default {
    name: "type",
    data() {
        return {
            dialogTableVisible: false
        };
    },

    components: {
        Add,
        Edit
    },

    computed: {},

    mounted: () => {},

    methods: {}
};
</script>
<style lang='less' scoped>
</style>