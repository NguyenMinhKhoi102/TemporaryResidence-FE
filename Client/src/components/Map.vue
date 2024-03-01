<template>
    <h2 class="title" style="font-size: 30px;">BẢN ĐỒ SỐ</h2>
    <div class="bg-white">
        <v-breadcrumbs :items="items">
            <template v-slot:title="{ item }">
                {{ item.title.toUpperCase() }}
            </template>

        </v-breadcrumbs>
    </div>
    <div class="map-container">
        <div id="map" style="background-color: transparent;">
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
// import 'leaflet/dist/leaflet.css';
import L, { layerGroup } from 'leaflet';
import { VCard, VIcon, VBreadcrumbs, VDialog, VSwitch } from 'vuetify/lib/components/index.mjs';
export default defineComponent({
    components: {
        VBreadcrumbs,
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    setup(props, context) {
        const items = ref([
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'Bản đồ số',
                disabled: true,
                href: 'type-profile',
            },
        ]);
        // const x = 12.881906;
        // const y = 109.458933;
        // const states = null;
        let map = null;
        let stateLayer = null;


        const initMap = () => {
            map = L.map('map', {
                center: [10.090658899442543, 105.5799367],
                zoom: 5,
            });
            const editableLayers = new L.FeatureGroup();
            L.control.layers({
                "Satellite": L.tileLayer(
                    'https://{s}.google.com/vt/lyrs=y,traffic&x={x}&y={y}&z={z}', {
                    maxZoom: 21,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                }).addTo(map),
                'osm': L.tileLayer(
                    'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: 'osm',
                    maxZoom: 19,
                    minZoom: 2
                }),
                "googleStreets": L.tileLayer(
                    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                    maxZoom: 21,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                }),
                "googleHybrid ": L.tileLayer(
                    'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                    maxZoom: 21,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                }),
                "googleSat ": L.tileLayer(
                    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                    maxZoom: 21,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                }),
            }, {
                'geoLayer': initStatesLayer().addTo(map)
            }, {
                position: 'topright', collapsed: true
            }).addTo(map);
            map.flyTo([10.090658899442543, 105.5799367], 10, { duration: 4 });
        }

        const highlightFeature = (e) => {
            const layer = e.target;

            layer.setStyle({
                fillOpacity: 0.8,
            });
        }

        const resetFeature = (e) => {
            const layer = e.target;
            layer.setStyle({
                fillOpacity: 0.5,
            });
        }

        const handleMap = (e) => {
            console.log("data per layer: ", e.target.feature);
        }

        const randomElement = (array) => {
            const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }

        const initStatesLayer = () => {
            const colors = ["green", "red", "blue", "orange", "yellow", "violet", "brown", "grey", "purple", "aqua", "blueviolet", "chartreuse", "chocolate", "deepskyblue", "fuchsia", "darkorange"];
            const groupLayer = L.layerGroup();
            for (const layer of props.data) {
                const color = randomElement(colors);
                const tempLayer = L.geoJSON(layer, {
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            mouseover: (e) => (highlightFeature(e)),
                            mouseout: (e) => (resetFeature(e)),
                            click: (e) => (handleMap(e))
                        })
                        const tooltipContent = `
          <span style="font-weight: bold">${feature.properties.Ten_Huyen}</span> :  <span style="color:red; font-weight: bold">1</span>
        `;
                        layer.bindTooltip(tooltipContent, { permanent: true, direction: 'center', className: 'custom-tooltip' });
                    }
                });
                tempLayer.setStyle({
                    weight: 3,
                    opacity: 1,
                    color: color,
                    fillOpacity: 0.5,
                    fillColor: color
                })
                groupLayer.addLayer(tempLayer);
            }
            // return groupLayer;
            return groupLayer;
        }

        onMounted(() => {
            initMap();
            // initStatesLayer();
            // initLayer(tempData);
        });
        return {
            items
        }
    }
});

</script>

<style>
.map-container {
    position: relative;
    height: 100%;
}

#map {
    height: 100%;
    outline: none;
}
</style>
