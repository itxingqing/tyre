<template>
    <div>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="files" list-type="picture-card" accept="image/*" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
    </div>

</template>

<script>
export default {
    name: "banner",

    data() {
        return {
            files: [{
                name: '测试文件',
                url: 'http://localhost:8888/favicon.ico'
            }]
        };
    },

    components: {},

    computed: {},

    mounted: () => {},

    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>
<style lang='less' scoped>
</style>