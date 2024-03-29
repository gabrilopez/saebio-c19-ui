import actions from '@/modules/backups/_store/actions';
import getters from '@/modules/backups/_store/getters';
import mutations from '@/modules/backups/_store/mutations';

const state = {
  backupList: [],
  loadBackupsError: false,
  loadingBackups: false,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
