<template>
  <div class="covid-container">
    <div v-if="!printMode" class="covid-navbar">
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
    <div v-if="uploadFileContainer && !printMode" style="margin-top:80px;">
      <form v-if="!uploadErrorMessage" enctype="multipart/form-data" @submit.prevent="uploadFile">
        <div class="upload-file-container">
          <input id="file" type="file" accept=".csv" @change="checkValid">
          <button
            :disabled="!fileIsValid"
            class="btn btn-dark m-3"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
      <div v-if="uploadErrorMessage" class="col-12">
        <p>Ha ocurrido un error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde</p>
        <button
          class="bn btn-dark m-3"
          @click="clearFileUpload"
        >
          Intentar de nuevo
        </button>
      </div>
      <div v-if="isLoadingFileUpload" class="spinner-border" />
    </div>
    <div v-if="iframeUrl" id="metabase-container" class="metabase-container">
      <iframe
        id="metabase-content"
        :src="iframeUrl"
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
        alt="saebio project"
        src="../../assets/icons/logo.png"
        width="64"
        height="32"
      >
      <img
        alt="Descargar informe completo"
        src="../../assets/icons/download.png"
        style="cursor: pointer;"
        width="60"
        height="49"
        @click="saveToPDF"
      >
    </div>
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
      isLoadingFileUpload: false,
      printMode: false,
      uploadFileContainer: false,
      uploadErrorMessage: false,
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
    checkValid() {
      const csvFile = document.querySelector('#file');
      this.fileIsValid = csvFile && csvFile.files[0];
    },
    clearFileUpload() {
      const csvFile = document.querySelector('#file');
      if (csvFile && csvFile.files) csvFile.files.slice(0);
      this.uploadErrorMessage = false;
      this.showUploadFileContainer();
    },
    saveToPDF() {
      let originalHeight = '';
      const metabaseContainer = document.getElementById('metabase-container');
      this.printMode = true;
      if (metabaseContainer) {
        originalHeight = metabaseContainer.clientHeight;
        metabaseContainer.style.height = '7000px';
      }
      this.$nextTick(() => {
        window.print();
        this.printMode = false;
        if (metabaseContainer) metabaseContainer.style.height = originalHeight;
      });
    },
    showUploadFileContainer() {
      this.uploadFileContainer = true;
      this.$nextTick(() => {
        const uploadFileContainer = document.getElementsByClassName('upload-file-container')[0];
        uploadFileContainer.style.maxHeight = '300px';
        uploadFileContainer.style.border = '1px solid #efefef';
      });
    },
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
          this.uploadErrorMessage = true;
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
