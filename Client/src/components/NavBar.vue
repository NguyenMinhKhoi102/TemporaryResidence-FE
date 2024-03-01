<template>
    <div class="navbar-admin">
        <v-card>
            <v-layout>
                <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
                    <div class="logo">
                        <img :style="{ 'max-width': rail ? '35px' : '50px' }"
                            src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                            alt="">
                        <div class="logo-title">CongTamTru.com</div>
                    </div>

                    <v-divider class="border-opacity-100"></v-divider>

                    <v-list dense nav>
                        <v-list-item class="list-item no-wrap-text mb-3" value="Dashboard" color="gainsboro"
                            @click="goToDashBoard">
                            <i class="fas fa-desktop pre-icon pre-icon__purple"></i>
                            Dashboard
                        </v-list-item>
                        <v-list-item class="list-item no-wrap-text mb-3" value="map" color="gainsboro" @click="goToMap">
                            <i class="fas fa-earth-americas pre-icon pre-icon__orange"></i>
                            Bản đồ số
                        </v-list-item>
                        <v-list-item class="list-item no-wrap-text mb-3" value="account" color="gainsboro"
                            @click="goToAccounts">
                            <i class="fas fa-users pre-icon pre-icon__yellow"></i>
                            Quản lý tài khoản
                        </v-list-item>
                        <v-list-item class="list-item no-wrap-text mb-3" value="temporaryResidenceProfile" color="gainsboro"
                            @click="goToTemporaryResidenceProfile">
                            <i class="fas fa-address-card pre-icon pre-icon__purple"></i>
                            Hồ sơ tạm trú
                        </v-list-item>
                        <v-list-group value="Handle">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" class="list-item no-wrap-text mb-3" value="area"
                                    color="gainsboro">
                                    <i class="fas fa-list pre-icon pre-icon__purple"></i>
                                    Quản lý khu vực
                                </v-list-item>
                            </template>
                            <v-list-item class="list-item no-wrap-text mb-3" value="province" color="gainsboro"
                                @click="goToProvince">
                                <i class="fa-solid fa-city pre-icon pre-icon__purple"></i>
                                Tỉnh/Thành phố
                            </v-list-item>
                            <v-list-item class="list-item no-wrap-text mb-3" value="district" color="gainsboro"
                                @click="goToDistrict">
                                <i class="fas fa-building pre-icon pre-icon__purple"></i>
                                Quận/Huyện
                            </v-list-item>
                            <v-list-item class="list-item no-wrap-text mb-3" value="ward" color="gainsboro"
                                @click="goToWard">
                                <i class="fa-regular fa-building pre-icon pre-icon__purple"></i>
                                Phường/Xã
                            </v-list-item>
                        </v-list-group>
                        <v-list-group value="Categories">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" class="list-item no-wrap-text mb-3" value="logout"
                                    color="gainsboro">
                                    <i class="fas fa-list pre-icon pre-icon__purple"></i>
                                    Danh mục
                                </v-list-item>
                            </template>
                            <v-list-item class="list-item no-wrap-text mb-3" value="typeProfile" color="gainsboro"
                                @click="goToTypeProfile">
                                <i class="fas fa-table-cells-large pre-icon pre-icon__purple"></i>
                                Loại hồ sơ
                            </v-list-item>
                            <v-list-item class="list-item no-wrap-text mb-3" value="typeNotification" color="gainsboro"
                                @click="goToTypeNotification">
                                <i class="fas fa-table-cells-large pre-icon pre-icon__purple"></i>
                                Loại thông báo
                            </v-list-item>
                            <v-list-item class="list-item no-wrap-text mb-3" value="receiveResult" color="gainsboro"
                                @click="goToReceiveResult">
                                <i class="fa-regular fa-share-from-square pre-icon pre-icon__purple"></i>
                                Hình thức nhận
                            </v-list-item>
                        </v-list-group>

                    </v-list>
                    <template v-slot:append>
                        <v-divider class="border-opacity-50"></v-divider>
                        <v-list dense nav>
                            <v-list-item class="list-item no-wrap-text mb-3" value="logout" color="gainsboro">
                                <i class="fas fa-sign-out pre-icon pre-icon__purple"></i>
                                Sign out
                            </v-list-item>
                        </v-list>
                    </template>
                </v-navigation-drawer>
                <v-main>
                    <div class="main">
                        <div class="background"></div>
                        <div class="header">
                            <div class="header-bars" @click.stop="rail = !rail">
                                <i class="fas fa-bars"></i>
                            </div>
                            <div class="header-right">
                                <div class="header-search">
                                    <input type="text" class="search" id="search">
                                    <label for="search"><i class="fas fa-search"></i></label>
                                </div>

                                <div class="header-info">
                                    <img class="avatar"
                                        src="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                                        alt="">
                                    <div>Nguyễn Minh Khôi</div>
                                </div>
                            </div>
                        </div>
                        <div class="main-container">
                            <router-view v-slot="{ Component }">
                                <component :is="Component" />
                            </router-view>
                        </div>

                    </div>
                </v-main>
            </v-layout>
        </v-card>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { VCard, VLayout, VNavigationDrawer, VListItem, VDivider, VBtn, VList, VMain, VAvatar, VImg, VListGroup } from 'vuetify/lib/components/index.mjs';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        VCard,
        VLayout,
        VNavigationDrawer,
        VListItem,
        VDivider,
        VBtn,
        VList,
        VMain,
        VAvatar,
        VImg,
        VListGroup
    },
    setup() {
        const drawer = ref(true);
        const rail = ref(false);
        const router = useRouter();
        const goToDashBoard = () => {
            router.push({ name: "dashboard" });
        }
        const goToMap = () => {
            router.push({ name: "map" });
        }
        const goToTemporaryResidenceProfile = () => {
            router.push({ name: "temporary_residence_profile" });
        }
        const goToGeneralProfile = () => {
            router.push({ name: "general_profile" });
        }
        const goToAccounts = () => {
            router.push({ name: "accounts" });
        }
        const goToTypeNotification = () => {
            router.push({ name: "type_notification" });
        }
        const goToTypeProfile = () => {
            router.push({ name: "type_profile" });
        }
        const goToReceiveResult = () => {
            router.push({ name: "receive_result" });
        }
        const goToProvince = () => {
            router.push({ name: "provinces" });
        }
        const goToDistrict = () => {
            router.push({ name: "districts" });
        }
        const goToWard = () => {
            router.push({ name: "wards" });
        }
        return {
            drawer,
            rail,
            goToDashBoard, goToMap, goToTemporaryResidenceProfile, goToGeneralProfile,
            goToAccounts, goToTypeNotification, goToTypeProfile, goToReceiveResult,
            goToProvince, goToDistrict, goToWard,
        }
    }
});

