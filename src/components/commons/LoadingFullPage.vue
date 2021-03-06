<template>
  <div class="full-page-blur">
    <div class="spinner-border loading-75" />
  </div>
</template>

<script>
export default {
  name: 'LoadingFullPage',
};
</script>

<style scoped>
.full-page-blur {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  justify-content: center;
  align-items: center;
  display: flex;
}
.loading-75 {
  height: 75px;
  width: 75px;
}
</style>
