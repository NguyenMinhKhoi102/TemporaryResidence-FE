import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import "@mdi/font/css/materialdesignicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
// import PrimeVue from 'primevue/config';

// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
// import './assets/css/flag.css';

// import Button from "primevue/button";
// import Slider from 'primevue/slider';
// import MultiSelect from 'primevue/multiselect';
// import Chart from 'primevue/chart';
// import Toast from 'primevue/toast';
// import ToastService from 'primevue/toastservice';
// import DataTable from 'datatables.net-vue3';
// import Select from 'datatables.net-select';
// import DataTablesCore from 'datatables.net';

const pinia = createPinia();
pinia.use(createPersistedState({}));

const app = createApp(App);
// app.component('Button', Button);
// app.component('Slider', Slider);
// app.component('Multiselect', MultiSelect);
// app.component('Chart', Chart);
// app.component('Toast', Toast);
// DataTable.use(DataTablesCore);
// app.component("DataTable", DataTable);
app.use(router).use(pinia).use(vuetify).mount('#app');
