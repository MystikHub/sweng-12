import Vue from 'vue'
import Dashboard from './Dashboard.vue'
import ElementUI from 'element-ui'
import './element-variables.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(Dashboard),
}).$mount('#dashboard')
