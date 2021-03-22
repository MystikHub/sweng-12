<template>
  <div id="app">
    <fusioncharts
    :type="type"
    :width="width"
    :height="height"
    :dataFormat="dataFormat"
    :dataSource="dataSource"
></fusioncharts>
</div>
</template>

<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import { FCComponent } from "vue-fusioncharts";

//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme,FCComponent)
Charts(FusionCharts);
const dataSource = {
  chart: {
    caption: "Stamp Trend",
    subcaption: "The Pavilion Bar",
    xaxisname: "Location",
    yaxisname: "Total number of stamps redeemed",
    formatnumberscale: "1",
    plottooltext:
      "<b>$dataValue</b> stamps were redeemed for the <b>$seriesName</b> in $label",
    theme: "fusion",
    drawcrossline: "1"
  },
  categories: [
    {
      category: [
        {
          label: "PAV 1"
        },
        {
          label: "PAV 2"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Drinks Scheme",
      data: [
        {
          value: "16616"
        },
        {
          value: "2670"
        }
      ]
    },
    {
      seriesname: "Sandwich Scheme",
      data: [
        {
          value: "0"
        },
        {
          value: "195"
        }
      ]
    },
    
  ]
};

export default {
  name:"stampTrend",
  data(){
    return{
    type: "mscolumn2d",
    width: "50%",
    height: "3000%",
    dataFormat: "json",
    dataSource
    }
  }
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
