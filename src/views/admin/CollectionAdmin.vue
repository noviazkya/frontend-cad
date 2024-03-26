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
          <tr v-for="collection in getCollections" :key="collection.id">
            <td class="px-4 py-2">{{ collection.title }}</td>
            <td class="px-4 py-2">{{ collection.creator }}</td>
            <td class="px-4 py-2">{{ collection.date }}</td>
            <td class="px-4 py-2">
              <button class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none">Edit</button>
              <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none">Delete</button>
              <button class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none" @click="viewItem(collection)">view</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    computed: {
      ...mapGetters('collections', ['getCollections']),
      collection(){
        return this.getCollections;
      }
    },
    methods:{
        ...mapActions('collections', ['fetchCollections']),
        viewItem(collection) {
      const uuid = collection.uuid; // Ambil UUID dari collection
      this.$router.push({
        path: `/admin/collection/${uuid}`, // Pindah halaman dengan path yang sesuai
      });
    },
    toCreateCollection(){
      this.$router.push('/admin/collection/create')
    }
    },
    mounted() {
      this.fetchCollections();
    },
  };
  </script>
  