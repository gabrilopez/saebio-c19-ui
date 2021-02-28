import actions from '@/modules/metabase/_store/actions';
import getters from '@/modules/metabase/_store/getters';
import mutations from '@/modules/metabase/_store/mutations';
import * as MetabaseDashboards from '@/resources/types/MetabaseDashboards';

const state = {
  dashboard: MetabaseDashboards.COVID_DASHBOARD,
  dashboardUrl: '',
  loadingSamples: false,
  showUploadErrorMessage: false,
  showUploadSuccessMessage: false,
  uploadSuccessMessage: '',
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
