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
            }, 200);
        }
    }
};
</script>
