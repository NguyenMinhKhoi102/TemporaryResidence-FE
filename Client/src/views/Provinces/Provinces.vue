<template>
    <ProvinceList :data="dataCopy"></ProvinceList>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue"
import { usePropressCircular } from "../../stores/progressCircular";
import provinceService from "../../services/province.service";
import ProvinceList from "../../components/Provinces/ProvinceList.vue";
export default defineComponent({
    components: {
        ProvinceList
    },
    setup(props, context) {
        let data = [];
        const dataCopy = ref([]);
        const progressCircular = usePropressCircular();
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data = await provinceService.getAll();
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