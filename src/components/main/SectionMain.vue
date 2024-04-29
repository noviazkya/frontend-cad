<template>
  <!-- component -->
  <!-- carousel infomation (not part of component) START -->
<!-- Carousel Information -->
<div v-if="information.length > 0" class="translate-y-[650px] mx-auto p-6 sm:p-24 lg:p-48">
  <h1 class="text-center text-5xl font-bold mb-6">Informasi terbaru</h1>
  <div  class="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl" style="min-height: 28rem;">
    <!-- Carousel Image -->
    <div class="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg" style="min-height: 28rem;">
      <img class="absolute inset-0 w-full h-full object-cover object-center" :src="currentInfo?.url" alt="">
      <div class="absolute inset-0 w-full h-full bg-gray-900 opacity-75"></div>
      <div class="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
        <!-- Carousel SVG Icon -->
        <svg class="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239 120">
          <!-- Isi dengan konten SVG Anda -->
        </svg>
      </div>
    </div>
    <!-- Carousel Content -->
    <div class="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
  <div class="p-12 md:pr-24 md:pl-16 md:py-12">
    <h2 class="text-3xl font-bold mb-4">{{ currentInfo?.title }}</h2>
    <p class="text-lg text-gray-600 mb-2">
     {{ currentInfo?.opening }}<br>
     <span class="font-bold"></span> {{ formatDate(currentInfo.date) }}<br>
    
    </p>
    <span class="cursor-pointer flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900" @click="viewItemInfo(currentInfo)">
      <span>Selengkapnya tentang {{ currentInfo?.title }}</span>
      <span class="text-xs ml-1">&#x279c;</span>
    </span>
  </div>
  <svg class="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
    <!-- Isi dengan konten SVG untuk navigasi (optional) -->
  </svg>
</div>

    <!-- Carousel Navigation Buttons -->
    <button class="absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline" @click="prevInfo">
      <span class="block" style="transform: scale(-1);">&#x279c;</span>
    </button>
    <button class="absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline" @click="nextInfo">
      <span class="block">&#x279c;</span>
    </button>
  </div>
</div>
  <!-- carousel infomation (not part of component) END -->
  <!-- card collection -->
  <div class="z-30 transform translate-y-[750px] container mx-auto pb-2">
    <h1 class="text-center text-4xl font-bold mb-4">Koleksi ContemporaryArt</h1>
    <div class="bg-gray-300 bg-opacity-70 rounded-sm">
      <!-- Tambahkan wrapper untuk mengaktifkan overflow horizontal -->
      <div class="overflow-x-hidden">
        <div class="grid grid-cols-2 md:grid-cols-4 p-2">
          <!-- Gunakan v-for untuk membuat 6 card -->
          <div v-if="$store.getters['collections/isLoading']" v-for="n in 6" :key="n" class="group my-12 mx-4 flex w-full max-w-xs flex-col overflow-hidden">
            <div class="relative flex h-80 w-72 bg-gray-300 rounded-sm overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-full animate-pulse bg-gray-400"></div>
            </div>
            <div class="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
              <div class="hidden bg-gray-300 p-2 rounded text-base font-medium w-full"></div>
            </div>
          </div>
          <div v-else v-for="item in collection.slice(0, 8)" :key="item.id" class="group my-12 mx-4 flex w-full max-w-xs flex-col overflow-hidden hover:transition-all hover:scale-105">
            <div class="relative flex h-80 w-72 overflow-hidden" :title="item.title"> <!-- Tambahkan atribut title di sini -->
              <img @click="viewItem(item)" class="absolute top-0 right-0 h-full w-full object-cover group cursor-pointer" :src="item.url" :alt="item.title" />
              <div class="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                <!-- Tambahkan konten di bawah ini -->
                <div class="hidden bg-white bg-opacity-75 p-2 rounded group-hover:block text-base font-medium">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  computed:{
    ...mapGetters("collections", ['getCollections']),
    ...mapGetters('informations', ['getInformation']),
    currentInfo() {
      return this.information[this.currentIndex] || {};
    },
    isLoading(){
      return this.getCollections.length === 0;
    },
    collection(){
      return this.getCollections;
    },
    information(){
      return this.getInformation;
    }
  },
  methods:{
    ...mapActions('collections', ['fetchCollections']),
    ...mapActions('informations', ['fetchInformation']),
    viewItem(item) {
  const uuid = item.uuid; // Ambil UUID dari item
  const collectionName = item.title.replace(/\s+/g, "-").toLowerCase(); // Buat nama acara dan konversikan ke format slug
  this.$router.push({ path: `/c/${collectionName}/${uuid}` });
},
viewItemInfo(item) {
  window.scrollTo(0, 0)
  const uuid = item.uuid; // Ambil UUID dari item
  const informationName = item.title.replace(/\s+/g, "-").toLowerCase(); // Buat nama acara dan konversikan ke format slug
  this.$router.push({ path: `/i/${informationName}/${uuid}` });
},
    prevInfo() {
      this.currentIndex = (this.currentIndex - 1 + this.information.length) % this.information.length;
    },
    nextInfo() {
      this.currentIndex = (this.currentIndex + 1) % this.information.length;
    },
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', options);
    }
  },
  mounted(){
    this.fetchCollections();
    this.fetchInformation();
  }
}
</script> 
