// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import './assets/css/public.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import 'bcx-api'
import '../libs/bcx.min'
import { cacheSession, cacheKey } from '../libs/Utils'
import { browserConnect, lookupWSNodeList } from '../libs/bcx.api'
// import vueSmoothScroll from 'vue-smooth-scroll'
import 'element-ui/lib/theme-chalk/index.css';


import {
  Checkbox,
  Select,
  Option,
  Row,
  Col,
  Button,
  Menu,
  Tag,
  Input,
  DatePicker,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Pagination,
  Loading,
  Radio,
  RadioGroup
} from 'element-ui'

Vue.prototype.$axios = axios;
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
// Vue.use(vueSmoothScroll)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(RadioGroup)



let currentLang = cacheSession.get(cacheKey.lang)
if (!currentLang) {
  cacheSession.set(cacheKey.lang, 'zh')
}
const i18n = new VueI18n({
    locale: 'zh',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
    messages: {
      'zh': require('./common/lang/zh').langZh,   // 中文语言包
      'en': require('./common/lang/en').langEn    // 英文语言包
    }
})




// Vue.config.productionTip = false


browserConnect().then( ()=>{
  console.log("2019-12-17 18:00 update")

  new Vue({
    i18n,
    router,
    render: h => h(App)
  }).$mount('#app')
})
