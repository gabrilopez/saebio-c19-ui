import * as Api from '@/services/api';

const uploadSamples = ({ dispatch }, formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const uploadSamplesApi = Api.uploadSamples(formData, config);
  uploadSamplesApi.then((response) => {
    // Do something
    // TODO: INTENTAR AÑADIR MENSAJES CON BADGE
    console.log(response);
  }).catch((error) => {
    // Do something
    console.log(error);
  });
  dispatch('setLoadingSamples', false);
};

const setLoadingSamples = ({ commit }, payload) => {
  commit('setLoadingSamples', payload);
};

export default {
  setLoadingSamples,
  uploadSamples,
};
