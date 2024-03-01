<template>
    <div class="my-info-component">
        <h4 class="font-weight-bold mb-4 mt-3">Thông tin cá nhân</h4>
        <div class="mx-5">
            <div class="row m-0 px-4">
                <div class="col-4">Họ và tên:</div>
                <div class="col-8 text-uppercase">{{ data.name }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Số ĐDCN(CCCD)/CMND:</div>
                <div class="col-8">{{ data.cccd }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Giới tính:</div>
                <div class="col-8">{{ data.gender }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Ngày sinh:</div>
                <div class="col-8">{{ data.birthday }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Địa chỉ thường trú</div>
                <div class="col-8">{{ data.address }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Nơi ở hiện tại:</div>
                <div class="col-8">{{ data.address }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Số điện thoại:</div>
                <div class="col-8">{{ data.phone }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Email:</div>
                <div class="col-8">{{ data.email }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Nghề nghiệp:</div>
                <div class="col-8">{{ data.job }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
            <div class="row m-0 px-4">
                <div class="col-4">Nơi làm việc:</div>
                <div class="col-8">{{ data.workPlace }}</div>
            </div>
            <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { VDivider } from "vuetify/lib/components/index.mjs";
export default defineComponent({
    components: {
        VDivider
    },
    setup(props, context) {
        const data = ref({});
        const formatDateString = (inputDateString) => {
            const dateObject = new Date(inputDateString);
            if (isNaN(dateObject.getTime())) {
                return '';
            }
            const day = dateObject.getDate().toString().padStart(2, '0');
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObject.getFullYear();

            return `${day}-${month}-${year}`;
        };
        data.value.name = window.localStorage.getItem("name");
        data.value.cccd = window.localStorage.getItem("cccd");
        data.value.birthday = formatDateString(window.localStorage.getItem("birthday"));
        data.value.gender = window.localStorage.getItem("gender") == 1 ? "Nam" : "Nữ";
        data.value.address = window.localStorage.getItem("address");
        data.value.phone = window.localStorage.getItem("phone");
        data.value.email = window.localStorage.getItem("email");
        data.value.job = window.localStorage.getItem("job");
        data.value.workPlace = window.localStorage.getItem("workPlace");

        console.log(data.value);
        return {
            data,
        }
    }
});
</script>
<style scoped>
.my-info-component {
    font-size: 14px;
}
</style>