<template>
    <!-- component -->
<div class="container mx-auto p-4">
    <span class="text-4xl font-bold text-gray-800 p-4">
        Galeri TemporaryArt
    </span>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div v-for="item in collection" :key="item.id" class="grid gap-4">
          <div>
            <img
            @click="viewItem(item)"
              class="h-auto max-w-full rounded-lg group cursor-pointer"
              :src="item?.url"
              :alt="item?.title"
            />
            <div class="hidden bg-white bg-opacity-75 p-2 rounded group-hover:block text-base font-medium">{{ item.title }}</div>
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