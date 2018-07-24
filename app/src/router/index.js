import Vue from 'vue'
import Router from 'vue-router'
import ThePeabodyChapter from '@/components/ThePeabodyChapter'
import Sandbox from '@/components/HelloWorld'
import TheHomePage from '@/components/TheHomePage'
import TheSignUpPage from '@/components/TheSignUpPage'
import TheSignInPage from '@/components/TheSignInPage'
import TheCreditsPage from '@/components/TheCreditsPage'
import TheChaptersPage from '@/components/TheChaptersPage'
import TheFeaturesPage from '@/components/TheFeaturesPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TheHomePage
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/chapters',
      name: 'Chapters',
      component: TheChaptersPage
    },
    {
      path: '/features',
      name: 'Features',
      component: TheFeaturesPage
    },
    {
      path: '/chapters/shape-of-history',
      name: 'Peabody',
      component: ThePeabodyChapter
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: TheSignUpPage
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: TheSignInPage
    },
    {
      path: '/credits',
      name: 'Credits',
      component: TheCreditsPage
    }
  ]
})
