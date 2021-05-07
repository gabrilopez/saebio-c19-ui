const en = {
  /* BACKUPS */
  backups: {
    connectionError: 'Server petition error',
    createBackup: 'Create backup',
    currentDatabase: 'Current database',
    databaseChangeMessage: 'The database will change to {name}. Current database will be lost, are you willing to proceed?',
    databaseChangeTitle: 'Confirm database change',
    file: 'File',
    filesFound: '{count} file(s) found',
    numberOfSamples: 'Number of samples',
    removeBackupMessage: 'Backup {name} will be removed. This cannot be undone, are you willing to proceed?',
    removeBackupTitle: 'Confirm backup deletion',
    size: 'Size',
    unknown: 'Unknown',
  },

  /* METABASE */
  metabase: {
    alt: {
      refresh: 'Refresh',
      upload: 'Upload',
    },
    buttons: {
      close: 'Close',
      download: 'Download',
      send: 'Send',
      seeErrors: 'See errors',
      tryAgain: 'Try again',
    },
    messages: {
      alreadyExistingSamples: 'Already registered sample rows in database',
      fileErrorLines: 'Erroneous lines found',
      insertError: 'Rows affected by database insert error',
      rowFormatError: 'CSV file rows with format error',
      selectFile: 'Please select a CSV file to upload its content',
      selectFileError: 'File is not valid. Please choose a CSV file',
      uploadFileError: 'There was an error while connecting to the server. Please, try again later',
      uploadFileServerMessage: 'Samples upload has finished. Added {added} samples, {errors} errors.',
      uploadFileServerMessageUpdatedSamples: 'Updated lineage and variant from {upadtedLineageVariant} samples',
    },
  },

  /* MODALS */
  modals: {
    buttons: {
      accept: 'Accept',
      cancel: 'Cancel',
    },
  },

  /* NAVBAR */
  navbar: {
    backups: 'Backups',
    backupsLabel: 'Database backups',
    covidDashboard: 'Covid-19',
    covidLabel: 'Covid statistics',
    samplesDashboard: 'Samples',
  },

  notifications: {
    createBackupSuccess: 'Backup created successfully!',
    createBackupError: 'Backup could not be created',
    errorTitle: 'Error',
    getBackupsError: 'Could not fetch backups',
    removeBackupSuccess: 'Backup created successfully!',
    removeBackupError: 'Backup could not be removed',
    restoreBackupSuccess: 'Backup restored successfully!',
    restoreBackupError: 'Backup could not be restored',
    successTitle: 'Done!',
    uploadSamplesSuccess: 'CSV file processed successfully!',
    uploadSamplesError: 'CSV file could not be processed',
  },

  saebio: 'Saebio',
};

export default en;
