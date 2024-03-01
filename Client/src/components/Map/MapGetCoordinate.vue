<template>
    <div class="map-get-coordinate-component">
        <div class="map-container">
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted, computed, reactive } from 'vue';
import axios from 'axios';
import L from 'leaflet';
import { toast } from 'vue3-toastify';
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    props: {
        coordinate: { type: Object },
        ward: { type: Object, required: true },
    },
    emits: ["set:coordinate"],
    setup(props, context) {
        const markerExists = ref(false);
        let map = null;
        let marker;
        const progressCircular = usePropressCircular();
        const initMap = (lat, lon, zoomIndex) => {
            map = L.map('map', {
                center: [20.77217, 105.51270],
                zoom: 5,
            });
            L.tileLayer(
                'https://{s}.google.com/vt/lyrs=y,traffic&x={x}&y={y}&z={z}', {
                maxZoom: 21,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(map);
            map.on("click", async (e) => {
                const { lat, lng } = e.latlng;
                initMarker(lat, lng);
            });
            map.flyTo([lat, lon], zoomIndex, { duration: 3 });
        }
        const initMarker = async (lat, lng) => {
            try {
                progressCircular.setState(true);
                if (markerExists.value) {
                    map.removeLayer(marker)
                }
                const gifIconUrl = 'https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif';
                const customIcon = L.icon({
                    iconUrl: gifIconUrl,
                    iconSize: [50, 61],
                    popupAnchor: [-1, -34],
                    iconAnchor: [12, 41],
                    tooltipAnchor: [16, -18],
                });
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
                console.log(response);
                marker = L.marker([lat, lng], { icon: customIcon }).addTo(map)
                    .bindPopup(`
                    <h5 class="text-center">Thông tin Marker</h5>
                    <table>
                        <tr>
                            <th class="p-1" style="width: 70px">Vĩ độ:</th>
                            <td class="p-1">${lat}</td>
                        </tr>
                        <tr>
                            <th class="p-1">Kinh độ:</th>
                            <td class="p-1">${lng}</td>
                        </tr>
                        <tr>
                            <th class="p-1">Địa chỉ:</th>
                            <td class="p-1">${response.data.display_name}</td>
                        </tr>
                    </table>
                    `)
                    .openPopup();
                markerExists.value = true;
                context.emit("set:coordinate", { lat: lat, lng: lng, address: response.data.display_name });
            } catch (error) {
                console.log(error)
            } finally {
                progressCircular.setState(false);
            }

        }
        const ward = reactive(props.ward);
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                console.log("ward", props.ward);
                const address = ward.name + "," + ward.district.name + "," + ward.district.province.name;
                console.log("abc", address);
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        format: 'json',
                        q: address,
                    },
                });
                console.log(response);
                if (props.coordinate.lat != "" && props.coordinate.lng != "") {
                    initMarker(props.coordinate.lat, props.coordinate.lng);
                }
                initMap(response.data[0].lat, response.data[0].lon, 13);
            } catch (error) {
                console.log(error);
                toast.warning("Không tìm thấy vị trí! Vui lòng zoom thủ công trên Map", {
                    autoClose: 5000,
                });
                initMap(16.10454, 107.88574, 5)
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
        height: 400px;
        margin-bottom: 1rem;
    }

    #map {
        height: 100%;
        width: 100%;
        outline: none;
    }
}
</style>