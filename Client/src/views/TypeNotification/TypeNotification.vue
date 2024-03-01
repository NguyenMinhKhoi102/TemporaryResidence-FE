<template>
    <TypeNotification :data="data" @add:typeNotification="addData" @update:typeNotification="updateData"
        @delete:typeNotification="deleteData">
    </TypeNotification>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import TypeNotification from '@/components/TypeNotification/TypeNotification.vue';
import typeNotificationService from '../../services/typeNotification.service';
import { toast } from 'vue3-toastify';
import { usePropressCircular } from "../../stores/progressCircular";
export default defineComponent({
    components: {
        TypeNotification,
    },
    setup(props, context) {
        const propressCircular = usePropressCircular();
        const data = ref([]);
        const addData = async (rq) => {
            try {
                await typeNotificationService.add(rq);
                data.value = await typeNotificationService.getAll(0);
                toast.success("Thêm thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Thêm thất bại", {
                    autoClose: 1000,
                });
            }
        }
        const updateData = async (id, rq) => {
            try {
                await typeNotificationService.update(id, rq);
                data.value = await typeNotificationService.getAll(0);
                toast.success("Cập nhật thành công", {
                    autoClose: 1000,
                });

            } catch (error) {
                console.log(error);
                toast.error("Cập nhật thất bại", {
                    autoClose: 1000,
                });
            }
        }
        const deleteData = async (id) => {
            try {
                await typeNotificationService.delete(id);
                data.value = await typeNotificationService.getAll(0);
                toast.success("Xoá thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Xoá thất bại", {
                    autoClose: 1000,
                });
            }
        }

        onMounted(async () => {
            try {
                propressCircular.setState(true);
                data.value = await typeNotificationService.getAll(0);
                console.log(data.value);
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            }
            finally {
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
})
</script>