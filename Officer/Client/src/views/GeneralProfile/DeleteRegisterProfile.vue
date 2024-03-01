<template>
    <DeleteRegisterProfileVue :data="dataCopy" @add:generalProfile="addData" @update:generalProfile="updateData"
        @delete:generalProfile="deleteData">
    </DeleteRegisterProfileVue>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import GeneralProfile from "@/components/GeneralProfile/GeneralProfile.vue";
import generalProfileService from "../../services/generalProfile.service";
import DeleteRegisterProfileVue from '../../components/GeneralProfile/DeleteRegisterProfile.vue';
import { usePropressCircular } from "../../stores/progressCircular";
import { toast } from 'vue3-toastify';
export default defineComponent({
    components: {
        DeleteRegisterProfileVue
    },
    setup(props, context) {
        const propressCircular = usePropressCircular();
        const dataCopy = ref([]);
        let data = [];
        const ward = JSON.parse(window.localStorage.getItem("ward"));
        const addData = async (rq) => {
            try {
                await generalProfileService.add(rq);
                data = await generalProfileService.getByTypeAndCode(3, ward.code);
                dataCopy.value = data.sort(
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
                data = await generalProfileService.getByTypeAndCode(3, ward.code);
                dataCopy.value = data.sort(
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
                data = await generalProfileService.getByTypeAndCode(3, ward.code);
                dataCopy.value = data.sort(
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
                data = await generalProfileService.getByTypeAndCode(3, ward.code);
                dataCopy.value = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                console.log(dataCopy.value);
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
            dataCopy,
            addData,
            updateData,
            deleteData,
        }
    }
});
</script>