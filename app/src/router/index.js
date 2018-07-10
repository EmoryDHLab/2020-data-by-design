import Vue from 'vue'
import Router from 'vue-router'
import ThePeabodyChapter from '@/components/ThePeabodyChapter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chapter 1',
      component: ThePeabodyChapter
    }
  ]
})
