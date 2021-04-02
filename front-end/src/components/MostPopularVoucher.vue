<template>
    <div id="popularVoucher">
    <div id="chart-container">
      <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataformat="dataFormat"
      :dataSource="dataSource"
      >
      </fusioncharts>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';

//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)

const axios = require('axios').default;
let api_server = 'http://localhost:3000';
let scheme = '002'
// Copy datasource from 'Data' tab
const dataStore = {}

export default {
    name: 'popularVoucher',
    data() {
        return {
            type: 'pie2d',
            width: '100%',
            height: '400',
            dataFormat: 'json',
            renderAt: "chart-container",
            dataSource: dataStore,
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            // Get the chart data
            const formattedData = await axios.get(`${api_server}/most_popular_scheme?scheme=${scheme}`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)
                         const dataStore = {
                                "chart": {
                                "caption": "Most Popular Voucher Size",
                                "subCaption": "All time",
                                "numberPrefix": "$",
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
                                },
                                {
                                    "label": response.data.label3,
                                    "value": response.data.value3
                                },
                                {
                                    "label": response.data.label4,
                                    "value": response.data.value4
                                },
                                {
                                    "label": response.data.label5,
                                    "value": response.data.value5
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
        },
    }
}

</script>

<style>

</style>
