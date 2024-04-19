import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import collections from "./modules/admin/collections.js";
import informations from "./modules/admin/informations.js";

const store = createStore({
    state: {
        isLoading: false,   
    },
    modules: {
    auth,
    collections,
    informations
    },  
});

export default store;