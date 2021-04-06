<template>
    <el-card id='Customer-Growth-chart' v-loading="loading">
        <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataformat="dataformat"
        :dataSource="dataSource"
        >
        </fusioncharts>
    </el-card>
</template>

<script>
// Needed for fusioncharts
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import line from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import constants from '../constants'

Vue.use(VueFusionCharts, FusionCharts, line, FusionTheme);

const axios = require('axios').default;
let chartData = []

export default {
    name: "CustomerGrowth",
    data() {
        return {
            type: "line",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "Customer-Growth-chart",
            width: constants.chart_width,
            height: constants.chart_height,
            dataformat: "json",
            dataSource: {
                "chart": {
                    theme: "fusion",
                    caption: "Growth Of Customers",
                    paletteColors: constants.palette,
                    subCaption: "This Business Year",
                    xAxisName: "Month",
                    yAxisName: "No. of Customers",
                    lineThickness: 2
                },
                "data": chartData
            },
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
            const formattedData = await axios.get(`${constants.api_server}/customer_growth`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)

                   let chartData = []
                      var i;
                      for (i = 0; i < response.data.timescale_of_the_dates.length; i++) {
                         chartData.push (
                             {      label: response.data.timescale_of_the_dates[i],
                                    value: response.data.customer_growth_over_time[i],
                             })
                         }
                    return chartData 
                }) 
                .catch(function (error) {
                    console.log("Something went wrong!")
                    console.log(error)
                });
            this.dataSource.data = formattedData;
            this.loading = false
        }
    }
}
</script>