</script>
<style>
.navbar-admin {
    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 0 0 10px;
        margin-bottom: 30px;
    }

    .logo img {
        /* width: 50px; */
        max-width: 50px;
        border-radius: 10px;
        transition: max-width 0.2s linear;
    }

    .no-wrap-text {
        white-space: nowrap;
        color: grey;
        font-weight: 600;
    }

    /* .list-item {
        /* padding-block: 10px; */
    /* } */

    .title {
        font-weight: bold;
        white-space: nowrap;
        font-size: 22px;
    }

    .v-navigation-drawer {
        background: #1b2034;
        color: white;
    }

    .header {
        height: 50px;
        display: flex;
        align-items: center;
        position: sticky;
        position: -webkit-sticky;
        justify-content: space-between;
        top: 0;
        z-index: 10000;
    }

    .background {
        /* background-image: linear-gradient(to right, rgb(0, 233, 140), rgb(0, 216, 216)); */
        background-color: #1b2034;
        height: 50px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .main {
        background-color: whitesmoke;
        padding-inline: 30px;
        width: 100%;
        height: 100vh;
        overflow: auto;
    }


    .header-bars {
        /* height: calc(100% - 10px); */
        width: 23px;
        color: white;
        font-size: 25px;
        /* background-color: black; */
        display: flex;
        align-items: center;
        /* margin-left: 10px; */
        transition: all 0.2s linear;
        cursor: pointer;
    }

    .header-bars:hover {
        text-shadow: 1px 2px 10px black;
    }

    .header-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .header-search {
        position: relative;
        height: 100%;
        padding-block: 10px;
    }

    .header-search label {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
    }

    .search {
        border: 1px solid white;
        outline: none;
        border-radius: 20px;
        height: 100%;
        width: 200px;
        font-size: 12px;
        padding-left: 40px;
        margin-right: 20px;
        color: white;
    }

    .header-info {
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin-right: 20px; */
        font-weight: bold;
        color: white;
    }

    .header-info .avatar {
        width: 30px;
        height: 30px;
        border-radius: 100rem;
        background-color: blue;
        margin-right: 10px;
    }

    .main-container {
        position: relative;
        width: 100%;
    }

    .pre-icon {
        min-width: 22px;
        text-align: center;
        font-size: 20px;
        margin-right: 20px;
    }

    .pre-icon__orange {
        color: rgb(255, 118, 68);
    }

    .pre-icon__purple {
        color: rgb(103, 80, 255);
    }

    .pre-icon__yellow {
        color: rgb(217, 217, 0);
    }

    .v-list-item {
        color: white
    }
}
</style>