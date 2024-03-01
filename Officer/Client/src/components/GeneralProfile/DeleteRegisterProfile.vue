<template>
    <div class="general-profile-component">
        <h2 class="title my-3">HỒ SƠ XOÁ ĐĂNG KÝ TẠM TRÚ</h2>
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
                            <label for="">Ngày sinh</label>
                            <input type="date" placeholder="Số ĐDCN(CCCD)/CMND" class="form-control">
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label for="">Số điện thoại</label>
                            <input type="text" placeholder="Số điện thoại" class="form-control">
                        </div>
                        <div class="form-group col">
                            <label for="">Ngày nhận</label>
                            <input type="date" placeholder="Số ĐDCN(CCCD)/CMND" class="form-control">
                        </div>
                        <div class="form-group col">
                            <label for="">Giới tính</label>
                            <select name="" id="" class="form-control">
                                <option value="" selected>--Chọn--</option>
                                <option>Còn hạn trong 15 ngày</option>
                                <option>Hết hạn</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label for="">Trường hợp</label>
                            <select name="" id="" class="form-control">
                                <option value="" selected>--Chọn--</option>
                                <option>Còn hạn trong 15 ngày</option>
                                <option>Hết hạn</option>
                            </select>
                        </div>
                        <div class="form-group col">
                            <label for="">Hình thức nhận kết quả</label>
                            <select name="" id="" class="form-control">
                                <option value="" selected>--Chọn--</option>
                                <option>Còn hạn trong 15 ngày</option>
                                <option>Hết hạn</option>
                            </select>
                        </div>
                        <div class="form-group col">
                            <label for="">Loại thông báo</label>
                            <select name="" id="" class="form-control">
                                <option value="" selected>--Chọn--</option>
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
        <div class="d-flex align-center justify-content-between mb-2">
            <h4 class="title-2">Danh sách hồ sơ xoá đăng ký tạm trú</h4>
            <!-- <v-dialog v-model="dialog" width="auto" persistent>
                <template v-slot:activator="{ props }">
                    <button v-bind="props" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        Thêm hồ sơ
                    </button>
                </template>
                <v-card class="p-3">
                    <v-card-title class="text-h5 mb-4">
                        Bạn có chắc muốn thêm một hồ sơ tạm trú mới
                    </v-card-title>
                    <v-card-actions class="justify-content-end">
                        <button class="btn btn-outline-danger mr-2" @click="setDialog(false)">Từ chối</button>
                        <button class="btn btn-outline-primary" @click="addGeneralProfile">Đồng ý</button>
                    </v-card-actions>
                </v-card>
            </v-dialog> -->

            <input type="text" name="search" v-model="searchText" class="table-search my-2" placeholder="Tìm kiếm nhanh">
        </div>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="dataSource" item-value="name"
            class="elevation-1" :loading="false" loading-text="Loading... Chờ đợi trong giây lát">
            <template v-slot:item.index="{ item }">
                {{ item.index + 1 }}
            </template>
            <template v-slot:item.birthday="{ item }">
                <div v-if="item.raw.birthday != null">
                    {{ formatDate(item.raw.birthday) }}
                </div>
            </template>
            <template v-slot:item.status="{ item }">
                <div v-if="item.raw.status == 1" class="text-success">
                    Đã duyệt
                </div>
                <div v-else-if="item.raw.status == 2" class="text-danger">
                    <i>Đã từ chối</i>
                </div>
                <div v-else class="text-grey">
                    <i>Chưa duyệt...</i>
                </div>
            </template>
            <template v-slot:item.gender="{ item }">
                <div v-if="item.raw.gender == 1">
                    Nam
                </div>
                <div v-else-if="item.raw.gender == 0">
                    Nữ
                </div>
            </template>
            <template v-slot:item.temporaryResidenceExpiration="{ item }">
                <div v-if="item.raw.temporaryResidenceExpiration != null">
                    {{ formatDate(item.raw.temporaryResidenceExpiration) }}
                </div>
            </template>

            <template v-slot:item.actions="{ item }">
                <div style="white-space: nowrap;">
                    <router-link :to="{
                        name: 'general_profile_delete_register.edit',
                        params: { id: item.raw.id },
                    }">
                        <button class="btn btn-warning mr-2 py-0">
                            <i class="fas fa-edit"></i>
                        </button>
                    </router-link>
                    <button class="btn btn-danger py-0" @click="deleteItem(item)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import { defineComponent, ref, computed, reactive } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs'
import { VCard, VIcon, VBreadcrumbs, VDialog, VCardTitle, VCardActions, VList, VListGroup, VListItem } from 'vuetify/lib/components/index.mjs';
import { usePropressCircular } from '../../stores/progressCircular';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        VDataTable,
        VCard,
        VIcon,
        VBreadcrumbs,
        VDialog,
        VCardTitle, VCardActions,
        VList, VListGroup, VListItem
    },
    props: {
        data: { type: Array, default: [] }
    },
    emits: [
        "delete:generalProfile",
        "add:generalProfile",
    ],
    setup(props, context) {
        const router = useRouter();
        const progressCircular = usePropressCircular();
        const formatDateTime = (dateTimeString) => {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Sử dụng định dạng 24 giờ
            };

            const date = new Date(dateTimeString);
            const formattedDate = date.toLocaleDateString('en-GB', options);
            return `${formattedDate}`;
        };
        const formatDate = (dateTimeString) => {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };

            const date = new Date(dateTimeString);
            const formattedDate = date.toLocaleDateString('en-GB', options);
            return formattedDate;
        };
        const itemsPerPage = ref(5);
        const items = ref([
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'Hồ sơ xoá đăng ký tạm trú',
                disabled: true,
                href: 'temporary-residence-profile',
            },
        ]);
        const headers = [
            {
                title: 'STT',
                align: 'start',
                sortable: false,
                key: 'index',
            },
            { title: 'Họ và tên', key: 'name' },
            { title: 'Ngày sinh', key: 'birthday' },
            { title: 'Giới tính', key: 'gender' },
            { title: 'Trường hợp', key: 'caseProfile' },
            { title: 'Trạng thái', key: 'status' },
            { title: 'Thao tác', key: 'actions' },
        ];
        const searchText = ref("");
        const dataSource = computed(() => {
            if (searchText == "")
                return reactive(props.dataSource);
            return props.data.filter((dessert) =>
                Object.values(dessert).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteItem = (item) => {
            if (confirm("Bạn có chắc muốn xoá")) {
                context.emit("delete:generalProfile", item.raw.id);
            }
        }

        const calculateDate = (dateA, dateB) => {
            const date1 = new Date(dateA);
            const date2 = new Date(dateB);
            const timeDifference = date2.getTime() - date1.getTime();
            return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        }
        const addGeneralProfile = () => {
            context.emit("add:generalProfile", { isDelete: 0, isEpired: 0 });
            dialog.value = false;
        }
        const goAdd = () => {
            router.push({ name: "temporary_residence_profile.add" });
        }
        const dialog = ref(false);
        const setDialog = (status) => {
            dialog.value = status;
        }
        return {
            formatDateTime,
            formatDate,
            itemsPerPage,
            headers,
            deleteItem,
            searchText,
            dataSource,
            items,
            calculateDate,
            goAdd,
            addGeneralProfile,
            dialog, setDialog
        }
    }
});
</script>
<style>
.general-profile-component {
    .table-search {
        border: 1px solid gainsboro;
        background: white;
        outline: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 15px;
    }

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
}
</style>