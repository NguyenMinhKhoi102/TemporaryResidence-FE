<template>
    <WardList :data="dataCopy"></WardList>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue"
import { usePropressCircular } from "../../stores/progressCircular";
import wardService from "../../services/ward.service";
import WardList from "../../components/Wards/WardList.vue";
export default defineComponent({
    components: {
        WardList
    },
    setup(props, context) {
        let data = [];
        const dataCopy = ref([]);
        const progressCircular = usePropressCircular();
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data = await wardService.getAll();
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