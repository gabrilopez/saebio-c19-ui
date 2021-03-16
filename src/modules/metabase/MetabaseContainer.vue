<template>
  <div class="covid-container">
    <div v-if="!printMode" class="covid-navbar">
      <div class="row" style="justify-self: flex-start; align-items: center;">
        <div class="dropdown-menu">
          <a
            v-if="dashboard !== metabaseDashboards.COVID_DASHBOARD"
            class="dropdown-item"
            style="cursor: pointer;"
            @click="changeDashboard(metabaseDashboards.COVID_DASHBOARD)"
          >
            {{ $i18n.t('navbar.covidDashboard') }}
          </a>
          <a
            v-if="dashboard !== metabaseDashboards.SAMPLES_DASHBOARD"
            class="dropdown-item"
            style="cursor: pointer;"
            @click="changeDashboard(metabaseDashboards.SAMPLES_DASHBOARD)"
          >
            {{ $i18n.t('navbar.samplesDashboard') }}
          </a>
          <router-link
            :to="{ name: 'backups-container' }"
            class="dropdown-item"
          >
            {{ $i18n.t('navbar.backupsLabel') }}
          </router-link>
        </div>
        <button
          id="dropdown-toggle"
          style="all: unset;"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <fa class="navbar-icon" :icon="['fas', 'bars']" size="lg" />
        </button>
        <p class="h6 navbar-label">
          {{ $i18n.t('navbar.covidLabel') }}
        </p>
      </div>
      <div>
        <fa
          class="navbar-icon"
          :icon="['fas', 'file-upload']"
          size="lg"
          @click="uploadFileContainer ? clearFileUpload(true) : showUploadFileContainer()"
        />
        <fa
          class="navbar-icon"
          :icon="['fas', 'sync-alt']"
          size="lg"
          @click="refreshMetabase"
        />
      </div>
    </div>
    <div :style="!uploadFileContainer ? {'height': '0'} : {'height': 'fit-content'}">
      <div
        id="upload-file-container"
        class="upload-file-container"
      >
        <form
          v-if="!showUploadErrorMessage && !showUploadSuccessMessage"
          enctype="multipart/form-data"
          @submit.prevent="uploadFile"
        >
          <input id="file" type="file" accept=".csv" @change="checkValid">
          <label class="file-messages" for="file">
            <div>
              <fa
                style="cursor: pointer; margin-bottom: 1vh; transition: all .2s ease-in-out;"
                :icon="['fas', 'download']"
                size="2x"
              />
              <div v-if="!fileSelected">{{ $i18n.t('metabase.messages.selectFile') }}</div>
              <div v-if="!fileIsValid && fileSelected">{{ $i18n.t('metabase.messages.selectFileError') }}</div>
              <div v-if="fileSelected" style="justify-content: center; margin-top: 1vh;">
                <strong id="file-name" style="display: block;" />
                <button
                  v-if="!loadingSamples"
                  :disabled="!fileIsValid"
                  class="btn btn-dark m-3"
                  type="submit"
                >
                  {{ $i18n.t('metabase.buttons.send') }}
                </button>
                <div v-if="loadingSamples" class="spinner-border" />
              </div>
            </div>
          </label>
        </form>
        <div v-if="showUploadErrorMessage" class="file-messages">
          <p>{{ $i18n.t('metabase.messages.uploadFileError') }}</p>
          <button
            class="bn btn-dark m-3"
            @click="clearFileUpload(false)"
          >
            {{ $i18n.t('metabase.buttons.tryAgain') }}
          </button>
        </div>
        <div v-if="showUploadSuccessMessage" class="file-messages">
          <p>{{ $i18n.t(uploadSuccessMessage.message, uploadSuccessMessage.params) }}</p>
          <button
            class="bn btn-dark m-3"
            @click="clearFileUpload(true)"
          >
            {{ $i18n.t('metabase.buttons.close') }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="dashboardUrl"
      id="metabase-container"
      class="metabase-container"
      :class="dashboard === metabaseDashboards.COVID_DASHBOARD ? 'metabase-container' : 'metabase-container-small'"
    >
      <iframe
        id="metabase-content"
        :src="dashboardUrl"
        frameborder="0"
        scrolling="no"
        style="height: 100%; width: 100%;"
        height="100%"
        width="100%"
        allowtransparency
      />
    </div>
    <div v-if="!printMode" class="footer-logo">
      <img
        :alt="$i18n.t('saebio')"
        src="../../assets/icons/logo.png"
        width="64"
        height="32"
      >
      <fa
        style="cursor: pointer;"
        :icon="['fas', 'cloud-download-alt']"
        size="lg"
        @click="saveToPDF"
      />
    </div>
  </div>
</template>

<script>
import * as MetabaseDashboards from '@/resources/types/MetabaseDashboards';

export default {
  name: 'MetabaseContainer',
  data() {
    return {
      fileIsValid: false,
      fileSelected: false,
      metabaseDashboards: MetabaseDashboards,
      printMode: false,
      uploadFileContainer: false,
    };
  },
  computed: {
    dashboard() {
      return this.$store.getters['MetabaseStore/getDashboard'];
    },
    dashboardUrl() {
      return this.$store.getters['MetabaseStore/getDashboardUrl'];
    },
    loadingSamples() {
      return this.$store.getters['MetabaseStore/getLoadingSamples'];
    },
    showUploadErrorMessage() {
      return this.$store.getters['MetabaseStore/getShowUploadErrorMessage'];
    },
    showUploadSuccessMessage() {
      return this.$store.getters['MetabaseStore/getShowUploadSuccessMessage'];
    },
    uploadSuccessMessage() {
      return this.$store.getters['MetabaseStore/getUploadSuccessMessage'];
    },
  },
  mounted() {
    this.generateMetabaseTokenUrl();
  },
  methods: {
    changeDashboard(dashboard) {
      this.$store.dispatch('MetabaseStore/setDashboard', dashboard);
      this.refreshMetabase();
    },
    checkValid() {
      const csvFile = document.querySelector('#file');
      this.fileIsValid = csvFile && csvFile.files[0];
      this.fileSelected = !!csvFile;
      this.fileSelectHandler(csvFile.files[0]);
    },
    clearFileUpload(close) {
      const csvFile = document.querySelector('#file');
      if (csvFile && csvFile.files) csvFile.value = '';
      this.$store.dispatch('MetabaseStore/setShowUploadErrorMessage', false);
      this.$store.dispatch('MetabaseStore/setShowUploadSuccessMessage', false);
      this.fileSelected = false;
      this.fileIsValid = false;

      if (close) {
        const uploadFileContainer = document.getElementById('upload-file-container');
        uploadFileContainer.style.maxHeight = '0';
        uploadFileContainer.style.border = 'unset';
        this.uploadFileContainer = false;
      } else {
        this.showUploadFileContainer();
      }
    },
    fileSelectHandler(file) {
      this.$nextTick(() => {
        const fileName = document.getElementById('file-name');
        fileName.innerHTML = file.name;
      });
    },
    generateMetabaseTokenUrl() {
      this.$store.dispatch('MetabaseStore/generateMetabaseTokenUrl');
    },
    refreshMetabase() {
      const iFrame = document.getElementById('metabase-content');
      if (iFrame) {
        iFrame.src = '';
        this.generateMetabaseTokenUrl();
      }
    },
    saveToPDF() {
      const { dashboard } = this;
      let originalHeight = '';
      const metabaseContainer = document.getElementById('metabase-container');
      this.printMode = true;
      this.clearFileUpload(true);
      if (metabaseContainer) {
        originalHeight = metabaseContainer.clientHeight;
        if (dashboard === MetabaseDashboards.COVID_DASHBOARD) metabaseContainer.style.height = '10000px';
        if (dashboard === MetabaseDashboards.SAMPLES_DASHBOARD) metabaseContainer.style.height = '1000px';
      }
      this.$nextTick(() => {
        window.print();
        this.printMode = false;
        if (metabaseContainer) metabaseContainer.style.height = `${originalHeight}px`;
      });
    },
    showUploadFileContainer() {
      window.scrollTo(0, 0);
      this.uploadFileContainer = true;
      this.$nextTick(() => {
        const uploadFileContainer = document.getElementById('upload-file-container');
        uploadFileContainer.style.maxHeight = '30vh';
        uploadFileContainer.style.border = '1px solid #efefef';
      });
    },
    uploadFile() {
      this.$store.dispatch('MetabaseStore/setLoadingSamples', true);
      const formData = new FormData();
      const csvFile = document.querySelector('#file');
      formData.append('file', csvFile.files[0]);
      this.$store.dispatch('MetabaseStore/uploadSamples', formData);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
input[type="file"] {
  display: none;
}
.file-messages {
  width: 100%;
  text-align: center;
  transition: all .2s ease;
  user-select: none;
  cursor: pointer;
  padding: 2rem 1.5rem;
}
</style>
