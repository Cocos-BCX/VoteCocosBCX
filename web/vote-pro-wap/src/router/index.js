import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Test from '@/views/Test'
import LookForwardTo from '@/views/LookForwardTo'
import QuestionnaireIntro from '@/views/QuestionnaireIntro'
import QuestionnaireForm from '@/views/QuestionnaireForm'
import QuestionnaireConfirm from '@/views/QuestionnaireConfirm'
import QuestionnaireSuccess from '@/views/QuestionnaireSuccess'

Vue.use(Router)

const routes = [
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
  },
  {
    path: '/questionnaireintro',
    name: 'QuestionnaireIntro',
    component: QuestionnaireIntro
  },
  {
    path: '/questionnaireform',
    name: 'QuestionnaireForm',
    component: QuestionnaireForm
  },
  {
    path: '/auestionnaireconfirm',
    name: 'QuestionnaireConfirm',
    component: QuestionnaireConfirm
  },
  {
    path: '/questionnairesuccess',
    name: 'QuestionnaireSuccess',
    component: QuestionnaireSuccess
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
