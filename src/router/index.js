import { createWebHistory, createRouter } from "vue-router";
import LoginAdmin from "../views/auth/LoginAdmin.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Main from "../views/main/Main.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import HomeAdmin from "../views/admin/HomeAdmin.vue";
import CollectionAdmin from "../views/admin/CollectionAdmin.vue";
import DetailCollections from "../views/admin/DetailCollections.vue";
import CreateCollections from "../views/admin/CreateCollections.vue";

import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin/login",
      name: "LoginAdmin",
      component: LoginAdmin,
      meta: {
        title: "Login Admin",
        requiresGuest: true, // Hanya pengunjung yang belum login yang dapat mengakses halaman login
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["auth/isAuthenticated"];
        if (isAuthenticated) {
          // Jika pengguna sudah login, arahkan ke halaman yang sesuai dengan rolenya
          next("/");
        } else {
          // Menampilkan halaman loading selama 1 detik sebelum masuk ke komponen
          setTimeout(() => {
            next();
          }, 1000);
        }
      },
    },

    {
      path: "/",
      component: MainLayout,
      name: "MainLayout",
      meta: {
        title: "home",
      },
      children: [
        {
          path: "/",
          component: Main,
          name: "Main",
          meta: {
            title: "home",
          },
        },
      ],
    },

    {
      path: "/admin/dashboard",
      component: AdminLayout,
      name: "AdminLayout",
      meta: {
        title: "admin - dashboard",
        requiresLogin: true, // Hanya pengguna yang sudah login yang dapat mengakses halaman admin dashboard
      },
      children: [
        {
          path: "/admin/dashboard",
          component: HomeAdmin,
          name: "HomeAdmin",
          meta: {
            title: "admin - home",
          },
        },
        {
          path: "/admin/collection",
          component: CollectionAdmin,
          name: "CollectionAdmin",
          meta: {
            title: "collection",
          },
        },
        {
          path: "/admin/collection/:uuid",
          component: DetailCollections,
          name: "DetailCollections",
          meta: {
            title: "collection - detail",
          },
        },
        {
          path: "/admin/collection/create",
          component: CreateCollections,
          name: "CreateCollections",
          meta: {
            title: "collection - create",
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (to.meta.requiresLogin && !isAuthenticated) {
    // Redirect ke halaman login jika diperlukan login dan pengguna tidak terautentikasi
    next("/admin/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect ke halaman utama jika pengguna sudah login dan mencoba mengakses halaman login
    next("/");
  } else {
    // Continue with navigation
    next();
  }
});

export default router;
