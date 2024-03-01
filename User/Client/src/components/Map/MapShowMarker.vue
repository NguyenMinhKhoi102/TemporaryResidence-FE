<template>
    <div class="map-get-coordinate-component">
        <div class="map-container">
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import L from 'leaflet';
import { toast } from 'vue3-toastify';
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    props: {
        dataMap: { type: Object, required: true },
    },
    setup(props, context) {
        let map = null;
        let marker = null;
        const progressCircular = usePropressCircular();
        const initMap = () => {
            const lat = parseFloat(props.dataMap.temporaryLatitude) + 0.014;
            map = L.map('map', {
                center: [20.77217, 105.51270],
                zoom: 5,
            });
            L.tileLayer(
                'https://{s}.google.com/vt/lyrs=y,traffic&x={x}&y={y}&z={z}', {
                maxZoom: 21,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(map);
            initMarker();

            map.flyTo([lat, props.dataMap.temporaryLongitude], 13, { duration: 3 });
        }
        const initMarker = async () => {
            try {
                progressCircular.setState(true);
                const gifIconUrl = 'https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif';
                const customIcon = L.icon({
                    iconUrl: gifIconUrl,
                    iconSize: [50, 61],
                    popupAnchor: [-1, -34],
                    iconAnchor: [12, 41],
                    tooltipAnchor: [16, -18],
                });
                marker = L.marker([props.dataMap.temporaryLatitude, props.dataMap.temporaryLongitude], { icon: customIcon }).addTo(map)
                    .bindPopup(`
                        <h5 class="text-center">Thông tin Marker</h5>
                        <table>
                            <tr>
                                <th class="p-1"  style="width: 70px">Vĩ độ:</th>
                                <td class="p-1">${props.dataMap.temporaryLatitude}</td>
                            </tr>
                            <tr>
                                <th class="p-1">Kinh độ:</th>
                                <td class="p-1">${props.dataMap.temporaryLongitude}</td>
                            </tr>
                            <tr>
                                <th class="p-1">Địa chỉ:</th>
                                <td class="p-1">${props.dataMap.temporaryDigitalAddress}</td>
                            </tr>
                        </table>
                    `)
                    .openPopup();
            } catch (error) {
                console.log(error)
            } finally {
                progressCircular.setState(false);
            }

        }
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                initMap();
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        })
        return {
            map,
        }
    }
});
</script>
<style>
.map-get-coordinate-component {
    .map-container {
        position: relative;
        height: 300px;
        margin-bottom: 1rem;
    }

    #map {
        height: 100%;
        width: 100%;
        outline: none;
    }
}
</style>