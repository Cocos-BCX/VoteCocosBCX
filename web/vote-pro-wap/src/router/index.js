import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Test from '@/components/Test'
import LookForwardTo from '@/components/LookForwardTo'
import QuestionnaireIntro from '@/components/QuestionnaireIntro'
import QuestionnaireForm from '@/components/QuestionnaireForm'
import QuestionnaireConfirm from '@/components/QuestionnaireConfirm'
import QuestionnaireSuccess from '@/components/QuestionnaireSuccess'

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
})
