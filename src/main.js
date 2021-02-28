// Router configuration
import {
  createApp,
} from 'vue';
import i18n from '@/resources/locales';
import Router from '@/resources/router';
import store from '@/services/store';

/* FONT AWESOME */
import {
  library,
} from '@fortawesome/fontawesome-svg-core';
import {
  faCloudDownloadAlt, faFileUpload, faSyncAlt, faBars, faDownload,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
} from '@fortawesome/vue-fontawesome';

import App from '@/App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/metabase-module.css';
import '@/assets/backups-module.css';

library.add(faCloudDownloadAlt, faFileUpload, faSyncAlt, faBars, faDownload);

const app = createApp(App);
app.use(i18n);
app.use(Router);
app.use(store);
app.component('Fa', FontAwesomeIcon);
// app.config.globalProperties.$store = store;
app.mount('#app');
