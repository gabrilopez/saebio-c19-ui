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
          @click="showUploadFileContainer"
        />
        <fa
          class="navbar-icon"
          :icon="['fas', 'sync-alt']"
          size="lg"
          @click="refreshMetabase"
        />
      </div>
    </div>
    <div v-if="uploadFileContainer && !printMode">
      <form
        v-if="!showUploadErrorMessage && !showUploadSuccessMessage"
        enctype="multipart/form-data"
        @submit.prevent="uploadFile"
      >
        <div id="upload-file-container" class="upload-file-container">
          <input id="file" type="file" accept=".csv" @change="checkValid">
          <button
            :disabled="!fileIsValid"
            class="btn btn-dark m-3"
            type="submit"
          >
            {{ $i18n.t('metabase.buttons.send') }}
            {{ $i18n.t('metabase.buttons.send') }}
          </button>
        </div>
      </form>
      <div v-if="showUploadErrorMessage" class="col-12">
        <p>{{ $i18n.t('metabase.messages.uploadFileError') }}</p>
        <button
          class="bn btn-dark m-3"
          @click="clearFileUpload(false)"
        >
          {{ $i18n.t('metabase.buttons.tryAgain') }}
        </button>
      </div>
      <div v-if="showUploadSuccessMessage" class="col-12">
        <p>TODO: AÑADIR MENSAJE DEL SERVIDOR</p>
        <button
          class="bn btn-dark m-3"
          @click="clearFileUpload(true)"
        >
          {{ $i18n.t('metabase.buttons.close') }}
        </button>
      </div>
      <div v-if="isLoadingFileUpload" class="spinner-border" />
    </div>
    <div v-if="dashboardUrl" id="metabase-container" class="metabase-container">
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
      metabaseDashboards: MetabaseDashboards,
      isLoadingFileUpload: false,
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
    showUploadErrorMessage() {
      return this.$store.getters['MetabaseStore/getShowUploadErrorMessage'];
    },
    showUploadSuccessMessage() {
      return this.$store.getters['MetabaseStore/getShowUploadSuccessMessage'];
    },
  },
  mounted() {
    this.generateMetabaseTokenUrl();
  },
  methods: {
    changeDashboard(dashboard) {
      this.$store.dispatch('MetabaseStore/setDashboard', dashboard);
    },
    checkValid() {
      const csvFile = document.querySelector('#file');
      this.fileIsValid = csvFile && csvFile.files[0];
    },
    clearFileUpload(close) {
      const csvFile = document.querySelector('#file');
      if (csvFile && csvFile.files) csvFile.value = '';
      this.$store.dispatch('MetabaseStore/setShowUploadErrorMessage', false);
      this.$store.dispatch('MetabaseStore/setShowUploadSuccessMessage', false);

      if (close) {
        this.uploadFileContainer = false;
      } else {
        this.showUploadFileContainer();
      }
    },
    generateMetabaseTokenUrl() {
      this.$store.dispatch('MetabaseStore/generateMetabaseTokenUrl');
      /*
      const { covidDashboard } = this;
      const payload = {
        resource: {
          dashboard: covidDashboard ? 5 : 6,
        },
        params: {
        },
        exp: Math.round(Date.now() / 1000) + (10 * 60), // 10 minute expiration
      };
      const token = jwt.sign(payload, METABASE_SECRET_KEY);
      this.iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false&refresh=60`; */
    },
    refreshMetabase() {
      const iFrame = document.getElementById('metabase-content');
      if (iFrame) {
        this.generateMetabaseTokenUrl();
        /*
        this.$nextTick(() => {
          iFrame.src = this.dashboardUrl;
        }); */
      }
    },
    saveToPDF() {
      let originalHeight = '';
      const metabaseContainer = document.getElementById('metabase-container');
      this.printMode = true;
      if (metabaseContainer) {
        originalHeight = metabaseContainer.clientHeight;
        metabaseContainer.style.height = '7500px';
      }
      this.$nextTick(() => {
        window.print();
        this.printMode = false;
        if (metabaseContainer) metabaseContainer.style.height = `${originalHeight}px`;
      });
    },
    showUploadFileContainer() {
      this.uploadFileContainer = true;
      this.$nextTick(() => {
        const uploadFileContainer = document.getElementById('upload-file-container');
        uploadFileContainer.style.maxHeight = '300px';
        uploadFileContainer.style.border = '1px solid #efefef';
      });
    },
    uploadFile() {
      this.isLoadingFileUpload = true;
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
a {
  color: #42b983;
}
</style>
