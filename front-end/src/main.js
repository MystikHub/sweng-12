import Vue from 'vue'
import Dashboard from './Dashboard.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(Dashboard),
}).$mount('#dashboard')
