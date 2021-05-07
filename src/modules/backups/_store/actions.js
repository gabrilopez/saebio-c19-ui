import * as Api from '@/services/api';
import i18n from '@/resources/locales';
import {
  notify,
} from '@kyvg/vue3-notification';

const t = (str) => i18n.global.t(str);

const restoreBackup = ({ dispatch }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const restoreBackupApi = Api.restoreBackup(postData, config);
  restoreBackupApi.then(() => {
    dispatch('getBackups');
    notify({
      title: t('notifications.successTitle'),
      text: t('notifications.restoreBackupSuccess'),
      type: 'success',
    });
  }).catch(() => {
    notify({
      title: t('notifications.errorTitle'),
      text: t('notifications.restoreBackupError'),
      type: 'error',
    });
  });
};

const createBackup = ({ dispatch }) => {
  const config = {
    headers: {
    },
  };
  const createBackupApi = Api.createBackup({
  }, config);
  createBackupApi.then(() => {
    dispatch('getBackups');
    notify({
      title: t('notifications.successTitle'),
      text: t('notifications.createBackupSuccess'),
      type: 'success',
    });
  }).catch(() => {
    notify({
      title: t('notifications.errorTitle'),
      text: t('notifications.createBackupError'),
      type: 'error',
    });
  });
};

const getBackups = ({ dispatch }) => {
  dispatch('setLoadingBackups', true);
  const getBackupsApi = Api.getBackups({
  });
  getBackupsApi.then((response) => {
    const { data } = response;
    dispatch('setBackupList', data.data);
    dispatch('setLoadBackupsError', false);
    dispatch('setLoadingBackups', false);
  }).catch(() => {
    dispatch('setLoadBackupsError', true);
    dispatch('setLoadingBackups', false);
    notify({
      title: t('notifications.errorTitle'),
      text: t('notifications.getBackupsError'),
      type: 'error',
    });
  });
};

const removeBackup = ({ dispatch, getters }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };
  const removeBackupApi = Api.removeBackup(postData, config);
  removeBackupApi.then((response) => {
    const removedBackup = postData;
    // eslint-disable-next-line arrow-body-style
    const backupList = getters.getBackupList.filter((backup) => {
      return backup.createdAt !== removedBackup.createdAt && backup.name !== removedBackup.name;
    });
    dispatch('setBackupList', backupList);

    console.log('API REMOVE BACKUP SUCCESS', response);
    notify({
      title: t('notifications.successTitle'),
      text: t('notifications.removeBackupSuccess'),
      type: 'success',
    });
  }).catch((error) => {
    console.log('error', error);
    notify({
      title: t('notifications.errorTitle'),
      text: t('notifications.removeBackupError'),
      type: 'error',
    });
  });
};

const setBackupList = ({ commit }, backupList) => {
  commit('setBackupList', backupList);
};

const setLoadBackupsError = ({ commit }, payload) => {
  commit('setLoadBackupsError', payload);
};

const setLoadingBackups = ({ commit }, payload) => {
  commit('setLoadingBackups', payload);
};

export default {
  restoreBackup,
  createBackup,
  getBackups,
  removeBackup,
  setBackupList,
  setLoadBackupsError,
  setLoadingBackups,
};
