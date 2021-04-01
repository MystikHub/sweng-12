<template>
  <div id="dashboard">
    <ChartGrid />
  </div>
</template>

<script>
import ChartGrid from './components/ChartGrid.vue'

export default {
  name: 'App',
  components: {
    ChartGrid
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #F7F7F7;
}

#dashboard {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
