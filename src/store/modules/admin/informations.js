import { ElMessage } from "element-plus";
import axios from "axios";

const informations = {
  namespaced: true,
  state: {
    information: [],
    isLoading: false
  },
  getters: {
    getInformation: (state) => state.information,
    getInformationById: (state) => (uuid) => {
        return state.information.find((information) => information.uuid === uuid) || null;
      },
    isLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchInformation({ commit }) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get("/information");

        commit("SET_INFORMATION", response.data);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching information admin data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async fetchInformationById({ commit }, uuid) {
      try {
        commit("SET_LOADING", true);

        const response = await axios.get(`/information/${uuid}`);

        commit("SET_INFORMATION_BYID", [response.data]);
        commit("SET_LOADING", false);

        return response.data;
      } catch (error) {
        console.error(
          "Error fetching information admin data:",
          error.response.data.msg
        );
        commit("SET_LOADING", false);
        return false;
      }
    },
    async createInformation({ commit }, formData) {
        try {
          commit("SET_LOADING", true);
  
          const token = localStorage.getItem("token");
          const response = await axios.post("/information/create", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          commit("SET_LOADING", false);
  
          ElMessage({
            type: "success",
            message: "Information created successfully!",
          });
  
          return response.data;
        } catch (error) {
          console.error("Error creating Information:", error);
  
          // Periksa apakah error.response terdefinisi sebelum mencoba mengakses properti 'data'
          const errorMessage = error.response
            ? error.response.data.msg
            : "An error occurred while creating the Information. Please try again.";
  
          ElMessage({
            type: "error",
            message: "Failed to create Information: " + errorMessage,
          });
  
          commit("SET_LOADING", false);
          return false;
        }
      },
      async deleteInformation({ commit }, uuid) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.delete(`/information/delete/${uuid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          ElMessage.success(response.data.msg);
        } catch (error) {
          console.error("Error deleting Information:", error.response.data.msg);
          ElMessage.error(
            "Failed to delete Information: " +
              (error.response.data.msg ||
                "An error occurred while deleting the Information. Please try again.")
          );
        }
      },
      async updateCollections({ commit }, { uuid, formData }) {
        try {
          commit("SET_LOADING", true);
  
          const token = localStorage.getItem("token");
          const response = await axios.patch(`/collections/update/${uuid}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          commit("SET_LOADING", false);
  
          ElMessage({
            type: "success",
            message: "Collection Update successfully!",
          });
  
          return response.data;
        } catch (error) {
          console.error("Error Update Collection:", error);
  
          // Periksa apakah error.response terdefinisi sebelum mencoba mengakses properti 'data'
          const errorMessage = error.response
            ? error.response.data.msg
            : "An error occurred while Update the Collection. Please try again.";
  
          ElMessage({
            type: "error",
            message: "Failed to Update collection: " + errorMessage,
          });
  
          commit("SET_LOADING", false);
          return false;
        }
      },
  },
  mutations: {
    SET_INFORMATION(state, informations) {
      state.information = informations
    },
    SET_INFORMATION_BYID(state, collection) {
      state.information = collection
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  }
};

export default informations;
