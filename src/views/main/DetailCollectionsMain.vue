<template>
  <div class="mt-2">
    <div class="container mx-auto mt-20">
      <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Kembali
      </button>
    </div>
    <div class="flex ml-auto justify-center items-center">
      <!-- Flex item pertama (01) -->
      <div class="absolute z-10 top-24.5 left-60">
      <span style="transform: rotate(-90deg); display: inline-block;" class="mr-18 font-bold text-lg">KOLEKSI</span>
      <!-- Garis vertikal -->
      <div class="border-2 border-black h-[200px] w-0 border-b-2 mt-10 ml-8"></div>
      <!-- Button logo WhatsApp -->
      <div class="mt-5 ml-5">
        <a href="https://wa.me/62895603361903" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
          </svg>
        </a>
      </div>
    </div>
      <!-- Flex item kedua (02) -->
      <div class="w-auto">
        <!-- Konten detail -->
        <div v-if="!isLoading">
          <div class="container mx-auto my-20">
                        <h2 class="text-2xl font-bold mb-4">{{ collectionDetail?.title }}  <span class="text-sm text-gray-800"> {{ formatDate(collectionDetail?.date) }}</span></h2>
            <img :src="collectionDetail?.url" alt="" class="flex justify-center items-center w-[400px] h-[600px]">
          </div>
          <div class="container mx-auto">
            <p><span class="font-semibold">Pencipta:</span> {{ collectionDetail?.creator }}</p>
            <p class="max-w-md mt-2">
              <span class="text-lg">{{ collectionDetail?.description }}</span>
            </p>
          </div>
        </div>
        <!-- Loading state -->
        <div v-else>
          <!-- Skeleton Loading untuk detail koleksi -->
          <div class="container mx-auto my-20">
            <div class="bg-gray-300 animate-pulse h-64"></div>
          </div>
          <div class="container mx-auto">
            <div class="text-2xl font-bold mb-4 bg-gray-300 animate-pulse w-1/2 h-8"></div>
            <div class="bg-gray-300 animate-pulse h-8 w-1/4 mb-2"></div>
            <div class="bg-gray-300 animate-pulse h-8 w-1/3 mb-2"></div>
            <div class="bg-gray-300 animate-pulse h-8 w-3/4 mb-2"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Your footer here -->
    <footer class="w-full text-gray-700 bg-gray-100 body-font">
      <!-- Footer content -->
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('collections', ['getCollectionById']),
    collectionDetail() {
      const uuid = this.$route.params.uuid;
      return this.getCollectionById(uuid);
    },
    isLoading() {
      return !this.collectionDetail; // isLoading adalah true jika detail koleksi tidak ada
    }
  },
  methods: {
    ...mapActions('collections', ['fetchCollectionsById']),
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    goBack() {
      this.$router.go(-1); // Kembali ke halaman sebelumnya dalam riwayat navigasi
    }
  },
  created() {
    const uuid = this.$route.params.uuid;
    this.fetchCollectionsById(uuid);
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
