import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import 'font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
// import Vue from 'vue';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: 'fa4',
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
