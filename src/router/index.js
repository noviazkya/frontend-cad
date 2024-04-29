import { createWebHistory, createRouter } from "vue-router";
import LoginAdmin from "../views/auth/LoginAdmin.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HomeMain from "../views/main/HomeMain.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import HomeAdmin from "../views/admin/HomeAdmin.vue";
import CollectionAdmin from "../views/admin/CollectionAdmin.vue";
import DetailCollections from "../views/admin/DetailCollections.vue";
import CreateCollections from "../views/admin/CreateCollections.vue";
import EditCollections from "../views/admin/EditCollections.vue";
import DetailCollectionsMain from "../views/main/DetailCollectionsMain.vue";
import InformationAdmin from "../views/admin/InformationAdmin.vue";
import DetailInformation from "../views/admin/DetailInformation.vue";
import CreateInformation from "../views/admin/CreateInformation.vue";
import EditInformation from "../views/admin/EditInformation.vue";
import BlogMain from "../views/main/BlogMain.vue";
import ContactMain from "../views/main/ContactMain.vue";
import GalleryMain from "../views/main/GalleryMain.vue";
import InfomationDetailMain from "../views/main/InfomationDetailMain.vue";


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
          component: HomeMain,
          name: "HomeMain",
          meta: {
            title: "home",
          },
        },
        {
          path: "/c/:collectionName/:uuid",
          component: DetailCollectionsMain,
          name: "DetailCollectionsMain",
          meta: {
            title: "detail collection",
          },
        },
        {
          path: "/blog",
          component: BlogMain,
          name: "BlogMain",
          meta: {
            title: "Blog",
          },
        },
        {
          path: "/contact",
          component: ContactMain,
          name: "ContactMain",
          meta: {
            title: "Contact",
          },
        },
        {
          path: "/gallery",
          component: GalleryMain,
          name: "GalleryMain",
          meta: {
            title: "Gallery",
          },
        },
        {
          path: "/i/:informationName/:uuid",
          component: InfomationDetailMain,
          name: "InfomationDetailMain",
          meta: {
            title: "information collection",
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
        {
          path: "/admin/collection/edit/:uuid",
          component: EditCollections,
          name: "EditCollections",
          meta: {
            title: "collection - Edit",
          },
        },
        {
          path: "/admin/information",
          component: InformationAdmin,
          name: "InformationAdmin",
          meta: {
            title: "Information",
          },
        },
        {
          path: "/admin/information/:uuid",
          component: DetailInformation,
          name: "DetailInformation",
          meta: {
            title: "Information",
          },
        },
        {
          path: "/admin/information/create",
          component: CreateInformation,
          name: "CreateInformation",
          meta: {
            title: "information - create",
          },
        },
        {
          path: "/admin/information/edit/:uuid",
          component: EditInformation,
          name: "EditInformation",
          meta: {
            title: "information - Edit",
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
    // Redirect ke halaman dashboard jika pengguna sudah login dan mencoba mengakses halaman login
    next("/admin/dashboard");
  } else {
    // Continue with navigation
    next();
  }
  document.title = "Contemporary - " + (to.meta.title || "Default Text")
});


export default router;
