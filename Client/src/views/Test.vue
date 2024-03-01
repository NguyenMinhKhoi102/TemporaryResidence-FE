<template>
    <div class="map-get-coordinate-component">
        <div class="map-container">
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
export default defineComponent({
    setup(props, context) {
        let map = null;

        const initMap = () => {
            map = L.map('map', {
                center: [10.090658899442543, 105.5799367],
                zoom: 5,
            });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        onMounted(() => {
            initMap();
        })
        // L.marker([51.5, -0.09]).addTo(map)
        //     .bindPopup('A pretty CSS popup.<br> Easily customizable.');
        // // .openPopup();
        return {
            map
        }
    }
});
</script>
<style>
.map-get-coordinate-component {
    .map-container {
        position: relative;
        height: 200px;
        width: 200px;
    }

    #map {
        height: 100%;
        outline: none;
    }
}
</style>