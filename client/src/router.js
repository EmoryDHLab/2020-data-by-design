import Vue from 'vue'
import Router from 'vue-router'
import PeabodyChapter from './views/PeabodyChapter.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'
import Credits from './views/Credits.vue'
import Chapters from './views/Chapters.vue'
import Home from './views/Home.vue'
import Sandbox from './views/Sandbox.vue'
import Features from './views/Features.vue'
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
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/chapters',
      name: 'Chapters',
      component: Chapters
    },
    {
      path: '/features',
      name: 'Features',
      component: Features
    },
    {
      path: '/chapters/shape-of-history',
      name: 'Peabody',
      component: PeabodyChapter
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits
    }
  ],
})
