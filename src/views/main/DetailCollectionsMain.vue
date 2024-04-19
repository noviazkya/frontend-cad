<template>
  <div>
    <div class="container mx-auto my-2">
      <router-link to="/" class="flex items-center text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Kembali
      </router-link>
    </div>
    <div v-if="!isLoading">
      <div class="container mx-auto my-20">
        <img :src="collectionDetail?.url" alt="" class="flex justify-center items-center w-[400px] h-[600px]">
      </div>
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-4">{{ collectionDetail?.title }}</h2>
        <p><span class="font-semibold">Tanggal :</span> {{ formatDate(collectionDetail?.date) }}</p>
        <p><span class="font-semibold">Pencipta:</span> {{ collectionDetail?.creator }}</p>
        <p><span class="font-semibold">Deskripsi:</span> {{ collectionDetail?.description }}</p>
      </div>
    </div>
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
