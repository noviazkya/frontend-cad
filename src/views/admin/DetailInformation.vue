<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <el-skeleton :loading="isLoading" animation="wave" row="10">
        <el-card v-if="informationsDetail" :header="informationsDetail?.title">
          <h1 class="mx-5 my-5 text-3xl font-bold">{{ informationsDetail?.opening }}</h1>
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
                  v-for="(info, index) in informationsDetail?.information_tags"
                  :key="index"
                  class="mb-2 bg-none"
                >
                  <span
                    v-for="(tag, tagIndex) in parseTags(info.tags)"
                    :key="tagIndex"
                    class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 inline-block"
                  >
                    {{ tag }}
                  </span>
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
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters('informations', ['getInformationById']),
    informationsDetail() {
      const uuid = this.$route.params.uuid;
      return this.getInformationById(uuid);
    },
  },
  methods: {
    ...mapActions('informations', ['fetchInformationById']),
    parseTags(tagsString) {
      try {
        return JSON.parse(tagsString);
      } catch (error) {
        console.error('Error parsing tags:', error);
        return [];
      }
    }
  },
  created() {
    const uuid = this.$route.params.uuid;
    this.isLoading = true;
    this.fetchInformationById(uuid).then(() => {
      this.isLoading = false;
    });
  }
}
</script>
