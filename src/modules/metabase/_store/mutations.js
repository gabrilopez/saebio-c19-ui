const setDashboard = (state, payload) => {
  state.dashboard = payload;
};

const setDashboardUrl = (state, payload) => {
  state.dashboardUrl = payload;
};

const setFileErrorLines = (state, payload) => {
  state.fileErrorLines = payload;
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

const setUploadSuccessMessageParams = (state, payload) => {
  state.uploadSuccessMessageParams = payload;
};

export default {
  setDashboard,
  setDashboardUrl,
  setFileErrorLines,
  setLoadingSamples,
  setShowUploadErrorMessage,
  setShowUploadSuccessMessage,
  setUploadSuccessMessageParams,
};
