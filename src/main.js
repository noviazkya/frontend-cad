import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index";
import store from "./store/index";  
import "./style.css";
import axios from 'axios';
import ElementPlus from 'element-plus';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000'

const app = createApp(App);     
app.use(store); 
app.use(ElementPlus);
app.use(router).mount('#app');