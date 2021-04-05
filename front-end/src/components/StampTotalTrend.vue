// STEP 1: to include the dependencies
<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Charts from "fusioncharts/fusioncharts.charts";
import { FCComponent } from "vue-fusioncharts";
import constants from "../constants";

Charts(FusionCharts);
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme, FCComponent);
const axios = require('axios').default;
const dataStore={}


export default {
    name: 'StampTotalTrend',
  data() {
    return {
      type: "mscolumn2d",
      renderAt: "stamp-total-trend-chart",
      width: constants.chart_width,
      height: constants.chart_height,
      dataFormat: "json",
      dataSource: dataStore
    }
  },
    mounted() {
        this.getData('')
    },
    methods: {
        async getData(newStore) {

            // Get the chart data
            const formattedData = await axios.get(`${constants.api_server}/stamp_total_Trend?store=${newStore}`)
                .then(function (response) {
                    // Handle success
                    console.log("Here's the response")
                    console.log(response.data)

                    const dataStore = {
                        chart: {
                            caption: "Total Stamps Collected",
                            paletteColors: constants.palette,
                            subcaption: "PAV",
                            xaxisname: "Years",
                            yaxisname: "Total number of stamps",
                            formatnumberscale: "1",
                            plottooltext:
                            "<b>$dataValue</b> stamps were collected for scheme <b>$seriesName</b> in $label",
                            theme: "fusion",
                            drawcrossline: "1"
                        },
                        categories: [
                            {
                            category: [
                                {
                                label: response.data.label1
                                },
                                {
                                label: response.data.label2
                                }
                            ]
                            }
                        ],
                        dataset: [
                            {
                            seriesname: response.data.seriesname1,
                            data: [
                                {
                                value: response.data.value1
                                },
                                {
                                value: response.data.value2
                                }
                            ]
                            },
                            {
                            seriesname: response.data.seriesname2,
                            data: [
                                {
                                value: response.data.value3
                                },
                                {
                                value: response.data.value4
                                }
                            ]
                            },
                            
                        ]
                        };
                    
                    return dataStore
                })
                .catch(function (error) {
                    console.log("Something went wrong!")
                    console.log(error)
                });
            this.dataSource = formattedData;
        }
    }
}
</script>

//STEP 4: Render the chart
<template>
  <el-card id="stamp-total-trend-chart">
      <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataformat="dataFormat"
      :dataSource="dataSource"
      >
      </fusioncharts>
    </el-card>
</template>