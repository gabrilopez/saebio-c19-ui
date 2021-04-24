import * as Api from '@/services/api';

const restoreBackup = ({ dispatch }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const restoreBackupApi = Api.restoreBackup(postData, config);
  restoreBackupApi.then((response) => {
    dispatch('getBackups');
    console.log('RESTORE BACKUP SUCCESS:', response);
  }).catch((error) => {
    console.log(error);
  });
};

const createBackup = ({ dispatch }) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const createBackupApi = Api.createBackup({
  }, config);
  createBackupApi.then((response) => {
    dispatch('getBackups');
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
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
    console.log('API GET BACKUPS SUCCESS', response);
    dispatch('setLoadingBackups', false);
  }).catch((error) => {
    console.log('API GET BACKUPS ERROR', error);
    dispatch('setLoadBackupsError', true);
    dispatch('setLoadingBackups', false);
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

    // Remove backup from local array

    // eslint-disable-next-line arrow-body-style
    const backupList = getters.getBackupList.filter((backup) => {
      return backup.createdAt !== removedBackup.createdAt && backup.name !== removedBackup.name;
    });

    dispatch('setBackupList', backupList);
    console.log('API REMOVE BACKUP SUCCESS', response);
  }).catch((error) => {
    console.log('error', error);
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
