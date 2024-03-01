<template>
    <div class="type-notification-component">
        <h2 class="title my-3">LOẠI THÔNG BÁO</h2>
        <div class="bg-white">
            <v-breadcrumbs :items="items">
                <template v-slot:title="{ item }">
                    {{ item.title.toUpperCase() }}
                </template>

            </v-breadcrumbs>
        </div>
        <div class="d-flex align-center justify-content-between mb-2">
            <v-dialog max-width="500px" v-model="dialog">
                <template v-slot:activator="{ props }">
                    <button class="btn btn-primary" v-bind="props" @click="resetData">
                        <i class="fas fa-plus"></i>
                        Thêm loại thông báo
                    </button>
                </template>
                <v-card class="p-4">
                    <h3 class="text-center">{{ titleDialog }}</h3>
                    <Form :validation-schema="formSchema" @submit="submitForm">
                        <!-- <input type="hidden" v-model="id"> -->
                        <div class="form-group">
                            <label for="name">Tên loại thông báo</label>
                            <Field type="text" class="form-control" id="name" name="name" v-model="local.name"
                                placeholder="Tên loại thông báo" />
                            <ErrorMessage name="name" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-primary py-1 mr-2">
                                <i class="fas fa-save"></i>
                                Lưu
                            </button>
                            <button type="button" class="btn btn-primary py-1" @click="togggleDialog(false)">
                                Huỷ
                            </button>
                        </div>
                    </form>
                </v-card>
            </v-dialog>
            <input type="text" name="search" v-model="searchText" class="table-search my-2" placeholder="Tìm kiếm .....">
        </div>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="dataSource" item-value="name"
            class="elevation-1" :loading="false" loading-text="Loading... Chờ đợi trong giây lát">
            <template v-slot:item.index="{ item }">
                {{ item.index + 1 }}
            </template>
            <template v-slot:item.createdAt="{ item }">
                {{ formatDateTime(item.raw.createdAt) }}
            </template>
            <template v-slot:item.updatedAt="{ item }">
                <div v-if="item.raw.updatedAt != null">
                    {{ formatDateTime(item.raw.updatedAt) }}
                </div>
                <i v-else class="text-grey">
                    Chưa cập nhật
                </i>
            </template>
            <template v-slot:item.isActive="{ item }">
                <v-switch :loading="false" color="success" :model-value="item.raw.isActive == 1 ? true : false"
                    :label="item.raw.isActive == 1 ? 'Bật' : 'Tắt'" hide-details @click="changeStatus(item)"></v-switch>
            </template>
            <template v-slot:item.actions="{ item }">
                <button class="btn btn-warning mr-2 py-0" @click="editItem(item)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger py-0" @click="deleteItem(item)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import { defineComponent, ref, computed, reactive } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs'
import { VCard, VIcon, VBreadcrumbs, VDialog, VSwitch } from 'vuetify/lib/components/index.mjs';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default defineComponent({
    components: {
        VDataTable,
        VCard,
        VIcon,
        VBreadcrumbs,
        VDialog,
        VSwitch,
        Form, Field, ErrorMessage,
    },
    props: {
        data: { type: Array, default: [] }
    },
    emits: [
        "add:typeNotification",
        "update:typeNotification",
        "delete:typeNotification",
    ],
    setup(props, context) {
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
        const itemsPerPage = ref(5);
        const items = ref([
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'Loại thông báo',
                disabled: true,
                href: 'type-notification',
            },
        ])
        const headers = [
            {
                title: 'STT',
                align: 'start',
                sortable: false,
                key: 'index',
            },
            { title: 'Tên', key: 'name' },
            { title: 'Ngày khởi tạo', key: 'createdAt' },
            { title: 'Ngày cập nhật', key: 'updatedAt' },
            { title: 'Trạng thái', key: 'isActive' },
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
        const titleDialog = ref("THÊM LOẠI THÔNG BÁO");
        const id = ref(-1);
        const resetData = () => {
            titleDialog.value = "THÊM LOẠI THÔNG BÁO";
            id.value = -1;
            local.value.name = "";
        }

        const dialog = ref(false);
        const togggleDialog = (status) => {
            dialog.value = status;
        }
        const editItem = (item) => {
            titleDialog.value = "SỬA LOẠI THÔNG BÁO";
            id.value = item.raw.id;
            console.log(id.value);
            local.value.name = item.columns.name;
            dialog.value = true;
        }
        const deleteItem = (item) => {
            if (confirm("Bạn có chắc muốn xoá")) {
                context.emit("delete:typeNotification", item.raw.id);
            }
        }
        const local = ref({
            name: "",
        })
        const formSchema = yup.object().shape({
            name: yup.string().required("Tên không được để trống."),
        });
        const submitForm = () => {
            if (id.value == -1) {
                context.emit('add:typeNotification', local.value);
                dialog.value = false;
            }
            else {
                context.emit("update:typeNotification", id.value, local.value);
                dialog.value = false;
            }
        }
        const changeStatus = (item) => {
            context.emit("update:typeNotification", item.raw.id, { "name": item.raw.name, "isActive": item.raw.isActive == 1 ? 0 : 1 })
        }
        return {
            formatDateTime,
            itemsPerPage,
            headers,
            editItem,
            deleteItem,
            searchText,
            dataSource,
            items,
            dialog,
            togggleDialog,
            formSchema,
            local,
            submitForm,
            titleDialog,
            resetData,
            changeStatus,
        }
    }
});
</script>
<style>
.type-notification-component {
    .table-search {
        border: 1px solid gainsboro;
        background: white;
        outline: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 15px;
    }

    .title {
        font-size: 30px;
    }
}
</style>