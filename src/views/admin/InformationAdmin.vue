<template>
    <div class="container mx-auto">
      <div class="flex justify-between items-center -right-5 mb-4 mt-2 mx-2">
        <button type="button" @click="toCreateCollection" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
          Add
        </button>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-4 py-2 bg-gray-600 text-white">Title</th>
            <th class="px-4 py-2 bg-gray-600 text-white">Category</th>
            <th class="px-4 py-2 bg-gray-600 text-white">Date</th>
            <th class="px-4 py-2 bg-gray-600 text-white">Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(item, index) in paginatedInformations" :key="item.id">
            <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">{{ item?.title }}</td>
            <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">{{ item?.category }}</td>
            <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">{{ item?.date }}</td>
            <td class="px-4 py-2" :class="{ 'bg-gray-200': index % 2 !== 0 }">
              <button class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none" @click="EditItem(item)">Edit</button>
              <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none" @click="deleteItem(item)">Delete</button>
              <button class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none" @click="viewItem(item)">view</button>
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
      ...mapGetters('informations', ['getInformation']),
      totalInformations() {
        return this.getInformation.length;
      },
      paginatedInformations() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.getInformation.slice(startIndex, endIndex);
      },
    },
    methods: {
      ...mapActions('informations', ['fetchInformation']),
      viewItem(item) {
        const uuid = item.uuid;
        this.$router.push({
          path: `/admin/information/${uuid}`,
        });
      },
      EditItem(item) {
        const uuid = item.uuid;
        this.$router.push({
          path: `/admin/collection/edit/${uuid}`,
        });
      },
      async deleteItem(item) {
        try {
          const confirmed = await ElMessageBox.confirm(
            "Are you sure you want to delete this information?",
            "Confirmation",
            {
              type: "warning",
              confirmButtonText: "Delete",
              cancelButtonText: "Cancel",
              center: true,
            }
          );
  
          if (confirmed) {
            // Dispatch action deleteInformation dengan item.uuid sebagai payload
            await this.$store.dispatch("informations/deleteInformation", item.uuid);
            this.fetchInformation();
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
        this.$router.push('/admin/information/create')
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
    },
    mounted() {
      this.fetchInformation();
    },
  };
  </script>  