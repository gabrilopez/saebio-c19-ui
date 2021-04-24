import globalAxios from 'axios';

const host = process.env.VUE_APP_API_HOST_URL;

export const restoreBackup = (data, config) => globalAxios.put(`${host}/backup/restore`, data, config);

export const createBackup = (data, config) => globalAxios.post(`${host}/backup`, data, config);

export const getBackups = (config) => globalAxios.get(`${host}/backups`, config);

export const removeBackup = (data, config) => globalAxios.delete(`${host}/backup`, {
  data, ...config,
});

export const uploadSamples = (data, config) => globalAxios.post(`${host}/insert-data`, data, config);
