<template>
    <div class="profile-expired-component">
        <div class="pe-filter">
            <v-list :opened="opened">
                <v-list-group value="PeFilter">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
                            <div class="title-2 mb-2">Bộ lọc</div>
                        </v-list-item>
                    </template>
                    <form class="mb-4">
                        <div class="row">
                            <div class="pe-form-group col">
                                <label for="">Họ và tên</label>
                                <input name="name" type="text" class="pe-form-text" placeholder="Họ và tên"
                                    v-model="filterValue.name" />
                            </div>
                            <div class="pe-form-group col">
                                <label for="">Số ĐDCN(CCCD)/CMND</label>
                                <input type="text" class="pe-form-text" placeholder="Số ĐDCN(CCCD)/CMND"
                                    v-model="filterValue.cmndCccd">
                            </div>
                            <div class="pe-form-group col">
                                <label for="">Ngày sinh</label>
                                <input type="date" class="pe-form-text" v-model="filterValue.birthday">
                            </div>
                        </div>
                        <div class="row p-0">
                            <div class="pe-form-group col">
                                <label for="">Số điện thoại</label>
                                <input type="text" class="pe-form-text" placeholder="Số điện thoại"
                                    v-model="filterValue.phone">
                            </div>
                            <div class="pe-form-group col">
                                <label for="">Ngày gửi đi</label>
                                <input type="date" class="pe-form-text" v-model="filterValue.createdAt">
                            </div>
                            <div class="pe-form-group col">
                                <label for="">Ngày hết hạn</label>
                                <input type="date" class="pe-form-text" v-model="filterValue.temporaryResidenceExpiration">
                            </div>
                        </div>
                        <div class="text-right">
                            <button type="button" class="pe-button mt-2" @click="filterActive">Tìm kiếm</button>
                        </div>
                    </form>
                </v-list-group>
            </v-list>
        </div>
        <div class="row mx-0 mb-2 justify-content-between align-center">
            <div class="title-2">Danh sách hồ sơ</div>
            <div class="d-flex align-center">
                <div class="fast-search-container">
                    <input type="text" class="fast-search" v-model="searchText" placeholder="Tìm kiếm nhanh">
                    <label class="fast-search-label"><i class="fas fa-search"></i></label>
                </div>
                <button type="button" class="pe-button2" @click="resetFilter">
                    <i class="fas fa-rotate-left"></i>
                </button>
            </div>
        </div>
        <v-data-table :headers="headers" :items="desserts" items-per-page="5" item-value="name">
            <template v-slot:item.index="{ index }">
                <div>{{ index + 1 }}</div>
            </template>
            <template v-slot:item.gender="{ item }">
                <div v-if="item.gender == 1">Nam</div>
                <div v-else>Nữ</div>
            </template>
            <template v-slot:item.isExpired="{ item }">
                <div class="text-warning" v-if="getDateNumber(item.temporaryResidenceExpiration) <= 15">
                    Còn {{ getDateNumber(item.temporaryResidenceExpiration) }} ngày
                </div>
                <div v-else class="text-success">
                    Còn {{ getDateNumber(item.temporaryResidenceExpiration) }} ngày
                </div>
            </template>
            <template v-slot:item.action="{ item }">
                <div class="text-center">
                    <i style="font-size: 14px;" class="fas fa-info btn btn-primary rounded-circle" @click="showData(item)">
                        <v-tooltip activator="parent" location="top">
                            Xem chi tiết
                        </v-tooltip>
                    </i>
                </div>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog">
            <v-card width="800px" class="m-auto px-5 py-4" v-if="dataDialog">
                <h2 class="text-center">Thông tin tạm trú</h2>
                <div class="title-2 mb-2">Thông tin địa chỉ tạm trú số</div>
                <div class="px-4">
                    <MapShowMarker :dataMap="dataDialog"></MapShowMarker>
                </div>

                <div class="title-2 mb-2">Thông tin hồ sơ tạm trú</div>
                <div class="px-4 mt-3">
                    <div>
                        <b>Cơ quan thực hiện: </b>
                        Công an {{ dataDialog.ward.fullName }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <div>
                            <b>Họ, chữ đệm và tên:</b>
                            {{ dataDialog.name }}
                        </div>
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div class="row">
                        <div class="col">
                            <div>
                                <b>Ngày, tháng, năm sinh:</b>
                                {{ dataDialog.birthday }}
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <b>Giới tính:</b>
                                {{ dataDialog.gender == 1 ? 'Nam' : 'Nữ' }}
                            </div>
                        </div>
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Số định danh cá nhân/CMND:</b>
                        {{ dataDialog.cmndCccd }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div class="row">
                        <div class="col">
                            <div>
                                <b>Số điện thoại liên hệ:</b>
                                {{ dataDialog.phone }}
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <b>Email:</b>
                                {{ dataDialog.email }}
                            </div>
                        </div>
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Nơi thường trú:</b>
                        {{ dataDialog.permanentAddress }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Nơi tạm trú:</b>
                        {{ dataDialog.temperaryAddress }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Ngày hết hạn tạm trú:</b>
                        {{ dataDialog.temporaryResidenceExpiration }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Nơi ở hiện tại:</b>
                        {{ dataDialog.currentAddress }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Họ, chữ đệm và tên chủ hộ:</b>
                        {{ dataDialog.hostName }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div>
                        <b>Số định danh cá nhân/CMND của chủ hộ: </b>
                        {{ dataDialog.cmndCccdHost }}
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                    <div class="row">
                        <div class="col">
                            <div>
                                <b> Quan hệ với chủ hộ: </b>
                                {{ dataDialog.relationshipHost }}
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <b>Quan hệ với người khai báo: </b>
                                {{ dataDialog.relationshipDeclarent }}
                            </div>
                        </div>
                    </div>
                    <v-divider class="border-opacity-75" thickness="1" color="primary"></v-divider>
                </div>

                <div class="text-right">
                    <router-link :to="{
                        name: 'temporary_residence_extension.edit',
                        params: { id: dataDialog.id },
                    }" v-if="getDateNumber(dataDialog.temporaryResidenceExpiration) <= 15">
                        <button class="btn btn-warning mr-2">Gia hạn</button>
                    </router-link>
                    <button class="btn btn-primary" @click="setDialog(false)">Ok</button>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import { VTooltip, VList, VListItem, VListGroup, VDialog, VCard, VDivider } from "vuetify/lib/components/index.mjs";
import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs'
import * as yup from "yup";
import MapShowMarker from '../Map/MapShowMarker.vue';
export default defineComponent({
    components: {
        VDataTable, VTooltip, VList, VListItem, VListGroup, VDialog, VCard, VDivider,
        MapShowMarker,
    },
    props: {
        data: { type: Array, default: [] },
    },
    emits: ["filter:data", "reset:data"],
    setup(props, context) {
        const headers = [
            {
                title: 'STT',
                align: 'start',
                sortable: false,
                key: 'index',
            },
            { title: 'Tên', key: 'name' },
            { title: 'Số ĐDCN(CCCD)/CMND', key: 'cmndCccd' },
            { title: 'Giới tính', key: 'gender' },
            { title: 'Ngày sinh', key: 'birthday' },
            { title: 'Trạng thái', key: 'isExpired' },
            { title: 'Thao tác', key: 'action', sortable: false },
        ];
        const searchText = ref("");
        const desserts = computed(() => {
            if (searchText.value == "")
                return reactive(props.data);
            return props.data.filter((dessert) =>
                Object.values(dessert).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        const showData = (item) => {
            dialog.value = true;
            dataDialog.value = item;
            console.log(dataDialog.value);
        }
        const filterValue = ref({
            name: "",
            cmndCccd: "",
            birthday: "",
            phone: "",
            createdAt: "",
            temporaryResidenceExpiration: "",
        });
        const filterActive = () => {
            context.emit("filter:data", filterValue.value);
        }
        const resetFilter = () => {
            searchText.value = "";
            filterValue.value.name = "";
            filterValue.value.cmndCccd = "";
            filterValue.value.birthday = "";
            filterValue.value.phone = "";
            filterValue.value.createdAt = "";
            filterValue.value.temporaryResidenceExpiration = "";
            context.emit("reset:data");
        }
        const opened = ["PeFilter"];
        const dataDialog = ref({});
        const dialog = ref(false);
        const setDialog = (status) => {
            dialog.value = status;
        }
        const getDateNumber = (date) => {
            const date2024 = new Date(date);
            const currentDate = new Date();
            const timeDifference = currentDate - date2024;
            const daysDifference = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
            return daysDifference;
        }
        return {
            headers,
            desserts,
            showData,
            searchText,
            opened,
            filterValue, filterActive, resetFilter,
            dialog, setDialog, dataDialog, getDateNumber
        }
    }
});
</script>
<style scoped>
.title-2 {
    font-size: 18px;
    border-left: 5px solid #cf0068;
    padding-left: 10px;
    font-weight: 600;
}

.profile-expired-component {

    .v-data-table {
        border: 1px solid gainsboro;
        font-size: 14px;
    }

    .fast-search {
        border: 1px solid gainsboro;
        outline: none;
        padding-block: 5px;
        padding-left: 35px;
        width: 100%;
        font-size: 14px;
    }

    .fast-search-container {
        position: relative;
        max-width: 200px;
    }

    .fast-search-label {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(0, 123, 255);
    }


    .pe-button {
        background-color: rgb(0, 123, 255);
        color: white;
        font-weight: 600;
        padding: 5px 10px;
        position: relative;
    }

    .pe-button2 {
        background-color: rgb(0, 123, 255);
        color: white;
        font-weight: 600;
        height: 100%;
        padding: 4px 10px;
        margin-left: 10px;
        outline: none;
        position: relative;
    }

    .pe-form-group {
        width: 100%;
        height: 60px;
        margin-block: 5px;
        position: relative;
    }

    .pe-form-group label {
        font-size: 14px;
        font-weight: 600;
        display: block;
        margin-bottom: 5px;
    }

    .pe-form-text {
        width: 100%;
        height: 32px;
        border: 1px solid gainsboro;
        outline: none;
        padding: 5px 10px;
        font-size: 14px;
    }

    .v-list {
        overflow: hidden;
    }

    .pe-filter {

        .v-list-item {
            padding: 0;
            margin: 0;
        }

    }
}
</style>