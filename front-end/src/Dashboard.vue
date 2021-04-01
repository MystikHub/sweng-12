<template>
  <div id="dashboard">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <ChartGrid />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ChartGrid from './components/ChartGrid'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    ChartGrid,
    Header
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
  color: #2c3e50;
}
</style>
