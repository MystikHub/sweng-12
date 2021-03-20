<template>
    <div id='multi-store-customers-chart'>
        <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataformat="dataformat"
        :dataSource="dataSource"
        >
        </fusioncharts>
    </div>
</template>

<script>
// Needed for fusioncharts
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Pie2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Vue.use(VueFusionCharts, FusionCharts, Pie2D, FusionTheme);

const axios = require('axios').default;
let api_server = 'http://localhost:3000';
let store_name = '001'
let chartData = []

export default {
    name: "MultiStoreCustomers",
    data() {
        return {
            type: "pie2d",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "multi-store-customers-chart",
            width: 550,
            height: 550,
            dataformat: "json",
            dataSource: {
                "chart": {
                    caption: "Percentage of customers of this store that have also visited another store",
                    showPercentInTooltip: "1",
                    theme: "fusion"
                },
                "data": chartData
            }
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {

            // Get the chart data
            const formattedData = await axios.get(`${api_server}/multi_store_customers?store=${store_name}`)
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
            this.dataSource.data = formattedData;
        }
    }
}
</script>