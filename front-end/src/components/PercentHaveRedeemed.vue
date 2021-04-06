<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import constants from "../constants"

//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)

const axios = require('axios').default;
let scheme = ''
// Copy datasource from 'Data' tab
const dataStore = {}

export default {
    name: 'app',
  data() {
        return {
            type: 'pie2d',
            width: constants.chart_width,
            height: constants.chart_height,
            dataFormat: 'json',
            renderAt: "chart-container",
            dataSource: dataStore,
            loading: true
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            this.loading = true
            // Get the chart data
            const formattedData = await axios.get(`${constants.api_server}/total_redeemed_total_unredeemed?scheme=${scheme}`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)
                         const dataStore = {
                                "chart": {
                                "caption": "Percentage total vouchers and total unredeemed",
                                paletteColors: constants.palette,
                                "subCaption": "All time",
                                "numberPrefix": "Vouchers: ",
                                "showPercentInTooltip": "0",
                                "decimals": "1",
                                "useDataPlotColorForLabels": "1",
                                "theme": "fusion"
                                },
                                "data": [
                                {
                                    "label": response.data.label1,
                                    "value": response.data.value1
                                },
                                {
                                    "label": response.data.label2,
                                    "value": response.data.value2
                                }
                                ]
                            }
                            return dataStore
                    })
                .catch(function (error) {
                    console.log("Something went wrong!")
                    console.log(error)
                });
            this.dataSource = formattedData;
            this.loading = false
        },
    }
}
</script>

<template>
  <div id="app">
    <el-card id="chart-container" v-loading="loading">
      <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataformat="dataFormat"
      :dataSource="dataSource"
      >
      </fusioncharts>
    </el-card>
  </div>
</template>