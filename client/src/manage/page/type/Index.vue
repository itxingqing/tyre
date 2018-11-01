<template>
    <div>
        <el-row class="table-container">
            <el-table border stripe :data="tdata" style="width: 100%" :height="tabelHeight">
                <el-table-column prop="date" label="类型">
                </el-table-column>
                <el-table-column prop="name" label="中文名称">
                </el-table-column>
                <el-table-column prop="name" label="英文名称">
                </el-table-column>
            </el-table>
        </el-row>

        <el-row class="pager">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </el-row>
        

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
import TabelBase from '@manage/page/base/TabelBase'
import Add from "./Add";
import Edit from "./Edit";
export default {
    name: "type",
    props: ["bodyHeight"],
    mixins:[TabelBase],

    data() {
        return {
            tdata: [],
            pager: [],
            dialogTableVisible: false
        };
    },

    components: {
        Add,
        Edit
    },

    computed: {
    },

    mounted: () => {},

    methods: {}
};
</script>
<style lang='less' scoped>
</style>