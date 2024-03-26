<template>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <el-skeleton :loading="isLoading" animation="wave" row="10">
          <el-card v-if="collectionDetail" :header="collectionDetail.title">
            <div class="flex flex-wrap items-start">
              <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                <img :src="collectionDetail.url" alt="Collection Image" class="w-full h-auto rounded-lg">
              </div>
              <div class="w-full md:w-1/2 lg:w-2/3 px-2 mb-4">
                <p><span class="font-semibold">Creator:</span> {{ collectionDetail.creator }}</p>
                <p><span class="font-semibold">Date:</span> {{ collectionDetail.date }}</p>
                <p><span class="font-semibold">Description:</span> {{ collectionDetail.description }}</p>
              </div>
            </div>
          </el-card>
        </el-skeleton>
      </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('collections', ['getCollectionById']),
    collectionDetail() {
      const uuid = this.$route.params.uuid;
      return this.getCollectionById(uuid);
    }
  },
  methods: {
    ...mapActions('collections', ['fetchCollectionsById'])
  },
  created() {
    const uuid = this.$route.params.uuid;
    this.isLoading = true; // Set isLoading ke true saat memuat data
    this.fetchCollectionsById(uuid).then(() => {
      this.isLoading = false; // Set isLoading ke false setelah selesai memuat data
    });
  }
}
</script>
  
<style>
/* Tambahkan gaya sesuai kebutuhan  */
</style>
