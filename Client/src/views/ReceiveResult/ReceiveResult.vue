<template>
    <ReceiveResult :data="data" @add:receiveResult="addData" @update:receiveResult="updateData"
        @delete:receiveResult="deleteData">
    </ReceiveResult>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import ReceiveResult from "../../components/ReceiveResult/ReceiveResult.vue";
import receiveResultService from "../../services/receiveResult.service";
import { toast } from 'vue3-toastify';
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    components: {
        ReceiveResult,
    },
    setup(props, context) {
        const data = ref([]);
        const propressCircular = usePropressCircular();
        const addData = async (rq) => {
            try {
                propressCircular.setState(true);
                await receiveResultService.add(rq);
                data.value = await receiveResultService.getAll(0);
                toast.success("Thêm thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Thêm thất bại", {
                    autoClose: 1000,
                });
            } finally {
                propressCircular.setState(false);
            }
        }
        const updateData = async (id, rq) => {
            try {
                propressCircular.setState(true);
                await receiveResultService.update(id, rq);
                data.value = await receiveResultService.getAll(0);
                toast.success("Cập nhật thành công", {
                    autoClose: 1000,
                });

            } catch (error) {
                console.log(error);
                toast.error("Cập nhật thất bại", {
                    autoClose: 1000,
                });
            } finally {
                propressCircular.setState(false);
            }
        }
        const deleteData = async (id) => {
            try {
                propressCircular.setState(true);
                await receiveResultService.delete(id);
                data.value = await receiveResultService.getAll(0);
                toast.success("Xoá thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Xoá thất bại", {
                    autoClose: 1000,
                });
            } finally {
                propressCircular.setState(false);
            }
        }
        onMounted(async () => {
            try {
                propressCircular.setState(true);
                data.value = await receiveResultService.getAll(0);
                console.log(data.value)
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        })
        return {
            data,
            addData,
            updateData,
            deleteData,
        }
    }
});
</script>