import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/Test.vue"),
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/components/NavBar.vue"),
        children: [
            {
                path: "/",
                name: "dashboard",
                component: () => import("@/components/Dashboard.vue"),
            },
            {
                path: "/map",
                name: "map",
                component: () => import("@/views/Map.vue"),
            },
            {
                path: "/temporary-residence-profile",
                name: "temporary_residence_profile",
                component: () => import("@/views/TemporaryResidenceProfile/TemporaryResidenceProfile.vue"),
                props: true,
            },
            {
                path: "/temporary-residence-profile/edit/:id",
                name: "temporary_residence_profile.edit",
                component: () => import("@/views/TemporaryResidenceProfile/TemporaryResidenceProfileEdit.vue"),
                props: true,
            },
            {
                path: "/type-notification",
                name: "type_notification",
                component: () => import("@/views/TypeNotification/TypeNotification.vue"),
                props: true,
            },
            {
                path: "/type-profile",
                name: "type_profile",
                component: () => import("@/views/TypeProfile/TypeProfile.vue"),
                props: true,
            },
            {
                path: "/receive-result",
                name: "receive_result",
                component: () => import("@/views/ReceiveResult/ReceiveResult.vue"),
                props: true,
            },
            {
                path: "/provinces",
                name: "provinces",
                component: () => import("@/views/Provinces/Provinces.vue"),
                props: true,
            },
            {
                path: "/districts",
                name: "districts",
                component: () => import("@/views/Districts/Districts.vue"),
                props: true,
            },
            {
                path: "/wards",
                name: "wards",
                component: () => import("@/views/Wards/Wards.vue"),
                props: true,
            },
            {
                path: "/general-profile",
                name: "general_profile",
                component: () => import("@/views/GeneralProfile/GeneralProfile.vue"),
                props: true,
            },
            {
                path: "/accounts",
                name: "accounts",
                component: () => import("@/views/Accounts/Accounts.vue"),
                props: true,
            },
            {
                path: "/general-profile/edit/:id",
                name: "general_profile.edit",
                component: () => import("@/views/GeneralProfile/GeneralProfileEdit.vue"),
                props: true,
            },
        ]
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;