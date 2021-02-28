const setDashboard = (state, payload) => {
  state.dashboard = payload;
};

const setDashboardUrl = (state, payload) => {
  state.dashboardUrl = payload;
};

const setLoadingSamples = (state, payload) => {
  state.loadingSamples = payload;
};

const setShowUploadErrorMessage = (state, payload) => {
  state.showUploadErrorMessage = payload;
};

const setShowUploadSuccessMessage = (state, payload) => {
  state.showUploadSuccessMessage = payload;
};

const setUploadSuccessMessage = (state, payload) => {
  state.uploadSuccessMessage = payload;
};

export default {
  setDashboard,
  setDashboardUrl,
  setLoadingSamples,
  setShowUploadErrorMessage,
  setShowUploadSuccessMessage,
  setUploadSuccessMessage,
};
