import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import collections from "./modules/admin/collections.js"

const store = createStore({
    state: {
        isLoading: false,   
    },
    modules: {
    auth,
    collections
    },  
});

export default store;