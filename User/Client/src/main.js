import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import "@mdi/font/css/materialdesignicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia();
pinia.use(createPersistedState({}));

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
