import Vue from 'vue'
import Router from 'vue-router'
import PeabodyChapter from './views/PeabodyChapter'
import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import Credits from './views/Credits'
import Chapters from './views/Chapters'
import Home from './views/Home'
import Sandbox from './views/Sandbox'
import Features from './views/Features'
import Account from './views/Account'
import DuboisChapter from "./views/DuboisChapter";
import PlayfairChapter from "./views/PlayfairChapter";
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
      path: '/account',
      name: 'Account',
      component: Account
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
      name: 'PeabodyChapter',
      component: PeabodyChapter
    },
    {
      path: '/chapters/dubois',
      name: 'DuboisChapter',
      component: DuboisChapter
    },
    {
      path: '/chapters/playfair',
      name: 'PlayfairChapter',
      component: PlayfairChapter
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp,
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
  scrollBehavior (to, from, savedPosition) {
    //https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (to.hash) {
      return { selector: to.hash }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }
    }
  }
})
