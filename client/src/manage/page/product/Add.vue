<template>
    <div>
        <el-dialog title="新增产品" top="3vh" :visible.sync="show" :show-close="false" class="custom-dialog" :close-on-click-modal="false">
            <el-form :model="form" :rules="formRules" label-width="80px" ref="form">
                <el-form-item label="产品名称" prop="p_name">
                    <el-input v-model.trim="form.p_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="ty_name">
                    <el-select class="select-width" v-model="form.ty_name" placeholder="请选择类型">
                        <el-option v-for="item in ty_select" :key="item.ty_name" :label="item.ty_name" :value="item.ty_name">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="图片">
                    <el-upload :on-success="uploadSuccess" :on-error="uploadError" :file-list="fileList" :action="uploadImageUrl" list-type="picture-card" accept="image/*" :on-remove="removeFile" :on-preview="handlePictureCardPreview">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="内容">
                    <ck-editor img-upload-data-file="data.url" ref="addEditor" :image-upload-url="uploadImageUrl" content=""></ck-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="addCommit">确定</el-button>
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

    created() {
        let that = this;

        that.$api.type
            .getAllType()
            .then(res => {
                if (res.error == 0) {
                    that.ty_select = res.data;
                } else if (res.error == 505) {
                    that.$message.error("获取类型数据失败，请刷新后重试.");
                }
            })
            .catch(res => {
                that.$message.error("获取类型数据失败，请刷新后重试.");
            });
    },

    data() {
        return {
            form: {
                p_name: "",
                p_img: [],
                ty_name: "",
                content: ""
            },

            //上传地址
            uploadImageUrl: "/api/product/upload",

            //预览框
            imageViewurl: "",
            previewDialog: false,

            //上传文件列表
            fileList: [],

            //选择列表
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

                that.form.p_img.push(res.data.url);
            } else if (res.error == 504) {
                fileList.splice(fileList.length - 1, 1);

                that.$message.error("上传失败，请刷新后重试.");
            }
        },

        uploadError(err, file, fileList) {
            that.$message.error("上传失败，请刷新后重试.");
        },

        removeFile(file, fileList) {
            let that = this,
                url = file.url;

            for (var i = 0; i < that.form.p_img.length; i++) {
                var item = that.form.p_img[i];

                if (item == file.url) {
                    that.form.p_img.splice(i, 1);
                    break;
                }
            }
        },

        handlePictureCardPreview(file) {
            this.imageViewurl = file.url;
            this.previewDialog = true;
        },

        addCommit() {
            let that = this;

            that.form.content = that.$refs["addEditor"].getContent();

            that.$refs["form"].validate(valid => {
                if (valid) {
                    that.$api.product
                        .add(that.form)
                        .then(res => {
                            if (res.error == 0) {
                                that.$emit(
                                    "add-item",
                                    JSON.parse(JSON.stringify(res.data))
                                );

                                that.$message({
                                    message: "新增成功.",
                                    type: "success",
                                    duration: 800
                                });

                                that.closeDialog();

                                that.form.p_img = [];
                                that.fileList = [];

                                that.$refs["addEditor"].clearContent();
                            } else if (res.error == 500 || res.error == 506) {
                                that.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            that.$message.error("新增失败，请重试.");
                        });
                }
            });
        },

        //关闭窗口后调用
        afterClose() {
            let that = this;
            that.form.p_img = [];
            that.fileList = [];

            that.$refs["addEditor"].clearContent();
        }
    }
};
</script>
<style lang='less' scoped>
.select-width {
    width: 100%;
}
</style>