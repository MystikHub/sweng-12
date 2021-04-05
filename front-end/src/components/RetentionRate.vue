<template>
    <el-card id='retention-rate-customers-chart' v-loading="loading">
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
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import constants from '../constants'

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

const axios = require('axios').default;
let chartData = []

export default {
    name: "RetentionRate",
    data() {
        return {
            type: "column2d",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "retention-rate-customers-chart",
            width: constants.chart_width,
            height: constants.chart_height,
            dataformat: "json",
            dataSource: {
                "chart": {
                    caption: "Customer Retention Rate",
                    paletteColors: constants.palette,
                    subcaption: "Customers from 60-30 days ago who also redeemed a stamp in the past 30 days",
                    showPercentInTooltip: "1",
                    theme: "fusion"
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

            // Get the chart data
            const formattedData = await axios.get(`${constants.api_server}/retention_rate`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)

                    chartData = [
                        {
                            label: "Loyal customers",
                            value: response.data.loyal_customers
                        },
                        {
                            label: "Other customers",
                            value: response.data.not_loyal_customers
                        }
                    ]

                    return chartData
                })
                .catch(function (error) {
                    console.log("Something went wrong!")
                    console.log(error)
                });
            this.dataSource.data = formattedData
            this.loading = false
        }
    }
}
</script>