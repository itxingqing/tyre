<script>
import { setTimeout } from "timers";
export default {
    data() {
        return {
            editID: 0
        };
    },

    methods: {
        closeDialog() {
            let that = this;
            that.$emit("update:show", false);
            setTimeout(() => {
                that.$refs["form"].resetFields();

                //允许用户自定义关闭窗口后的动作
                that.afterClose();
            }, 200);
        },

        //关闭窗口后调用
        afterClose() {}
    }
};
</script>
