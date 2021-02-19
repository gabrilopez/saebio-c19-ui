import * as Api from '@/services/api';

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

const changeDatabaseToBackup = ({ dispatch }, postData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const changeDatabaseToBackupApi = Api.changeDatabaseToBackup(postData, config);
  changeDatabaseToBackupApi
    .then((response) => {
      const { data } = response;
      dispatch('setBackupList', data.data);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const setBackupList = ({ commit }, backupList) => {
  commit('setBackupList', backupList);
};

export default {
  changeDatabaseToBackup,
  getBackups,
  setBackupList,
};
