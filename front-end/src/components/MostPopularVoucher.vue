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
            const formattedData = await axios.get(`${api_server}/total_redeemed_total_unredeemed?scheme=${scheme}`)
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
