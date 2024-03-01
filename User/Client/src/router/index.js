import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/Auth/SignIn.vue"),
  },
  {
    path: '/',
    name: 'navbar',
    component: () => import("../views/NavBar/NavBar.vue"),
    props: true,
    children: [
      {
        path: "/info-and-service",
        name: "info_and_service",
        component: () => import("../views/InfoAndService/InfoAndService.vue"),
        props: true,
      },
      {
        path: "/",
        name: "home",
        component: () => import("../views/TemporaryResidenceInfo/TemporaryResidenceInfo.vue"),
        props: true,
        children: [
          {
            path: "/",
            name: "home.myInfo",
            component: () => import("../views/MyInfo/MyInfo.vue"),
            props: true,
          },
          {
            path: "/profile-expired",
            name: "home.profileExpired",
            component: () => import("../views/ProfileExpired/ProfileExpired.vue"),
            props: true,
          },
          {
            path: "/profile-not-expired",
            name: "home.profileNotExpired",
            component: () => import("../views/ProfileNotExpired/ProfileNotExpired.vue"),
            props: true,
          },
          {
            path: "/profile-save",
            name: "home.profileSave",
            component: () => import("../views/ProfileWait/ProfileWait.vue"),
            props: true,
          },
          {
            path: "/history",
            name: "home.history",
            component: () => import("../views/ProfileHistory/ProfileHistory.vue"),
            props: true,
          },
          {
            path: "/notification",
            name: "home.notification",
            component: () => import("../views/ProfileNotification/ProfileNotification.vue"),
            props: true,
          },
        ]
      },
      {
        path: "/temporary-residence/register",
        name: "temporary_residence_register",
        component: () => import("../views/TemporaryResidence/TemporaryResidence.vue"),
        props: true,
      },
      {
        path: "/temporary-residence/additional/:id",
        name: "temporary_residence_additional",
        component: () => import("../views/TemporaryResidence/TemporaryResidenceAdditional.vue"),
        props: true,
      },
      {
        path: "/temporary-residence/extension",
        name: "temporary_residence_extension",
        component: () => import("../views/TemporaryResidence/TemporaryResidenceExtension.vue"),
        props: true,
      },
      {
        path: "/temporary-residence/extension/:id",
        name: "temporary_residence_extension.edit",
        component: () => import("../views/TemporaryResidence/TemporaryResidenceExtensionEdit.vue"),
        props: true,
      },
      {
        path: "/temporary-residence/delete",
        name: "temporary_residence_delete",
        component: () => import("../views/TemporaryResidence/DeleteTemporaryResidence.vue"),
        props: true,
      },
    ]
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.name !== "signin" && to.name !== "signup" && !isAuthenticated) {
    next({ name: "signin" });
  } else {
    next();
  }
});

export default router
