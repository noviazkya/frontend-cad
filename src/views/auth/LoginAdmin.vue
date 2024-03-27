  <template>
    <div class="min-h-screen bg-purple-400 flex justify-center items-center overflow-hidden">
      <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-10 -left-20 z-0 transform rotate-45 hidden md:block"></div>
  <div class="absolute w-48 h-48 rounded-xl bg-purple-300 bottom-5 right-5 transform rotate-12 hidden md:block"></div>
      <form @submit.prevent="loginAdmin" class="py-8 px-8 md:px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Login Admin</h1>
          <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">enter admin email and password</p>
        </div>
        <div class="space-y-4">
          <input type="email" v-model="auth.email" placeholder="Email Address" class="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500" />
          <input type="password" v-model="auth.password" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500" />
        </div>
        <div class="text-center mt-6">
          <button type="submit" class="w-full py-2 text-xl text-white bg-purple-400 rounded-lg hover:bg-purple-500 transition-all">Login</button>
        </div>
      </form>
      <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
      <div class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  </template>
  <script>
  import { ElLoading } from 'element-plus';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        auth: {
          email: '',
          password: '',
        },
        loadingInstance: null,
      };
    },
    computed: {
      ...mapGetters('auth', [ 'isAuthenticated']),
    },
    methods: {
      ...mapActions('auth', ['login']),
      async loginAdmin() {
        const credentials = {
          email: this.auth.email,
          password: this.auth.password,
        };

        try {
          // Menampilkan loading full screen dengan delay 5 detik
          this.loadingInstance = ElLoading.service({
            fullscreen: true,
            text: 'Logging in...', // Teks yang ditampilkan pada loading
          });

          // Menambahkan delay 5 detik sebelum melanjutkan
          await new Promise((resolve) => setTimeout(resolve, 5000));

          const success = await this.$store.dispatch('auth/login', credentials);

          if (success) {
            // Redirect ke halaman setelah login sukses
            this.$router.push({ name: 'HomeAdmin' });
          }
        } catch (error) {
          console.error('An error occurred during login', error);
        } finally {
          // Sembunyikan loading setelah login selesai
          if (this.loadingInstance) {
            this.loadingInstance.close();
          }
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      document.title = 'Cad - ' + (to.meta.title || 'Teks Default');
      next();
    },

    beforeRouteUpdate(to, from, next) {
      document.title = 'Cad - ' + (to.meta.title || 'Teks Default');
      next();
    },
  };
  </script>