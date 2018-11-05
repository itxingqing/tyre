<template>
    <div>
        <el-dialog title="新增产品" top="3vh" :visible.sync="show" class="custom-dialog" :close-on-click-modal="false">
            <el-form :model="form" :rules="formRules" label-width="80px" ref="form">
                <el-form-item label="产品名称" prop="p_name">
                    <el-input v-model.trim="form.p_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="ty_name">
                    <el-input v-model.trim="form.ty_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="图片">
                    <el-upload :on-success="uploadSuccess" :on-error="uploadError" action="/api/product/upload" :file-list="files" list-type="picture-card" accept="image/*" :on-preview="handlePictureCardPreview" :before-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="内容">
                    <ck-editor ref="addEditor" :content="form.content"></ck-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="addCommit">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="image-prew-dialog" :show-close="false" :visible.sync="previewDialog">
            <img class="image-prew" width="100%" :src="imageViewurl" alt="封面图片">
        </el-dialog>

    </div>
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
                p_name: "",
                p_img: [],
                ty_name: "",
                content: ""
            },

            imageViewurl: "",
            previewDialog: false,

            ty_select: [],

            formRules: {
                p_name: [
                    {
                        required: true,
                        message: "请填写产品名称",
                        trigger: "blur"
                    }
                ],

                ty_name: [
                    {
                        required: true,
                        message: "请选择类型",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    methods: {
        uploadSuccess(res, file, fileList) {
            let that = this,
                lastFile = fileList[fileList.length - 1];
            if (res.error == 0) {
                lastFile.url = res.data.url;
                lastFile.id = res.data.id;
            } else if (res.error == 504) {
                fileList.splice(fileList.length - 1, 1);

                that.$message.error("上传失败，请刷新后重试.");
            }
        },

        uploadError(err, file, fileList) {
            that.$message.error("上传失败，请刷新后重试.");
        },

        handleRemove(file, fileList) {
            let that = this;

            return new Promise((resolve, reject) => {
                if (file && file.id) {
                    let fileID = file.id;

                    that.$api.banner
                        .del({
                            id: fileID
                        })
                        .then(res => {
                            if (res.error == 0) {
                                that.$message({
                                    message: "删除成功.",
                                    type: "success",
                                    duration: 800
                                });

                                resolve("");
                            } else if (res.error == 508) {
                                reject("");

                                that.$message.error("删除失败，请刷新后重试.");
                            }
                        })
                        .catch(res => {
                            reject("");

                            that.$message.error("删除失败，请刷新后重试.");
                        });
                } else {
                    resolve("");
                }
            });
        },

        handlePictureCardPreview(file) {
            this.imageViewurl = file.url;
            this.previewDialog = true;
        },

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