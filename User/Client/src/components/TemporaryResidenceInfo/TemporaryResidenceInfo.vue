<template>
    <div class="temporary-residence-info-component">
        <div class="row m-0 pb-4">
            <div class="col-3 trtrnav">
                <div class="trnav-header">
                    <div class="trnav-avatar">
                        <img class="trnav-avatar"
                            src="https://vtv1.mediacdn.vn/zoom/640_400/2022/3/4/avatar-jake-neytiri-pandora-ocean-1646372078251163431014-crop-16463720830272075805905.jpg"
                            alt="">
                    </div>
                    <div class="trnav-name">NGUYỄN MINH KHÔI</div>
                </div>
                <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
                <div class="trnav-info-profile">
                    <div class="trnav-element">
                        <div style="font-size: 30px;" class="text-success font-weight-bold">{{ number2.length }}</div>
                        <div class="px-2 text-center">Số hồ sơ đã xử lý</div>
                    </div>
                    <div class="trnav-element">
                        <div style="font-size: 30px;" class="text-warning font-weight-bold">{{ number1.length }}</div>
                        <div class="px-2 text-center">Số hồ sơ chờ xử lý</div>
                    </div>
                </div>
                <v-divider class="border-opacity-75" thickness="2" color="primary"></v-divider>
                <div class="trnav-body">
                    <v-list>
                        <v-list-item value="info-user" @click="goToMyInfo">
                            <i class="fas fa-user icon"></i>
                            <span class="trnav-title">Thông tin cá nhân</span>
                        </v-list-item>
                        <v-list-group>
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" value="my-profile">
                                    <i class="fas fa-folder-tree icon"></i>
                                    <span class="trnav-title">Hồ sơ của tôi</span>
                                </v-list-item>
                            </template>
                            <v-list-item value="profile-expired" @click="goToProfileExpired">
                                <i class="fa-regular fa-folder icon"></i>
                                Hồ sơ còn hạn
                            </v-list-item>
                            <v-list-item value="profile-not-expired" @click="goToProfileNotExpired">
                                <i class="fa-regular fa-folder-closed icon"></i>
                                Hồ sơ hết hạn
                            </v-list-item>
                        </v-list-group>
                        <v-list-item value="profile-wait" @click="goToProfileWait">
                            <i class="fas fa-address-card icon"></i>
                            <span class="trnav-title">Hồ sơ đã lưu</span>
                        </v-list-item>
                        <v-list-item value="profile-history" @click="goToHistory">
                            <i class="fas fa-box-archive icon"></i>
                            <span class="trnav-title">Lịch sử tạm trú</span>
                        </v-list-item>
                        <v-list-item value="notification" @click="goToNotification">
                            <!-- <v-badge content="1" class=""> -->
                            <i class="fas fa-bell icon__red"></i>
                            <!-- </v-badge> -->
                            <span class="trnav-title">Thông báo</span>
                        </v-list-item>
                    </v-list>
                </div>
            </div>
            <div class="col-9 pl-4 trmain">
                <div class="trmain-header mb-3">
                    <div class="trmain-icon">
                        <i :class="dataNav.icon"></i>
                    </div>
                    <div class="trmain-title">{{ dataNav.title }}</div>
                </div>
                <div class="trmain-body w-100">
                    <router-view v-slot="{ Component }">
                        <component :is="Component" />
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { VAvatar, VDivider, VList, VListItem, VListGroup, VBadge } from "vuetify/lib/components/index.mjs";
import { useRouter } from 'vue-router';
import generalProfileService from "../../services/generalProfile.service";
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    components: {
        VAvatar, VDivider, VList, VListItem, VListGroup, VBadge
    },
    setup(props, context) {
        const indexNav = ref(0);
        const router = useRouter();
        const dataNav = ref({
            icon: "fa-regular fa-id-badge",
            title: "Thông tin cá nhân"
        });
        const goToMyInfo = () => {
            dataNav.value = {
                icon: "fa-regular fa-id-badge",
                title: "Thông tin cá nhân"
            };
            router.push({ name: "home.myInfo" });
        }
        const goToProfileExpired = () => {
            dataNav.value = {
                icon: "fa-regular fa-folder-open",
                title: "Hồ sơ còn hạn"
            };
            router.push({ name: "home.profileExpired" });
        }
        const goToProfileNotExpired = () => {
            dataNav.value = {
                icon: "fa-regular fa-folder-open",
                title: "Hồ sơ hết hạn"
            };
            router.push({ name: "home.profileNotExpired" });
        }
        const goToProfileWait = () => {
            dataNav.value = {
                icon: "fa-regular fa-folder-open",
                title: "Hồ sơ chờ xử lý"
            };
            router.push({ name: "home.profileSave" });
        }
        const goToHistory = () => {
            dataNav.value = {
                icon: "fas fa-box-archive",
                title: "Lịch sử"
            };
            router.push({ name: "home.history" });
        }
        const goToNotification = () => {
            dataNav.value = {
                icon: "fas fa-bell",
                title: "Thông báo"
            };
            router.push({ name: "home.notification" });
        }
        const number1 = ref(0);
        const number2 = ref(0);
        const progressCircular = usePropressCircular();
        let data = [];
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data = await generalProfileService.getAllByUserIdAndIsCopy(0);
                console.log(data);
                number1.value = data.filter(e => {
                    return e.status == 0
                });
                number2.value = data.filter(e => {
                    return e.status != 0;
                });
                console.log(number1.value.length, number2.value.length);
                // tempData.value = data;
                // console.log(tempData.value);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            number1, number2,
            indexNav,
            dataNav,
            goToMyInfo, goToProfileExpired, goToProfileNotExpired,
            goToProfileWait, goToHistory, goToNotification,
        }
    }
});
</script>
<style scoped>
.temporary-residence-info-component {
    padding-inline: 100px;

    .v-badge {
        z-index: 99999;
    }

    .trtrnav {
        border: 1px solid gainsboro;
    }

    .trnav-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px 0;
        padding-block: 20px;
    }

    .trnav-avatar {
        width: 80px;
        height: 80px;
        border-radius: 100rem;
    }

    .trnav-name {
        font-weight: bold;
        font-size: 20px;
    }

    .trnav-info-profile {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .trnav-element {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 18px;
            font-weight: 600;
        }

        .trnav-element:first-child {
            border-right: 2px solid rgba(220, 220, 220, 0.659);
        }
    }

    .trnav-title {
        font-weight: 600;
        font-size: 17px;
    }

    .icon,
    .icon__red {
        color: rgb(212, 175, 133);
        font-size: 20px;
        margin-right: 20px;
    }

    .icon__red {
        color: rgb(255, 0, 0);
    }

    .trmain-header {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 0 10px;
    }

    .trmain-icon {
        width: 150px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        background-color: #e52183c8;
        color: white;
    }

    .trmain-title {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 20px;
        font-size: 30px;
        font-weight: 700;
        background-color: #e521830d;
    }

}
</style>