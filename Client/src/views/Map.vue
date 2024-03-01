<template>
    <div class="map-page my-3">
        <Map :data="filterCoordinates"></Map>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import Map from '../components/Map.vue';
import { coordinatesDistricts } from '../services/map.service';

export default defineComponent({
    components: {
        Map
    },
    setup(props, context) {
        const filterCoordinates = coordinatesDistricts.features.filter((feature) => {
            return feature.properties.Code_vung.slice(0, 2) === "92";
        });
        console.log(filterCoordinates.map(e => e.properties));
        return {
            filterCoordinates,
        }
    }
});
</script>

<style scoped>
.map-page {
    /* margin-top: 30px; */
    height: 590px;
}
</style>