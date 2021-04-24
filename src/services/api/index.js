import globalAxios from 'axios';

const host = process.env.VUE_APP_API_HOST_URL;

export const changeDatabaseToBackup = (data, config) => globalAxios.post(`${host}/change-database-to-backup`, data, config);

export const createBackup = (data, config) => globalAxios.post(`${host}/create-backup`, data, config);

export const getBackups = (config) => globalAxios.get(`${host}/backups`, config);

export const removeBackup = (data, config) => globalAxios.delete(`${host}/backup`, {
  data, ...config,
});

export const uploadSamples = (data, config) => globalAxios.post(`${host}/insert-data`, data, config);
