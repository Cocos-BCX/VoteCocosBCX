import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Questionnaire from '@/views/Questionnaire'
import Introduction from '@/views/questionnaire/Introduction'
import Form from '@/views/questionnaire/Form'
import Confirmform from '@/views/questionnaire/Confirmform'
import Success from '@/views/questionnaire/Success'

Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
