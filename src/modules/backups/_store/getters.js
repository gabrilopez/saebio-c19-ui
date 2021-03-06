const getBackupList = (state) => state.backupList;

const getLoadBackupsError = (state) => state.loadBackupsError;

const getLoadingBackups = (state) => state.loadingBackups;

export default {
  getBackupList,
  getLoadBackupsError,
  getLoadingBackups,
};
