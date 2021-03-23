<template>
  <div id="total-stamp-trend">
    <fusioncharts
    :type="type"
    :width="width"
    :height="height"
    :dataFormat="dataFormat"
    :dataSource="dataSource"
    ></fusioncharts>
</div>
</template>

<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import { FCComponent } from "vue-fusioncharts";

//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme,FCComponent)
Charts(FusionCharts);

const axios = require('axios').default;
let api_server = 'http://localhost:5000';
let scheme = '002'
const dataSource={}

export default {
  name:"StampTotalTrend",
    data(){
        return{
            type: "mscolumn2d",
            width: "50%",
            height: "100%",
            dataFormat: "json",
            drawcrossline: "1",
            caption: "Stamp Trend",
            subcaption: "The Pavilion Bar",
            xaxisname: "Location",
            yaxisname: "Total number of stamps redeemed",
            formatnumberscale: "1",
            plottooltext:
            "<b>$dataValue</b> stamps were redeemed for the <b>$seriesName</b> in $label",
            dataSource
            
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        async getData(){

            // Get the chart data
            const formattedData = await axios.get(`${api_server}/stamp_total_trend?schemeNo=${scheme}`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)

                    const dataSource =
                        {
                            chart: {
                                caption: "Stamp Trend",
                                subcaption: "The Pavilion Bar",
                                xaxisname: "Location",
                                yaxisname: "Total number of stamps redeemed",
                                formatnumberscale: "1",
                                plottooltext:
                                "<b>$dataValue</b> stamps were redeemed for the <b>$seriesName</b> in $label",
                                theme: "fusion",
                                drawcrossline: "1"
                            },
                            categories: [
                                {
                                    category: [
                                        {
                                        label: "PAV 1"
                                        },
                                        {
                                        label: "PAV 2"
                                        }
                                    ]
                                }
                            ],
                            dataset: [
                                {
                                    seriesname: "Drinks Scheme",
                                    data: [
                                        {
                                        value: response.data.stamp_total_trend
                                        },
                                        {
                                        value: response.data.pav2drinks
                                        }
                                    ]
                                },
                                {
                                    seriesname: "Sandwich Scheme",
                                    data: [
                                        {
                                        value: response.data.pav1sandwich
                                        },
                                        {
                                        value: response.data.sandwich
                                        }
                                    ]
                                },
                                    
                            ]
                        }
                    
                    return dataSource
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
