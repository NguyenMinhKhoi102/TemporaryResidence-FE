<template>
    <ProfileExpired :data="tempData" @filter:data="filterData" @reset:data="getData"></ProfileExpired>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import ProfileExpired from '../../components/ProfileExpired/ProfileExpired.vue';
import { usePropressCircular } from '../../stores/progressCircular';
import temporaryResidenceService from "../../services/temporaryResidenceProfile"
export default defineComponent({
    components: {
        ProfileExpired,
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
                data = await temporaryResidenceService.getAllByIsExpired(0);
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