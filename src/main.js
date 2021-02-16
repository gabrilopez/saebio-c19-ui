// Router configuration
import {
  createApp,
} from 'vue';
import i18n from '@/resources/locales';
import Router from '@/resources/router';

import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/covid-module.css';
import '@/assets/backups-module.css';

const app = createApp(App);
app.use(Router);
app.use(i18n);
app.mount('#app');
