<template>
    <div>
        <!-- <div>{{tabelHeight}}</div> -->
        <el-row class="table-container">
            <el-table border stripe :data="tData" style="width: 100%" :height="tabelHeight">
                <el-table-column prop="p_name" label="产品名称">
                </el-table-column>
                <el-table-column prop="ty_name" label="类型名称">
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
    name: "product",
    props: ['bodyHeight'],

    mixins:[TabelBase],

    data() {
        return {
            tData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
            ],
            pager:[],

            dialogTableVisible: false
        };
    },

    components: {
        Add,
        Edit
    },

    computed: {

    },

    mounted: () => {

        // console.log(this);
    },

    methods: {}
};
</script>
<style lang='less' scoped>
</style>