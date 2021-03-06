const setBackupList = (state, payload) => {
  state.backupList = payload;
};

const setLoadBackupsError = (state, payload) => {
  state.loadBackupsError = payload;
};

const setLoadingBackups = (state, payload) => {
  state.loadingBackups = payload;
};

export default {
  setBackupList,
  setLoadBackupsError,
  setLoadingBackups,
};
