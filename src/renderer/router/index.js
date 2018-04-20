import Vue from 'vue'
// import {mapMutations} from 'vuex'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hx from '@/components/PlaneInfo'
import Mcc from '@/components/MccPlane'
import LargeScreen from '@/components/LargeScreen'
import ExportExcel from '@/components/ExportExcel'
import ExportDuty from '@/components/ExportExcel/ExportDuty'
import ExportPlane from '@/components/ExportExcel/ExportPlane'
import ExportNight from '@/components/ExportExcel/ExportNight'
import ExportWorkHours from '@/components/ExportExcel/ExportWorkHours'
import UserCard from '@/components/UserCard'
import UserDuty from '@/components/UserDuty'
import DutyUserMeal from '@/components/UserDuty/DutyUserMeal'
import DutyUserInfo from '@/components/UserDuty/DutyUserInfo'
import DutyUserSearch from '@/components/UserDuty/DutyUserSearch'
import DutyUserAll from '@/components/UserDuty/DutyUserAll'
import DataCenter from '@/components/DataCenter'
import FlightTime from '@/components/DataCenter/FlightTime'
import FlightRoute from '@/components/DataCenter/FlightRoute'
import DataAnalysis from '@/components/DataCenter/DataAnalysis'
import AcTypeData from '@/components/DataCenter/AcTypeData'
import UserInfo from '@/components/DataCenter/UserInfo'
import store from '@/store'
// import * as Mutations from '@/store/Counter/mutations'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    name: 'plane-info',
    component: require('@/components/Index').default,
    meta: {keepAlive: true} // 这个是需要keepalive的
  },
  {
    path: '/hx',
    name: 'plane-info',
    component: Hx,
    meta: {keepAlive: false} // 这是不会被keepalive的
  },
  {
    path: '/mcc',
    component: Mcc,
    meta: {keepAlive: false} // 这是不会被keepalive的
  },
  {
    path: '/screen',
    component: LargeScreen,
    meta: {keepAlive: false} // 这是不会被keepalive的
  },
  {
    path: '/excel',
    component: ExportExcel,
    meta: {keepAlive: false},
    children: [
      {
        path: '/excel/export-duty',
        component: ExportDuty
      },
      {
        path: '/excel/export-plane',
        component: ExportPlane
      },
      {
        path: '/excel/export-night',
        component: ExportNight
      },
      {
        path: '/excel/export-workHours',
        component: ExportWorkHours
      }
    ]
  },
  {
    path: '/card',
    component: UserCard,
    meta: {keepAlive: false}
  },
  {
    path: '/duty',
    component: UserDuty,
    meta: {keepAlive: false},
    children: [
      {
        path: '/duty/meal',
        component: DutyUserMeal
      },
      {
        path: '/duty/info',
        component: DutyUserInfo
      },
      {
        path: '/duty/search',
        component: DutyUserSearch
      },
      {
        path: '/duty/all',
        component: DutyUserAll
      }
    ]
  },
  {
    path: '/data-center',
    component: DataCenter,
    meta: {
      requiresAuth: true,
      keepAlive: false
    }, // 用于判断进入这个路由是否需要认证}, // 需要登录才能进入
    children: [
      {
        path: '/data-center/flight-time',
        component: FlightTime
      },
      {
        path: '/data-center/flight-route',
        component: FlightRoute
      },
      {
        path: '/data-center/data-analysis',
        component: DataAnalysis
      },
      {
        path: '/data-center/user-info',
        component: UserInfo
      },
      {
        path: '/data-center/ac-type-data',
        component: AcTypeData
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('password')) {
  store.commit('SET_PASSWORD', window.localStorage.getItem('password'))
}

// 新建一个路由实例
const router = new Router({
  routes
})

// 在每个路由生效之前，先进行一些处理，请参考 vue-router官方文档-导航钩子
router.beforeEach((to, from, next) => {
  // 对 to.matched 数组中的每个路由调用箭头函数
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断登录状态
    // console.log(Mutations)
    if (store.getters.password) {
      // 继续路由
      next()
    } else {
      // 重定向到登录界面
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    // 继续路由
    next()
  }
})

export default router
