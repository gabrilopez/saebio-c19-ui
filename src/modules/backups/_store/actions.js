import * as Api from '@/services/api';

const changeDatabaseToBackup = ({ dispatch }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const changeDatabaseToBackupApi = Api.changeDatabaseToBackup(postData, config);
  changeDatabaseToBackupApi.then((response) => {
    const { data } = response;
    dispatch('setBackupList', data);
    console.log(response);
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
    const { data } = response;
    dispatch('setBackupList', data);
    console.log(response);
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
    dispatch('setBackupList', data);
    dispatch('setLoadBackupsError', false);
    console.log('API GET BACKUPS SUCCESS', response);
    dispatch('setLoadingBackups', false);
  }).catch((error) => {
    console.log('API GET BACKUPS ERROR', error);
    dispatch('setLoadBackupsError', true);
    dispatch('setLoadingBackups', false);
  });
};

const removeBackup = ({ dispatch }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };
  const removeBackupApi = Api.removeBackup(postData, config);
  removeBackupApi.then((response) => {
    const { data } = response;
    dispatch('setBackupList', data);
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
  changeDatabaseToBackup,
  createBackup,
  getBackups,
  removeBackup,
  setBackupList,
  setLoadBackupsError,
  setLoadingBackups,
};
