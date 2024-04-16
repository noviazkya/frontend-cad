<template>
  <!-- card collection -->
  <div class="z-30 transform translate-y-[750px] container mx-auto pb-2">
    <h1 class="text-center text-4xl font-bold mb-4">Koleksi kami</h1>
    <div class="bg-purple-600 bg-opacity-70 rounded-sm">
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
          <div v-else v-for="item in collection" :key="item.id" class="group my-12 mx-4 flex w-full max-w-xs flex-col overflow-hidden hover:transition-all hover:scale-105">
            <div class="relative flex h-80 w-72 overflow-hidden" :title="item.title"> <!-- Tambahkan atribut title di sini -->
              <img @click="viewItem(item)" class="absolute top-0 right-0 h-full w-full object-cover group" :src="item.url" :alt="item.title" />
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
  computed:{
    ...mapGetters("collections", ['getCollections']),
    isLoading(){
      return this.getCollections.length === 0;
    },
    collection(){
      return this.getCollections;
    }
  },
  methods:{
    ...mapActions('collections', ['fetchCollections']),
    viewItem(item) {
      const uuid = item.uuid; // Ambil UUID dari item
      const collectionName = item.title.replace(/\s+/g, "-").toLowerCase(); // Buat nama acara dan konversikan ke format slug
      this.$router.push({
        path: `/c/${collectionName}/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
  },
  mounted(){
    this.fetchCollections();
  }
}
</script>
