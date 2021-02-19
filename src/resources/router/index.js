import {
  createRouter,
  createWebHistory,
} from 'vue-router';

// Components
import CovidContainer from '@/modules/covid/CovidContainer';
import BackupContainer from '@/modules/backups/BackupContainer';

const index = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/covid',
      name: 'covid-container',
      component: CovidContainer,
    },
    {
      path: '/backups',
      name: 'backups-container',
      component: BackupContainer,
    },
  ],
});

export default index;
