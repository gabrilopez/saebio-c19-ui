import globalAxios from 'axios';

const host = 'http://localhost:4567';

export const changeDatabaseToBackup = (data, config) => globalAxios.post(`${host}/change-database-to-backup`, data, config);

export const getBackups = (config) => globalAxios.get(`${host}/backups`, config);

export const uploadSamples = (data, config) => globalAxios.post(`${host}/insert-data`, data, config);
