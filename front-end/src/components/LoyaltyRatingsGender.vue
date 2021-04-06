<template>
    <div id='Loyalty_Ratings_By_Age_Groups'>
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
    name: "Loyalty_Ratings",
    data() {
        return {
            type: "column2d",
            showPercentInTooltip: 0,
            theme: "fusion",
            renderAt: "Loyalty-Ratings-Based-On-Gender",
            width: 550,
            height: 550,
            dataformat: "json",
            dataSource: {
                "chart": { 
                        caption: "Loyalty Ratings",
                        subCaption: "Based On Gender",
                        xAxisName: "Gender",
                        yAxisName: "Days Between Stamps",
                        theme: "fusion",
                        showPercentInTooltip: "1",
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
            const formattedData = await axios.get(`${api_server}/loyalty_rating_gender`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)

                   let chartData = []
                      var i;
                      for (i = 0; i < response.data.gender.length; i++) {
                         chartData.push (
                             {      label: response.data.gender[i],
                                    value: response.data.average_days_between_stamps[i],
                             })
                         }
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