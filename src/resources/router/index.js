import {
  createRouter,
  createWebHistory,
} from 'vue-router';

// Components
import MetabaseContainer from '@/modules/metabase/MetabaseContainer';
import BackupContainer from '@/modules/backups/BackupContainer';

const index = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/metabase',
      name: 'metabase-container',
      component: MetabaseContainer,
    },
    {
      path: '/backups',
      name: 'backups-container',
      component: BackupContainer,
    },
  ],
});

export default index;
