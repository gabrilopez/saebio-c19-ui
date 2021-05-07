import * as Api from '@/services/api';
import {
  notify,
} from '@kyvg/vue3-notification';
import i18n from '@/resources/locales';

const jwt = require('jsonwebtoken');

const t = (str) => i18n.global.t(str);

const generateMetabaseTokenUrl = ({ dispatch, getters }) => {
  const payload = {
    resource: {
      dashboard: getters.getDashboard,
    },
    params: {
    },
    exp: Math.round(Date.now() / 1000) + (10 * 60), // 10 minute expiration
  };

  const token = jwt.sign(payload, process.env.VUE_APP_METABASE_SECRET_KEY);
  // eslint-disable-next-line max-len
  const dashboardUrl = `${process.env.VUE_APP_METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false&refresh=60`;

  dispatch('setDashboardUrl', dashboardUrl);
};

const setDashboard = ({ commit }, payload) => {
  commit('setDashboard', payload);
};

const setDashboardUrl = ({ commit }, payload) => {
  commit('setDashboardUrl', payload);
};

const setFileErrorLines = ({ commit }, payload) => {
  commit('setFileErrorLines', payload);
};

const setLoadingSamples = ({ commit }, payload) => {
  commit('setLoadingSamples', payload);
};

const setShowUploadErrorMessage = ({ commit }, payload) => {
  commit('setShowUploadErrorMessage', payload);
};

const setShowUploadSuccessMessage = ({ commit }, payload) => {
  commit('setShowUploadSuccessMessage', payload);
};

const setUploadSuccessMessageParams = ({ commit }, payload) => {
  commit('setUploadSuccessMessageParams', payload);
};

const uploadSamples = ({ dispatch }, formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const uploadSamplesApi = Api.uploadSamples(formData, config);
  uploadSamplesApi.then((response) => {
    const { data } = response.data;
    const { errorLines, added, errors, updatedLineageVariant } = data;
    dispatch('setLoadingSamples', false);
    dispatch('setShowUploadSuccessMessage', true);
    dispatch('setUploadSuccessMessageParams', {
      added, errors, updatedLineageVariant,
    });
    dispatch('setFileErrorLines', data.errors > 0 ? errorLines : '');

    notify({
      title: t('notifications.successTitle'),
      text: t('notifications.uploadSamplesSuccess'),
      type: 'success',
    });
  }).catch(() => {
    dispatch('setLoadingSamples', false);
    dispatch('setShowUploadErrorMessage', true);

    notify({
      title: t('notifications.errorTitle'),
      text: t('notifications.uploadSamplesError'),
      type: 'error',
    });
  });
};

export default {
  generateMetabaseTokenUrl,
  setDashboard,
  setDashboardUrl,
  setFileErrorLines,
  setLoadingSamples,
  setShowUploadErrorMessage,
  setShowUploadSuccessMessage,
  setUploadSuccessMessageParams,
  uploadSamples,
};
