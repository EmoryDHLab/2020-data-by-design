import Vue from 'vue'
import Router from 'vue-router'
import ThePeabodyChapter from '@/components/ThePeabodyChapter'
import Sandbox from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chapter 1',
      component: ThePeabodyChapter
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
  ]
})
