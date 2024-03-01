<template>
    <div class="info-and-service-component">
        <div class="mb-4 nav2">
            <div @click="goToMyInfo" style="cursor: pointer;">Trang chủ</div>
            <i class="fa fa-angle-right"></i>
            <div>Thông tin và dịch vụ</div>
        </div>
        <ul>
            <li class="list-item" @click="goToRegister">
                <i class="fa-regular fa-file-lines icon"></i>
                Đăng ký tạm trú
            </li>
            <li class="list-item" @click="goToExtension">
                <i class="fa-regular fa-file-lines icon"></i>
                Gia hạn tạm trú
            </li>
            <li class="list-item" @click="goToDelete">
                <i class="fa-regular fa-file-lines icon"></i>
                Xoá đăng ký tạm trú
            </li>
        </ul>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup(props, context) {
        const router = useRouter();
        const goToRegister = () => {
            router.push({ name: "temporary_residence_register" });
        }
        const goToExtension = () => {
            router.push({ name: "temporary_residence_extension" });
        }
        const goToDelete = () => {
            router.push({ name: "temporary_residence_delete" });
        }
        const goToMyInfo = () => {
            router.push({ name: "home.myInfo" });
        }
        return {
            goToRegister,
            goToExtension,
            goToDelete,
            goToMyInfo,
        }
    }
});

</script>
<style>
.info-and-service-component {
    padding-inline: 100px;
    height: calc(100vh - 270px);

    .list-item {
        list-style: none;
        padding-left: 50px;
        padding-block: 10px;
        display: flex;
        align-items: center;
        gap: 30px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }

    .list-item:hover {
        background-color: gainsboro;
    }

    .icon {
        color: var(--pink_lotus);
        font-size: 30px;
    }

    .nav2 {
        display: flex;
        align-items: center;
        gap: 20px;

        .fa {
            color: rgb(170, 170, 170);
        }
    }
}
</style>