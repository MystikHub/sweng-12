<template>
  <div class="hello">
    <MultiStoreCustomers />
    <RetentionRate />
  </div>
</template>

<script>
import MultiStoreCustomers from './MultiStoreCustomers'
import RetentionRate from './RetentionRate'

export default {
  name: 'ChartGrid',
  components: {
    MultiStoreCustomers,
    RetentionRate
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
</style>
