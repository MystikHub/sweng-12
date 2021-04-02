<template>
    <el-card id='multi-store-customers-chart' v-loading="loading">
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
import Pie2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import constants from '../constants'

Vue.use(VueFusionCharts, FusionCharts, Pie2D, FusionTheme);

const axios = require('axios').default;
let store = '001'
let chartData = []

export default {
    name: "MultiStoreCustomers",
    data() {
        return {
            type: "pie2d",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "multi-store-customers-chart",
            width: constants.chart_width,
            height: constants.chart_height,
            dataformat: "json",
            dataSource: {
                "chart": {
                    caption: "Percentage of customers of this store that have also visited another store",
                    showPercentInTooltip: "1",
                    theme: "fusion"
                },
                "data": chartData
            },
            loading: true
        }
    },
    mounted() {
        this.getData(store)
    },
    methods: {
        async getData(store) {
            console.log('Getting data with selected store = ' + this.selectedStore)
            // Get the chart data
            const formattedData = await axios.get(`${constants.api_server}/multi_store_customers?store=${store}`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)

                    chartData = [
                        {
                            label: "Customers who also visited another store",
                            value: response.data.multi_store_customers
                        },
                        {
                            label: "Customers who only visited this store",
                            value: response.data.single_store_customers
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