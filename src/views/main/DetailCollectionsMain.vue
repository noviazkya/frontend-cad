<template>
    <div v-if="!isLoading">
      <div class="container mx-auto my-20">
        <img :src="collectionDetail?.url" alt="" class="flex justify-center items-center">
      </div>
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-4">{{ collectionDetail?.title }}</h2>
        <p><span class="font-semibold">Tanggal dibuat:</span> {{ formatDate(collectionDetail?.date) }}</p>
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
  