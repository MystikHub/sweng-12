<template>
  <div id="dashboard">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container id="store-selector">
        <StoreSelector @storeChanged="updateStore"/>
      </el-container>
      <el-main>
        <ChartGrid ref="chartGrid"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ChartGrid from './components/ChartGrid'
import Header from './components/Header'
import StoreSelector from './components/StoreSelector'

export default {
  name: 'Dashboard',
  components: {
    ChartGrid,
    Header,
    StoreSelector
  },
  methods: {
    updateStore(newStore) {
      this.$refs.chartGrid.updateCharts(newStore)
      console.log(newStore)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #F7F7F7;
}

#store-selector {
  padding: 0 20px;
}

#dashboard {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
