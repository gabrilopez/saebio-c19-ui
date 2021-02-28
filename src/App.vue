<template>
  <div style="overflow-x: hidden;">
    <!--<metabase-container />-->
    <router-view />
    <!--<backup-container />-->
  </div>
</template>

<script>
// import CovidContainer from '@/modules/metabase/CovidContainer';
// import BackupContainer from '@/modules/backups/BackupContainer';

export default {
  name: 'App',
  components: {
    // BackupContainer,
    // CovidContainer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
