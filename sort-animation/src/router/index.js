import Vue from 'vue'
import Router from 'vue-router'
import RouteEntry from '@/components/RouteEntry'
import ShellSortAnimation from '@/components/ShellSortAnimation'
import QuikSortAnimation from '@/components/QuikSortAnimation'
import CountingSortAnimation from '@/components/CountingSortAnimation'
import RadixSortAnimation from '@/components/RadixSortAnimation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RouteEntry',
      component: RouteEntry
    },
    {
      path: '/shell',
      name: 'ShellSortAnimation',
      component: ShellSortAnimation
    },
    {
      path: '/quik',
      name: 'QuikSortAnimation',
      component: QuikSortAnimation
    },
    {
      path: '/counting',
      name: 'CountingSortAnimation',
      component: CountingSortAnimation
    },
    {
      path: '/radix',
      name: 'RadixSortAnimation',
      component: RadixSortAnimation
    }
  ]
})
