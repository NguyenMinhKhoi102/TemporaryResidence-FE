<template>
    <GeneralProfile :data="data" @add:generalProfile="addData" @update:generalProfile="updateData"
        @delete:generalProfile="deleteData">
    </GeneralProfile>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import GeneralProfile from "@/components/GeneralProfile/GeneralProfile.vue";
import generalProfileService from "../../services/generalProfile.service";
import { usePropressCircular } from "../../stores/progressCircular";
import { toast } from 'vue3-toastify';
export default defineComponent({
    components: {
        GeneralProfile
    },
    setup(props, context) {
        const propressCircular = usePropressCircular();
        const data = ref([]);
        const addData = async (rq) => {
            try {
                await generalProfileService.add(rq);
                data.value = await generalProfileService.getAll();
                data.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
                await generalProfileService.update(id, rq);
                data.value = await generalProfileService.getAll();
                data.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
                await generalProfileService.delete(id);
                data.value = await generalProfileService.getAll();
                data.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
                data.value = await generalProfileService.getAll();
                data.value = data.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
});
</script>