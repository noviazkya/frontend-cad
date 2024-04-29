<template>
    <div class="max-w-4xl mx-auto my-16">
      <h1 class="text-3xl font-bold mb-4">Detail Informasi</h1>
      <div v-if="information">
        <div class="mb-4">
          <img :src="information.url" :alt="information.title" class="rounded-lg shadow-lg" style="max-height: 400px;">
        </div>
        <h2 class="text-xl font-bold mb-2">{{ information.title }}</h2>
        <p class="text-gray-600 mb-2">{{ information.opening }}</p>
        <p class="text-gray-600 mb-2">Tanggal: {{ formatDate(information.date) }}</p>
        <p class="text-gray-600 mb-4">Lokasi: {{ information.address }}</p>
        <p class="text-gray-600">{{ information.description }}</p>
          <button @click="goBack" class="mt-12 flex items-center text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Kembali
      </button>
      </div>
      <div v-else>
        <p class="text-gray-600">Informasi tidak ditemukan</p>
          <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Kembali
      </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    computed: {
      ...mapGetters('informations', ['getInformationById']),
      information(){
        return this.getInformationById(this.$route.params.uuid)
      }
    },
    methods: {
      ...mapActions('informations', ['fetchInformationById']),
      goBack() {
      this.$router.go(-1); // Kembali ke halaman sebelumnya dalam riwayat navigasi
    },
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', options);
    }
    },
    mounted() {
      const uuid = this.$route.params.uuid;
      this.fetchInformationById(uuid);
    }
  };
  </script>
