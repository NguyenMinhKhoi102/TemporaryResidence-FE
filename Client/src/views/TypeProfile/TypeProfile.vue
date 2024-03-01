<template>
    <TypeProfile :data="data" @add:typeProfile="addData" @update:typeProfile="updateData" @delete:typeProfile="deleteData">
    </TypeProfile>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import TypeProfile from '../../components/TypeProfile/TypeProfile.vue';
import typeProfileService from "../../services/typeProfile.service";
import { toast } from 'vue3-toastify';
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    components: {
        TypeProfile,
    },
    setup(props, context) {
        const data = ref([]);
        const propressCircular = usePropressCircular();
        const addData = async (rq) => {
            try {
                propressCircular.setState(true);
                await typeProfileService.add(rq);
                data.value = await typeProfileService.getAll(0);
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
                await typeProfileService.update(id, rq);
                data.value = await typeProfileService.getAll(0);
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
                await typeProfileService.delete(id);
                data.value = await typeProfileService.getAll(0);
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
                data.value = await typeProfileService.getAll(0);
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