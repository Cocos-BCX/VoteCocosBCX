import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Questionnaire from '@/components/Questionnaire'
import Introduction from '@/components/questionnaire/Introduction'
import Form from '@/components/questionnaire/Form'
import Confirmform from '@/components/questionnaire/Confirmform'
import Success from '@/components/questionnaire/Success'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questionnaire,
      children:[
        {
          path: '/',
          component: Introduction 
        },
        {
          path: '/questionnaire/form',
          component: Form 
        },
        {
          path: '/questionnaire/confirmform',
          component: Confirmform 
        },
        {
          path: '/questionnaire/success',
          component: Success 
        }
      ]
    }
  ]
})
