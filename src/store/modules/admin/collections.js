import { ElMessage } from "element-plus";
import axios from "axios";

const collections = {
  namespaced: true,
  state: {
    collections: [],
    isLoading: false
  },
  getters: {
    getCollections: (state) => state.collections,
    getCollectionById: (state) => (uuid) => {
        return state.collections.find((collections) => collections.uuid === uuid) || null;
      },
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchCollections({ commit }) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get("/collections");

        commit("SET_COLLECTIONS", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching collections admin data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchCollectionsById({ commit }, uuid) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get(`/collections/${uuid}`);

        commit("SET_COLLECTIONS_BYID", [response.data]);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching collections admin data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async createCollections({ commit }, formData) {
        try {
          commit("SET_LOADING", true);
  
          const token = localStorage.getItem("token");
          const response = await axios.post("/collections/create", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          commit("SET_LOADING", false);
  
          ElMessage({
            type: "success",
            message: "Collection created successfully!",
          });
  
          return response.data;
        } catch (error) {
          console.error("Error creating Collection:", error);
  
          // Periksa apakah error.response terdefinisi sebelum mencoba mengakses properti 'data'
          const errorMessage = error.response
            ? error.response.data.msg
            : "An error occurred while creating the Collection. Please try again.";
  
          ElMessage({
            type: "error",
            message: "Failed to create Collection: " + errorMessage,
          });
  
          commit("SET_LOADING", false);
          return false;
        }
      },
  },
  mutations: {
    SET_COLLECTIONS(state, collections) {
      state.collections = collections
    },
    SET_COLLECTIONS_BYID(state, collection) {
      state.collections = collection
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  }
};

export default collections;
