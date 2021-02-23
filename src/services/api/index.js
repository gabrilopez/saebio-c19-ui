import globalAxios from 'axios';

const host = process.env.VUE_APP_API_HOST_URL;

export const changeDatabaseToBackup = (data, config) => globalAxios.post(`${host}/change-database-to-backup`, data, config);

export const forceBackup = (data, config) => globalAxios.post(`${host}/force-backup`, data, config);

export const getBackups = (config) => globalAxios.get(`${host}/backups`, config);

export const removeBackup = (data, config) => globalAxios.post(`${host}/remove-backup`, data, config);

export const uploadSamples = (data, config) => globalAxios.post(`${host}/insert-data`, data, config);
