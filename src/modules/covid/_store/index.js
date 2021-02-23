import actions from '@/modules/covid/_store/actions';
import getters from '@/modules/covid/_store/getters';
import mutations from '@/modules/covid/_store/mutations';
import * as MetabaseDashboards from '@/resources/types/MetabaseDashboards';

const state = {
  dashboard: MetabaseDashboards.COVID_DASHBOARD,
  dashboardUrl: '',
  loadingSamples: false,
  showUploadErrorMessage: false,
  showUploadSuccessMessage: false,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
