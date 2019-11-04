// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import './assets/css/public.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueSmoothScroll from 'vue-smooth-scroll'
import { initBcx } from '../libs/bcx.api'
import { initRootFontSize } from '../libs/Utils'
import { Popup, Indicator, Loadmore } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueI18n);
Vue.use(Indicator);
Vue.component(Popup.name, Popup);
Vue.component(Loadmore.name, Loadmore);

initBcx()
initRootFontSize();
const i18n = new VueI18n({
    locale: 'zh',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
    messages: {
      'zh': require('./common/lang/zh'),   // 中文语言包
      'en': require('./common/lang/en')    // 英文语言包
    }
})



Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios)
// Vue.use(vueSmoothScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
