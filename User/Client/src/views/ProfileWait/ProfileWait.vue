<template>
    <ProfileWait :data2="tempData" @filter:data="filterData" @reset:data="getData"></ProfileWait>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import ProfileWait from '../../components/ProfileWait/ProfileWait.vue';
import { usePropressCircular } from '../../stores/progressCircular';
import temporaryResidenceService from "../../services/temporaryResidenceProfile";
import generalProfileService from "../../services/generalProfile.service";
export default defineComponent({
    components: {
        ProfileWait
    },
    setup(props, context) {
        const progressCircular = usePropressCircular();
        let data;
        const tempData = ref([]);
        const filterData = (value) => {
            console.log(value);
            const hasNonEmptyProperty = Object.values(value).some(prop => prop !== "");
            if (hasNonEmptyProperty) {
                tempData.value = data.filter(e => {
                    // Kiểm tra từng thuộc tính khi nó không rỗng
                    return Object.keys(value).every(key => {
                        return value[key] === "" || e[key] == value[key];
                    });
                });
            }
        }
        const getData = () => {
            tempData.value = data;
        }
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data = await generalProfileService.getAllByUserId();
                data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                console.log(123);
                tempData.value = data;
                console.log(tempData.value);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            tempData,
            filterData,
            getData,
        }
    }
});
</script>