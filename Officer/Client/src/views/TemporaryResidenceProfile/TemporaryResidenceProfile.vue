<template>
    <TemporaryResidenceProfile :data="data" @add:temporaryResidenceProfile="addData"
        @update:temporaryResidenceProfile="updateData" @delete:temporaryResidenceProfile="deleteData">
    </TemporaryResidenceProfile>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import TemporaryResidenceProfile from '@/components/TemporaryResidenceProfile/TemporaryResidenceProfile.vue';
import temporaryResidenceProfileService from "../../services/temporaryResidenceProfile.service";
import { usePropressCircular } from "../../stores/progressCircular";
import { toast } from 'vue3-toastify';
export default defineComponent({
    components: {
        TemporaryResidenceProfile,
    },
    setup(props, context) {
        const propressCircular = usePropressCircular();
        const ward = JSON.parse(window.localStorage.getItem("ward"));
        const data = ref([]);
        const addData = async (rq) => {
            try {
                await temporaryResidenceProfileService.add(rq);
                data.value = await temporaryResidenceProfileService.getAllByWardCode(ward.code);
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
                await temporaryResidenceProfileService.update(id, rq);
                data.value = await temporaryResidenceProfileService.getAllByWardCode(ward.code);
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
                await temporaryResidenceProfileService.delete(id);
                data.value = await temporaryResidenceProfileService.getAllByWardCode(ward.code);
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
                data.value = await temporaryResidenceProfileService.getAllByWardCode(ward.code);
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
})


</script>