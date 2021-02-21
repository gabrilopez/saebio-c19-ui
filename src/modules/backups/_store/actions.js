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
    dispatch('setBackupList', data.data);
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};

const forceBackup = ({ dispatch }) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const forceBackupApi = Api.forceBackup({
  }, config);
  forceBackupApi.then((response) => {
    const { data } = response;
    dispatch('setBackupList', data.data);
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
};

const getBackups = ({ dispatch }) => {
  const getBackupsApi = Api.getBackups({
  });
  getBackupsApi.then((response) => {
    const { data } = response;
    dispatch('setBackupList', data.data);
    console.log('API GET BACKUPS SUCCESS', response);
  }).catch((error) => {
    console.log('API GET BACKUPS ERROR', error);
  });
};

const removeBackup = ({ dispatch }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const removeBackupApi = Api.removeBackup(postData, config);
  removeBackupApi.then((response) => {
    const { data } = response;
    dispatch('setBackupList', data.data);
    console.log('API REMOVE BACKUP SUCCESS', response);
  }).catch((error) => {
    console.log('error', error);
  });
};

const setBackupList = ({ commit }, backupList) => {
  commit('setBackupList', backupList);
};

export default {
  changeDatabaseToBackup,
  forceBackup,
  getBackups,
  removeBackup,
  setBackupList,
};
