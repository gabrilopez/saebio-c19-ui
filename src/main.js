// Router configuration
import {
  createApp,
} from 'vue';
import i18n from '@/resources/locales';
import Router from '@/resources/router';
import store from '@/services/store';

import App from '@/App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/covid-module.css';
import '@/assets/backups-module.css';

const app = createApp(App);
app.use(i18n);
app.use(Router);
app.use(store);
// app.config.globalProperties.$store = store;
app.mount('#app');
