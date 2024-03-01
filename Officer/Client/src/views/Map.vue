<template>
    <div class="map-page" v-if="filterCoordinates.length != 0">
        <Map :data="filterCoordinates" :dataAddress="data"></Map>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import Map from '../components/Map.vue';
import { usePropressCircular } from '../stores/progressCircular';
import temporaryResidenceProfileService from "../services/temporaryResidenceProfile.service";
import { coordinateWards } from '../services/map.service';

export default defineComponent({
    components: {
        Map
    },
    setup(props, context) {
        const progressCircular = usePropressCircular();
        const data = ref([]);
        const tempWard = JSON.parse(window.localStorage.getItem("ward"));
        const filterCoordinates = ref([]);
        const getGeoJSON = async () => {
            console.log(coordinateWards.features);
            filterCoordinates.value = coordinateWards.features.filter((e) => {
                return (e.properties.NAME_3 == tempWard.district.name || e.properties.NAME_3 == tempWard.district.name_en) && (e.properties.NAME_4 == tempWard.name || e.properties.NAME_4 == tempWard.name_en);
            });
            console.log(filterCoordinates.value);
        }
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                const ward = JSON.parse(window.localStorage.getItem("ward"));
                data.value = await temporaryResidenceProfileService.getAllByWardCode(ward.code);
                await getGeoJSON();
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        })

        return {
            filterCoordinates,
            data,
        }
    }
});
</script>

<style>
.map-page {
    margin-top: 30px;
    height: 600px;
}
</style>