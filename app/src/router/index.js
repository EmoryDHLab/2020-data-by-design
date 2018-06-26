import Vue from 'vue'
import Router from 'vue-router'
import ChapterSection from '@/components/ChapterSection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chapter 1',
      component: ChapterSection
    }
  ]
})
