import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Questionnaire from '@/views/Questionnaire'
import Introduction from '@/views/questionnaire/Introduction'
import Form from '@/views/questionnaire/Form'
import Confirmform from '@/views/questionnaire/Confirmform'
import Success from '@/views/questionnaire/Success'

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
