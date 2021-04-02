<template>
    <div id='voucher-purchase-counts-chart'>
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
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

const axios = require('axios').default;
let api_server = 'http://localhost:3000';
let chartData = []

export default {
    name: "VoucherPurchaseCounts",
    data() {
        return {
            type: "column2d",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "voucher-purchase-counts-chart",
            width: 550,
            height: 550,
            dataformat: "json",
            dataSource: {
                "chart": {
                    caption: "Total vouchers purchased",
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
            const formattedData = await axios.get(`${api_server}/voucher_purchase_counts`)
                .then(function (response) {
                    // Handle success
                    chartData = [
                        {
                            label: "Vouchers purchased",
                            value: response.data.vouchers
                        },
                        {
                            label: "Voucher packages purchased",
                            value: response.data.voucher_packages
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