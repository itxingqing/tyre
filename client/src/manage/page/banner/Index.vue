<template>
    <div>
        <el-upload :on-success="uploadSuccess" :on-error="uploadError" action="/api/banner/upload" :file-list="files" list-type="picture-card" accept="image/*" :on-preview="handlePictureCardPreview" :before-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog class="image-prew-dialog" :show-close="false" :visible.sync="dialogVisible">
            <img class="image-prew" width="100%" :src="imageViewurl" alt="封面图片">
        </el-dialog>
    </div>

</template>

<script>
export default {
    name: "banner",

    data() {
        return {
            files: [],
            imageViewurl: "",
            dialogVisible: false
        };
    },

    created() {
        let that = this;

        that.$api.banner
            .get()
            .then(res => {
                if (res.error == 0) {
                    that.files = res.data;
                } else {
                    that.$message.error("获取文件列表失败，请刷新后重试.");
                }
            })
            .catch(res => {
                that.$message.error("获取文件列表失败，请刷新后重试.");
            });
    },

    methods: {
        uploadSuccess(res, file, fileList) {
            let that = this,
                lastFile = fileList[fileList.length - 1];
            if (res.error == 0) {
                lastFile.url = res.data.url;
                lastFile.id = res.data.id;
            } else {
                fileList.splice(fileList.length - 1, 1);

                that.$message.error("上传失败，请刷新后重试.");
            }
        },

        uploadError(err, file, fileList){
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
                            } else {
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
            this.dialogVisible = true;
        }
    }
};
</script>
<style lang='less' scoped>
.image-prew-dialog {
    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        padding: 20px;
    }
}
</style>