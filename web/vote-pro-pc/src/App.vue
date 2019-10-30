<template>
  <div id="app">
    <div class="translate-bar">
      <div class="lang-bar">
        <div class="lang">{{currentLang}}
          <div class="lang-drop">
                <li @click="changeLang('zh')">中文</li>
                <li @click="changeLang('en')">English</li>
            </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { cacheSession, cacheKey } from '../libs/Utils'
export default {
  name: 'App',
  data () {
      return {
          currentLang: '中文',
      }
  },
  methods: {
    changeLang: function (params) {
      this.$i18n.locale = params
      if (this.$i18n.locale == 'zh') {
        this.currentLang = 'English'
        cacheSession.set(cacheKey.lang, 'zh')
      } else {
        this.currentLang = '中文'
        cacheSession.set(cacheKey.lang, 'en')
      }
    }
  }

}
</script>

<style>
.translate-bar{
  width: 100%;
  height: 52px;
  line-height: 52px;
  background:rgba(89,104,213,1);
}
</style>
