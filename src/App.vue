<template>
  <div>
    <covid-container />
  </div>
</template>

<script>
import CovidContainer from '@/modules/covid/CovidContainer';

export default {
  name: 'App',
  components: {
    CovidContainer,
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
