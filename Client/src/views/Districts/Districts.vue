<template>
    <DistrictList :data="dataCopy"></DistrictList>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue"
import { usePropressCircular } from "../../stores/progressCircular";
import districtService from "../../services/district.service";
import DistrictList from "../../components/Districts/DistrictList.vue";
export default defineComponent({
    components: {
        DistrictList
    },
    setup(props, context) {
        let data = [];
        const dataCopy = ref([]);
        const progressCircular = usePropressCircular();
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data = await districtService.getAll();
                dataCopy.value = data;
                console.log(data);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            dataCopy,
        }
    }
});
</script>