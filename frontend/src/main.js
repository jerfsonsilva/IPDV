import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css';

import VueAlertify from 'vue-alertify';
Vue.use(VueAlertify);

import vmodal from 'vue-js-modal'
Vue.use(vmodal)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
