import {
  createStore,
} from 'vuex';

import BackupsStore from '@/modules/backups/_store';
import MetabaseStore from '@/modules/metabase/_store';

const store = createStore({
  modules: {
    BackupsStore,
    MetabaseStore,
  },
});

export default store;
