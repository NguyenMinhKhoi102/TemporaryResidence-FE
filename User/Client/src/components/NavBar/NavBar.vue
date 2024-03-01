<template>
    <div class="navbar-component">
        <div class="nav">
            <div class="nav-header">
                <div class="nav-logo" @click="alert1('Bạn đã click vào logo')">
                    <img src="@/assets/images/temporary-residence-darkblue.png" alt="" loading="lazy">
                    <div class="nav-title">
                        <div>Cổng tạm trú</div>
                        <div class="nav-subtitle">
                            Cung cấp các dịch vụ, thông tin liên quan đến các vấn đề tạm trú
                        </div>
                    </div>
                </div>
                <div class="nav-info">
                    <!-- <div class="nav-auth">
                        <div @click="alert1('Bạn đã click vào nút đăng ký')" class="nav-element nav-element__signup">
                            Đăng ký
                        </div>
                        <div @click="alert1('Bạn đã click vào nút đăng nhập')" class="nav-element nav-element__signin">
                            Đăng nhập
                        </div>
                    </div> -->
                    <div>
                        <v-menu transition="scale-transition">
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="nav-info__user">
                                    <img src="https://vtv1.mediacdn.vn/zoom/640_400/2022/3/4/avatar-jake-neytiri-pandora-ocean-1646372078251163431014-crop-16463720830272075805905.jpg"
                                        class="circle-avatar">
                                    <div class="info">Nguyễn Minh Khôi</div>
                                    <i class="fa fa-caret-down"></i>
                                </div>
                            </template>

                            <v-list class="list-item">
                                <v-list-item class="list-item" @click="goToMyInfo">
                                    <i class="fas fa-user"></i> Thông tin
                                </v-list-item>
                                <v-list-item class="list-item" @click="signOut">
                                    <i class="fas fa-sign-out"></i> Đăng xuất
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
            <ul class="nav-main">
                <li @click="goToMyInfo"><i class="fa fa-home"></i></li>
                <li>Giới thiệu</li>
                <li @click="goToInfoAndService">Thông tin và dịch vụ</li>
                <li>Hỗ trợ</li>
            </ul>
        </div>
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
        <div class="footer mt-5">
            <div>http://congtamtru.com</div>
            <div>
                &copy; Bản quyền thuộc về Nguyễn Minh Khôi B1910241
            </div>
            <div>Email: congtamtru@gmail.com</div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { VMenu, VList, VListItem, VListItemTitle, VBtn } from "vuetify/lib/components/index.mjs"
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        VMenu,
        VList,
        VListItem,
        VListItemTitle,
        VBtn,
    },
    emits: ["signOut:signOut"],
    setup(props, context) {
        const items = [
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
        ];
        const alert1 = (str) => {
            alert(str);
        }
        const router = useRouter();
        const signOut = () => {
            context.emit("signOut:signOut");
        }
        const goToMyInfo = () => {
            router.push({ name: "home.myInfo" });
        }
        const goToInfoAndService = () => {
            router.push({ name: "info_and_service" });
        }
        return {
            items,
            alert1,
            signOut,
            goToMyInfo,
            goToInfoAndService,
        }
    }
});

</script>

<style>
:root {
    --pink_lotus: #cf0068;
    --white: #fff;
}

.navbar-component {
    /* .nav {
        
    } */

    .nav-header {
        padding: 10px 100px;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .nav-logo {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        cursor: pointer;
    }

    .nav-logo img {
        height: 100%;
    }



    .nav-title {
        color: var(--pink_lotus);
        font-size: 30px;
        font-weight: bold;
    }

    .nav-subtitle {
        font-size: 15px;
        font-weight: lighter;
    }

    .nav-auth {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .nav-element {
        width: 130px;
        text-align: center;
        padding-block: 5px;
        border: 2px solid var(--pink_lotus);
        border-radius: 20px;
        color: var(--pink_lotus);
        font-size: 17px;
        font-weight: bold;
        transition: all 0.2s linear;
        cursor: pointer;
    }

    .nav-element:hover {
        background-color: var(--pink_lotus);
        color: var(--white);
    }

    .nav-info__user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0 10px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s linear;
        padding: 0 10px;
        border-radius: 5px;
    }

    .nav-info__user:hover {
        background-color: gainsboro;

    }

    .circle-avatar {
        width: 40px;
        height: 40px;
        border-radius: 100rem;
        border: 2px solid var(--pink_lotus);
        margin: 5px;

    }

    .nav-main {
        width: 100%;
        background-color: whitesmoke;
        padding: 0 100px;
        display: flex;
        align-items: center;
        gap: 20px;
        font-weight: 700;
        font-size: 20px;
    }

    .nav-main li {
        list-style: none;
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s linear;
    }

    .nav-main li:hover {
        background-color: var(--pink_lotus);
        color: var(--white);
    }

    .nav-footer {
        width: 100%;
        padding: 0 100px;
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 17px;
        font-weight: 600;
    }

    .nav-footer li {
        list-style: none;
    }

    .nav-footer li:nth-child(odd) {
        cursor: pointer;
        transition: all 0.2s linear;
    }

    .nav-footer li:nth-child(even) {
        color: gainsboro;
    }

    .nav-footer li:nth-child(odd):hover {
        color: var(--pink_lotus);
    }

    /* .list-item {
        color: gray;
        cursor: pointer;
        background-color: #cf0068;
    } */

    /* .list-item:hover {
        background-color: gainsboro;
    } */

    .footer {
        border-top: 1px solid var(--pink_lotus);
        background-color: #e521830d;
        color: #000;
        height: 50px;
        font-size: 18px;
        font-weight: 200;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}
</style>