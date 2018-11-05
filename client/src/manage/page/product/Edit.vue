<template>
    <el-dialog title="修改产品" :visible.sync="show" class="custom-dialog" :close-on-click-modal="false">
        <el-form :model="form" :rules="formRules" label-width="80px" ref="form">
            <!-- <el-form-item label="名称" prop="ty_name">
                <el-input v-model.trim="form.ty_name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="中文" prop="ty_i18n.zh_cn">
                <el-input v-model.trim="form.ty_i18n.zh_cn" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="英文" prop="ty_i18n.en_us">
                <el-input v-model.trim="form.ty_i18n.en_us" autocomplete="off"></el-input>
            </el-form-item> -->

            <ck-editor ref="editEditor" :content="form.content"></ck-editor>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="editCommit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import DialogForm from "@manage/page/base/DialogForm";
import ckEditor from "@magComponent/ckeditor/CKEditor";

export default {
    name: "Edit",
    mixins: [DialogForm],

    components: {
        ckEditor
    },

    props: {
        show: {
            type: Boolean,
            default: false
        },

        editItem: {
            type: Object,
            default: {
                p_name: "",
                p_img: "",
                ty_name: "",
                content: ""
            }
        }
    },

    watch: {
        editItem(newValue, oldValue) {
            let that = this,
                data = JSON.parse(JSON.stringify(newValue));

            that.form.id = data.id;
            that.form.p_name = data.p_name || "";
            that.form.p_img = data.p_img || "";
            that.form.ty_name = data.ty_name || "";
            that.form.content = data.content || "";
        }
    },

    data() {
        return {
            form: {
                p_name: "",
                p_img: "",
                ty_name: "",
                content: ""
            },

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
        editCommit() {
            let that = this;

            //     that.$refs["form"].validate(valid => {
            //         if (valid) {
            //             that.$api.type
            //                 .edit(that.form)
            //                 .then(res => {
            //                     if (res.error == 0) {
            //                         that.$emit(
            //                             "edit-item",
            //                             JSON.parse(JSON.stringify(res.data))
            //                         );

            //                         that.$message({
            //                             message: "修改成功.",
            //                             type: "success",
            //                             duration: 800
            //                         });

            //                         that.closeDialog();
            //                     } else if (res.error == 500 || res.error == 506) {
            //                         that.$message.error(res.message);
            //                     }
            //                 })
            //                 .catch(res => {
            //                     that.$message.error("修改失败，请重试.");
            //                 });
            //         }
            //     });
        }
    }
};
</script>
<style lang='less' scoped>
</style>