<template>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <el-skeleton :loading="isLoading" animation="wave" row="10">
          <el-card v-if="informationsDetail" :header="informationsDetail?.title">
            <h1 class="mx-5 my-5 text-3xl font-bold ">{{ informationsDetail?.opening }}</h1>
            <div class="flex flex-wrap items-start">
              <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                <img :src="informationsDetail?.url" alt="Collection Image" class="w-full h-auto rounded-lg">
              </div>
              <div class="w-full md:w-1/2 lg:w-2/3 px-2 mb-4">
                <p><span class="font-semibold">Category:</span> {{ informationsDetail?.category }}</p>
                <p><span class="font-semibold">Date:</span> {{ informationsDetail?.date }}</p>
                <p><span class="font-semibold">Description:</span> {{ informationsDetail?.description }}</p>
                <p><span class="font-semibold">Tags:</span>
                  <el-tag
                    v-for="(tag, index) in informationsDetail?.information_tags"
                    :key="index"
                    class="mr-2 mb-2"
                    type="info"
                  >
                    {{ tag.tags }}
                  </el-tag>
                </p>
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
      ...mapGetters('informations', ['getInformationById']),
      informationsDetail() {
        const uuid = this.$route.params.uuid;
        return this.getInformationById(uuid);
      }
    },
    methods: {
      ...mapActions('informations', ['fetchInformationById'])
    },
    created() {
      const uuid = this.$route.params.uuid;
      this.isLoading = true; // Set isLoading ke true saat memuat data
      this.fetchInformationById(uuid).then(() => {
        this.isLoading = false; // Set isLoading ke false setelah selesai memuat data
      });
    }
  }
  </script>
  
  <style>
  /* Tambahkan gaya sesuai kebutuhan */
  </style>
  