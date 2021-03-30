<template>
    <div id='Customer-Growth-chart'>
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
import line from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Vue.use(VueFusionCharts, FusionCharts, line, FusionTheme);

const axios = require('axios').default;
let api_server = 'http://localhost:3000';
let chartData = []

export default {
    name: "CustomerGrowth",
    data() {
        return {
            type: "line",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "Customer-Growth-chart",
            width: 550,
            height: 550,
            dataformat: "json",
            dataSource: {
                "chart": { "theme": "fusion",
                        "caption": "Growth Of Customers",
                        "subCaption": "This Business Year",
                        "xAxisName": "Month",
                        "yAxisName": "No. of Customers",
                        "lineThickness": "2"
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
            const formattedData = await axios.get(`${api_server}/customer_growth`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)


                   chartData = [
                        {
                            label: response.data.timescale_of_the_dates[0],
                            value: response.data.customer_growth_over_time[0],
                            
                        },
                        {
                            label: response.data.timescale_of_the_dates[1],
                            value: response.data.customer_growth_over_time[1]
                        },
                        
                         {
                            label: response.data.timescale_of_the_dates[2],
                            value: response.data.customer_growth_over_time[2]
                        },

                         {
                            label: response.data.timescale_of_the_dates[3],
                            value: response.data.customer_growth_over_time[3]
                        },

                         {
                            label: response.data.timescale_of_the_dates[4],
                            value: response.data.customer_growth_over_time[4]
                        },

                         {
                            label: response.data.timescale_of_the_dates[5],
                            value: response.data.customer_growth_over_time[5]
                        },

                         {
                            label: response.data.timescale_of_the_dates[6],
                            value: response.data.customer_growth_over_time[6]
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