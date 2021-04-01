<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ChartGrid msg="Welcome to Group 12's SWENG project"/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
