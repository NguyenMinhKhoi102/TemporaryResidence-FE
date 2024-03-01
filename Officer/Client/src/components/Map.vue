<template>
    <h2 class="title my-3">HỒ SƠ TẠM TRÚ</h2>
    <div class="bg-white">
        <v-breadcrumbs :items="items">
            <template v-slot:title="{ item }">
                {{ item.title.toUpperCase() }}
            </template>
        </v-breadcrumbs>
    </div>
    <div class="filter">
        <v-list>
            <v-list-group>
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props">
                        <h4 class="title-2">Bộ lọc</h4>
                    </v-list-item>
                </template>
                <div class="form-row m-0">
                    <div class="form-group col">
                        <label for="">Họ và tên</label>
                        <input type="text" placeholder="Họ và tên" class="form-control">
                    </div>
                    <div class="form-group col">
                        <label for="">Số ĐDCN(CCCD)/CMND</label>
                        <input type="text" placeholder="Số ĐDCN(CCCD)/CMND" class="form-control">
                    </div>
                    <div class="form-group col">
                        <label for="">Trạng thái</label>
                        <select name="" id="" class="form-control">
                            <option value="" selected>Còn hạn</option>
                            <option>Còn hạn trong 15 ngày</option>
                            <option>Hết hạn</option>
                        </select>
                    </div>
                </div>
                <div class="text-right">
                    <button class="btn btn-primary">Tìm kiếm</button>
                </div>
            </v-list-group>
        </v-list>
    </div>

    <h4 class="title-2">Bản đồ số</h4>
    <div class="map-container">
        <div id="map" style="background-color: white;">
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref, createApp } from 'vue';
// import 'leaflet/dist/leaflet.css';
import L, { layerGroup } from 'leaflet';
import { VList, VListGroup, VListItem, VBreadcrumbs } from 'vuetify/lib/components/index.mjs';
import { useRouter } from "vue-router";
export default defineComponent({
    components: {
        VBreadcrumbs, VList, VListGroup, VListItem
    },
    props: {
        data: {
            type: Array,
            required: true
        },
        dataAddress: {
            type: Array,
            default: [],
        }
    },
    setup(props, context) {
        // const x = 12.881906;
        // const y = 109.458933;
        // const states = null;
        let map = null;
        let stateLayer = null;
        let marker;
        const router = useRouter();
        const items = ref([
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'Hồ sơ tạm trú',
                disabled: false,
                href: '/temporary-residence-profiles',
            },
            {
                title: 'Thêm hồ sơ',
                disabled: true,
                href: 'temporary-residence-profile',
            },
        ]);
        const initMap = () => {
            map = L.map('map', {
                center: [24.68383293105268, 105.55664062500001],
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

            const result = props.dataAddress.reduce((acc, current) => {
                const existingGroup = acc.find(group => group.some(item => item.temporaryLatitude === current.temporaryLatitude && item.temporaryLongitude === current.temporaryLongitude));
                if (existingGroup) {
                    existingGroup.push(current);
                } else {
                    acc.push([current]);
                }
                return acc;
            }, []);
            console.log(result);
            result.forEach(e => {
                initMarker(e[0].temporaryLatitude, e[0].temporaryLongitude, e);
            });
            const temp = props.data[0].geometry.coordinates[0][0];
            map.flyTo([temp[1], temp[0]], 14, { duration: 6 });
        }

        const highlightFeature = (e) => {
            const layer = e.target;

            layer.setStyle({
                fillOpacity: 0.3,
            });
        }

        const resetFeature = (e) => {
            const layer = e.target;
            layer.setStyle({
                fillOpacity: 0.1,
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
                        })
                    }
                });
                tempLayer.setStyle({
                    weight: 3,
                    opacity: 1,
                    color: "aqua",
                    fillOpacity: 0.1,
                    fillColor: "aqua"
                })
                groupLayer.addLayer(tempLayer);
            }
            // return groupLayer;
            return groupLayer;
        }
        const initMarker = async (lat, lng, dt) => {
            const gifIconUrl = 'https://cdn.pixabay.com/animation/2023/04/06/16/10/16-10-43-442_512.gif';
            const customIcon = L.icon({
                iconUrl: gifIconUrl,
                iconSize: [50, 61],
                popupAnchor: [-1, -34],
                iconAnchor: [12, 41],
                tooltipAnchor: [16, -18],
            });

            const str1 = `
            <div style="overflow: scroll; width:400px">
                <div class="font-weight-bold mb-2" style="font-size:16px"><b>Số người tạm trú: </b> ${dt.length}</div>
                <table class="table table-bordered" style="width:700px; font-size:12px">
                    <thead class="thead-light">
                        <tr class="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Số ĐDCN</th>
                        <th scope="col">Địa chỉ tạm trú</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        `;
            let str2 = ""
            dt.forEach((e, i) => {
                console.log("data", e);
                const temp = `
                        <tr style="vertical-align: middle;">
                            <th scope="row">${i + 1}</th>
                            <td>${e.name}</td>
                            <td>${e.cmndCccd}</td>
                            <td>${e.temperaryAddress}</td>
                            <td>${calculateDaysUntilDate(e.temporaryResidenceExpiration)}</td>
                            <td>
                                <button style="font-size:12px" class="temp btn btn-primary py-0 popupButton" id="${e.id}">Xem chi tiết</button>
                            </td>
                        </tr>
                        `;
                str2 += temp;
            });
            const str3 = `
                    </tbody>
                </table>
            </div>`
            const popupContent = str1 + str2 + str3;
            marker = L.marker([lat, lng], { icon: customIcon }).addTo(map)
            marker.on('popupopen', function () {
                // Thêm sự kiện click cho mỗi nút "Xem chi tiết" khi popup được mở
                const listPopupButton = document.getElementsByClassName('popupButton');
                Array.from(listPopupButton).forEach(element => {
                    element.addEventListener('click', function () {
                        router.push({ path: `/temporary-residence-profile/edit/${this.id}` });
                    });
                });
            });
            marker.bindPopup(popupContent, { maxWidth: "auto", maxHeight: 'auto', keepInView: true }).openPopup();
        }
        const calculateDaysUntilDate = (date) => {
            const currentDate = new Date();
            const targetDate = new Date(date);
            const currentTime = currentDate.getTime();
            const targetTime = targetDate.getTime();
            const timeDifference = targetTime - currentTime;
            const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
            if (daysDifference <= 0)
                return `<div class="text-danger">Hết hạn</div>`;
            else if (daysDifference <= 15)
                return `<div class="text-warning">Còn ${daysDifference} ngày</div>`;
            return `<div class="text-success">Còn ${daysDifference} ngày</div>`;
        }

        onMounted(() => {
            initMap();
        });
        return {
            items,
            // handlePopupButtonClick
        }
    }
});

</script>

<style>
.filter {
    .v-list {
        background: transparent;
    }

    .v-list-item {
        color: black;
        padding-left: 0 !important;
    }
}

.title {
    font-size: 30px;
}

.title-2 {
    margin-block: 1rem;
    padding-left: 0.5rem;
    border-left: 4px solid #cf0068;
    font-size: 18px;
    font-weight: 700;
}

.map-container {
    position: relative;
    height: 100%;
}

#map {
    height: 100%;
    outline: none;
}
</style>
