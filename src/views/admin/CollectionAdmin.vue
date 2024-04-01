<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <input
        type="search"
        placeholder="Search"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button type="button" @click="toCreateCollection" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
        Add
      </button>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="px-4 py-2 bg-gray-600 text-white">Title</th>
          <th class="px-4 py-2 bg-gray-600 text-white">Creator</th>
          <th class="px-4 py-2 bg-gray-600 text-white">Date</th>
          <th class="px-4 py-2 bg-gray-600 text-white">Actions</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(collection, index) in paginatedCollections" :key="collection.id">
          <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">{{ collection.title }}</td>
          <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">{{ collection.creator }}</td>
          <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">{{ collection.date }}</td>
          <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">
            <button class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none" @click="EditItem(collection)">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none" @click="deleteItem(collection)">Delete</button>
            <button class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none" @click="viewItem(collection)">view</button>
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      class="mt-4"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCollections"
    />
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    };
  },
  components:{
    ElMessageBox
  },
  computed: {
    ...mapGetters('collections', ['getCollections']),
    totalCollections() {
      return this.getCollections.length;
    },
    paginatedCollections() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.getCollections.slice(startIndex, endIndex);
    },
  },
  methods: {
    ...mapActions('collections', ['fetchCollections']),
    viewItem(collection) {
      const uuid = collection.uuid;
      this.$router.push({
        path: `/admin/collection/${uuid}`,
      });
    },
    EditItem(collection) {
      const uuid = collection.uuid;
      this.$router.push({
        path: `/admin/collection/edit/${uuid}`,
      });
    },
    async deleteItem(item) {
      try {
        const confirmed = await ElMessageBox.confirm(
          "Are you sure you want to delete this collection?",
          "Confirmation",
          {
            type: "warning",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            center: true,
          }
        );

        if (confirmed) {
          // Dispatch action deleteCollection dengan item.uuid sebagai payload
          await this.$store.dispatch("collections/deleteCollection", item.uuid);
          this.fetchCollections();
        } else {
          // Jika pengguna membatalkan penghapusan, tampilkan pesan bahwa penghapusan dibatalkan
          ElMessage.info("Deletion canceled");
        }
      } catch (error) {
        // Handle jika terjadi kesalahan saat penghapusan
        ElMessage.error(`Failed to delete collection: ${error.response.data.msg}`);
      }
    },
    toCreateCollection() {
      this.$router.push('/admin/collection/create')
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  mounted() {
    this.fetchCollections();
  },
};
</script>
