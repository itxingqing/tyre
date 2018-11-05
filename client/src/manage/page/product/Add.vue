<template>
    <el-dialog title="新增产品" :visible.sync="show" class="custom-dialog" :close-on-click-modal="false">
        <el-form :model="form" :rules="formRules" label-width="80px" ref="form">
            <!-- <el-form-item label="名称" prop="ty_name">
                <el-input v-model.trim="form.ty_name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="中文" prop="ty_i18n.zh_cn">
                <el-input v-model.trim="form.ty_i18n.zh_cn" autocomplete="off"></el-input>
            </el-form-item> -->
            <ck-editor ref="addEditor" :content="form.content"></ck-editor>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="addCommit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import DialogForm from "@manage/page/base/DialogForm";
import ckEditor from "@magComponent/ckeditor/CKEditor";

export default {
    name: "Add",
    mixins: [DialogForm],

    components: {
        ckEditor
    },

    props: {
        show: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            form: {
                p_name: '',
                p_img: '',
                ty_name: '',
                content: ''
            },

            ty_select: [],

            formRules: {
                // ty_name: [
                //     {
                //         required: true,
                //         message: "请填写类型",
                //         trigger: "blur"
                //     }
                // ]
            }
        };
    },

    methods: {
        addCommit() {
            let that = this;

            // that.$refs["form"].validate(valid => {
            //     if (valid) {
            //         that.$api.type
            //             .add(that.form)
            //             .then(res => {
            //                 if (res.error == 0) {
            //                     that.$emit(
            //                         "add-item",
            //                         JSON.parse(JSON.stringify(res.data))
            //                     );

            //                     that.$message({
            //                         message: "新增成功.",
            //                         type: "success",
            //                         duration: 800
            //                     });

            //                     that.closeDialog();
            //                 } else if (res.error == 500 || res.error == 506) {
            //                     that.$message.error(res.message);
            //                 }
            //             })
            //             .catch(res => {
            //                 that.$message.error("新增失败，请重试.");
            //             });
            //     }
            // });
        }
    }
};
</script>
<style lang='less' scoped>
</style>