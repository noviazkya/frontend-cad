import { createWebHistory, createRouter } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Main from "../views/main/Main.vue";
// import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/admin/login",
    //   name: "LoginAdmin",
    //   component: LoginAdmin,
    //   meta: {
    //     title: "Login Admin",
    //   },
    //   beforeEnter: (to, from, next) => {
    //     const isAuthenticated = store.getters["auth/isAuthenticated"];
    //     if (isAuthenticated) {
    //       // Jika pengguna sudah login, arahkan ke halaman yang sesuai dengan rolenya
    //       const role = localStorage.getItem("role");
    //       if (role === "admin") {
    //         next("/admin/dashboard");
    //       } else {
    //         next("/");
    //       }
    //     } else {
    //       // Menampilkan halaman loading selama 1 detik sebelum masuk ke komponen
    //       setTimeout(() => {
    //         next();
    //       }, 1000);
    //     }
    //   },
    // },

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

  ],
});

// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = store.getters["auth/isAuthenticated"];
//   const role = localStorage.getItem("role");


//   if (to.meta.requiresLogin && !isAuthenticated) {
//     // Redirect ke halaman login jika diperlukan login dan pengguna tidak terautentikasi
//     next("/admin/login");
//   } else if (to.meta.requiresAdmin && role !== "admin") {
//     // Redirect ke halaman dashboard admin jika diperlukan admin dan pengguna bukan admin
//     next("/admin/dashboard");
//   } else if (to.meta.requiresUser && role !== "user") {
//     // Redirect ke halaman home jika diperlukan user dan pengguna bukan user
//     next("/");
//   } else {
//     // Continue with navigation
//     next();
//   }
// });

export default router;