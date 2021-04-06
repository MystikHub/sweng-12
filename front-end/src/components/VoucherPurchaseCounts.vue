<template>
    <el-card id='voucher-purchase-counts-chart' v-loading="loading">
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
    name: "VoucherPurchaseCounts",
    data() {
        return {
            type: "column2d",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "voucher-purchase-counts-chart",
            width: constants.chart_width,
            height: constants.chart_height,
            dataformat: "json",
            dataSource: {
                "chart": {
                    caption: "Total vouchers purchased",
                    paletteColors: constants.palette,
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
            this.loading = true
            // Get the chart data
            const formattedData = await axios.get(`${constants.api_server}/voucher_purchase_counts`)
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
            this.loading = false
        }
    }
}
</script>