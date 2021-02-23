const setBackupList = (state, payload) => {
  state.backupList = payload;
};

const setLoadBackupsError = (state, payload) => {
  state.loadBackupsError = payload;
};

export default {
  setBackupList,
  setLoadBackupsError,
};
