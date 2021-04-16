<template>
  <div id="app">
    <el-card v-loading="loading">
        <div :style="divContents">
            <h4 class="centered">Average voucher package size</h4>
            <p class="centered">Across all stores</p>
            <h1 class="centered primary">{{averageSize}} Vouchers</h1>
        </div>
    </el-card>
  </div>
</template>

<script>
import constants from "../constants";
const axios = require('axios').default;

export default {
    name: 'app',
    data() {
        return {
            dataSource: {},
            averageSize: 0,
            loading: true
        }
    },
    mounted() {
        this.getData();
    },
    computed: {
        divContents() {
            return `
                height: ${constants.chart_height}px;
                font-size: 20px;
            `;
        }
    },
    methods: {
        async getData() {
            this.loading = true
            // Get the chart data
            const averageSize = await axios.get(`${constants.api_server}/voucher_purchase_counts`)
                .then(function (response) {
                    // Handle success
                    let individualVouchers = response.data.vouchers;
                    let numberOfPackages = response.data.voucher_packages;

                    return Math.round((individualVouchers / numberOfPackages) * 10) / 10;
                })
                .catch(function (error) {
                    console.log("Something went wrong!")
                    console.log(error)
                });
            this.averageSize = averageSize;
            this.loading = false;
        },
    }
}
</script>

<style scoped>
.centered {
    text-align: center;
}

.primary {
    color: #FA7268;
}

h4 {
    margin-top: 0;
    margin-bottom: 5px;
    padding-top: 25%;
}
</style>