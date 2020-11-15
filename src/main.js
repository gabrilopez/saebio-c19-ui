import {
  createApp,
} from 'vue';
import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/covid-module.css';

const app = createApp(App);
app.mount('#app');
