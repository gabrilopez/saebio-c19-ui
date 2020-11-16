<template>
  <div class="covid-container">
    <div class="covid-navbar">
      <div class="row" style="justify-self: flex-start; align-items: center;">
        <img src="../../assets/icons/menu.png" width="24" height="24" alt="Menu">
        <p class="h6" style="font-size: 10px; padding: 0; margin: 0 10px;">
          ESTADÍSTICAS COVID
        </p>
      </div>
      <div>
        <img src="../../assets/icons/upload.png" width="28" height="28" @click="showUploadFileContainer">
        <img src="../../assets/icons/refresh.png" width="24" height="24">
      </div>
    </div>
    <div v-if="uploadFileContainer" style="margin-top:80px;">
      <form enctype="multipart/form-data" @submit.prevent="uploadFile">
        <div class="upload-file-container">
          <input id="file" type="file" accept=".csv" @change="checkValid">
          <button
            :disabled="!fileIsValid"
            class="btn btn-dark m-3"
            style="cursor: pointer;"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
      <div v-if="isLoadingFileUpload" class="spinner-border" />
    </div>
    <div v-if="iframeUrl" class="metabase-container">
      <iframe
        :src="iframeUrl"
        frameborder="0"
        style="width: 100%; height: 100%;"
        height="100%"
        width="100%"
        allowtransparency
      />
    </div>
    <img
      alt="saebio project"
      class="footer-logo"
      src="../../assets/icons/logo.png"
      width="64"
      height="32"
    >
  </div>
</template>

<script>
import globalAxios from 'axios';

const jwt = require('jsonwebtoken');

export default {
  name: 'CovidContainer',
  data() {
    return {
      fileIsValid: false,
      iframeUrl: null,
      uploadFileContainer: false,
      isLoadingFileUpload: false,
    };
  },
  mounted() {
    const METABASE_SITE_URL = 'http://localhost:3000';
    const METABASE_SECRET_KEY = '8bae34dd8f74efb53e6cbe0b5369ef2f4c327e916e5cc895994ea04c7c7f8984';

    const payload = {
      resource: {
        dashboard: 5,
      },
      params: {
      },
      exp: Math.round(Date.now() / 1000) + (10 * 60), // 10 minute expiration
    };
    const token = jwt.sign(payload, METABASE_SECRET_KEY);
    this.iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=false`;
  },
  methods: {
    uploadFile() {
      this.isLoadingFileUpload = true;
      const formData = new FormData();
      const csvFile = document.querySelector('#file');
      formData.append('file', csvFile.files[0]);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      globalAxios.post('http://localhost:4567/insert-data', formData, config)
        .then((data) => {
          console.log(data);
          this.isLoadingFileUpload = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingFileUpload = false;
        });
    },
    checkValid() {
      const csvFile = document.querySelector('#file');
      this.fileIsValid = csvFile && csvFile.files[0];
    },
    showUploadFileContainer() {
      this.uploadFileContainer = true;
      this.$nextTick(() => {
        const uploadFileContainer = document.getElementsByClassName('upload-file-container')[0];
        uploadFileContainer.style.maxHeight = '300px';
        uploadFileContainer.style.border = '1px solid #efefef';
      });
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
