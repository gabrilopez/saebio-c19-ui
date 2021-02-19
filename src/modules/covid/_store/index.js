import actions from '@/modules/covid/_store/actions';
import getters from '@/modules/covid/_store/getters';
import mutations from '@/modules/covid/_store/mutations';

const state = {
  loadingSamples: false,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
