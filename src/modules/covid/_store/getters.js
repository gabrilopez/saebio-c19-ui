const getDashboard = (state) => state.dashboard;

const getDashboardUrl = (state) => state.dashboardUrl;

const getLoadingSamples = (state) => state.loadingSamples;

const getShowUploadErrorMessage = (state) => state.showUploadErrorMessage;

const getShowUploadSuccessMessage = (state) => state.showUploadSuccessMessage;

export default {
  getDashboard,
  getDashboardUrl,
  getLoadingSamples,
  getShowUploadErrorMessage,
  getShowUploadSuccessMessage,
};
