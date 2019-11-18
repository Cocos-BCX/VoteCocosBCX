import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Test from '@/components/Test'
import LookForwardTo from '@/components/LookForwardTo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/LookForwardTo',
      name: 'LookForwardTo',
      component: LookForwardTo
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
