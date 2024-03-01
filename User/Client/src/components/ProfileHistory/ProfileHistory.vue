<template>
    <div class="profile-wait-component">
        <v-card class="p-3 mb-3" v-for="(e, i) in data">
            <div class="title-2">
                <div class=" d-flex align-center justify-content-between">
                    <div>Thông tin hồ sơ</div>
                    <div v-html="statusProfile(e.status)"></div>
                </div>
            </div>
            <div class="my-2">
                <div>
                    <i class="fa-solid fa-city"></i>
                    <b> Cơ quan thực hiện: </b>Công an {{ e.ward.fullName }}
                </div>
                <div class="row">
                    <div class="col">
                        <i class="fa-regular fa-clipboard"></i>
                        <b> Tên hồ sơ: </b>{{ e.typeProfile.name }}
                    </div>
                    <div class="col">
                        <i class="fa-regular fa-clipboard"></i>
                        <b> Trường hợp: </b>{{ e.caseProfile }}
                    </div>
                </div>
                <div>
                    <i class="fa-regular fa-address-card"></i>
                    <b> Địa chỉ tạm trú: </b>{{ e.temporaryAddress }}
                </div>
                <div>
                    <i class="fa-regular fa-calendar-days"></i>
                    <b> Thời hạn tạm trú đến ngày: </b>{{ e.temporaryAddress }}
                </div>
            </div>
            <div class="title-2">Thông tin cơ bản</div>
            <div class="my-2">
                <div class="row">
                    <div class="col">
                        <i class="fas fa-user"></i>
                        <b> Họ và tên: </b>{{ e.name }}
                    </div>
                    <div class="col">
                        <i class="fa-regular fa-id-badge"></i>
                        <b> Số ĐDCN(CCCD)/CMND: </b>{{ e.cmndCccd }}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <i class="fa-regular fa-calendar-days"></i>
                        <b> Ngày sinh: </b>{{ e.birthday }}
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-venus-mars"></i>
                        <b> Giới tính: </b>{{ e.gender == 1 ? 'Nam' : 'Nữ' }}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <i class="fa-regular fa-envelope"></i>
                        <b> Email: </b>{{ e.email }}
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-phone"></i>
                        <b> Số điện thoại: </b>{{ e.phone }}
                    </div>
                </div>
            </div>
            <div class="text-right">
                <router-link :to="{
                    name: 'temporary_residence_additional',
                    params: { id: e.id },
                }">
                    <button class="btn btn-warning mr-2" v-if="e.status == 2">Bổ sung</button>
                </router-link>
                <button class="btn btn-primary">Xem chi tiết</button>
            </div>
        </v-card>
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
        const filterValue = ref({
            name: "",
            cmndCccd: "",
            birthday: "",
            phone: "",
            createdAt: "",
            temporaryResidenceExpiration: "",
            typeProfile: "",
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
        const statusProfile = (status) => {
            if (status == 0)
                return "<i class='font-weight-light text-grey'>Đang được xử lý...</i>";
            else if (status == 1)
                return "<i class='font-weight-light text-success'>Đã được duyệt <i class='fa-solid fa-check'></i></i>";
            else if (status == 2)
                return "<i class='font-weight-light text-warning'>Yêu cầu bổ sung <i class='fa-solid fa-rotate'></i></i>";
            else
                return "<i class='font-weight-light text-danger'>Đã từ chối <i class='fa-regular fa-circle-xmark'></i></i>"
        }
        return {
            filterValue, filterActive, resetFilter,
            dialog, setDialog, dataDialog, getDateNumber,
            statusProfile,
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

.profile-wait-component {
    .v-card {
        border-radius: 0;
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