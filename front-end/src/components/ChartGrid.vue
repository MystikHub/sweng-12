<template>
  <div class="hello">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <MultiStoreCustomers ref="multiStoreChart"/>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <RetentionRate />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <VoucherPurchaseCounts />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <StampTotalTrend ref="stampTotalTrend" />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <PercentHaveRedeemed />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <ActualTotalsPie ref="actualTotalsPieChart"/>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" :xl="6" id="card-bottom">
        <MostPopularVoucher />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ActualTotalsPie from './ActualTotalsPie'
import MostPopularVoucher from './MostPopularVoucher'
import MultiStoreCustomers from './MultiStoreCustomers'
import PercentHaveRedeemed from './PercentHaveRedeemed'
import RetentionRate from './RetentionRate'
import StampTotalTrend from './StampTotalTrend'
import VoucherPurchaseCounts from './VoucherPurchaseCounts'

export default {
  name: 'ChartGrid',
  components: {
    ActualTotalsPie,
    MostPopularVoucher,
    MultiStoreCustomers,
    PercentHaveRedeemed,
    RetentionRate,
    StampTotalTrend,
    VoucherPurchaseCounts,
  },
  methods: {
    updateCharts(newStore) {
      this.$refs.multiStoreChart.getData(newStore)
      this.$refs.actualTotalsPieChart.getData(newStore)
      this.$refs.stampTotalTrend.getData(newStore)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#card-bottom {
  margin-bottom: 30px;
}
</style>
