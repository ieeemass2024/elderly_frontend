import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import AdminInfo from '../views/Admin/AdminInfo.vue'
import AdminStatistic from '../views/Admin/AdminStatistic.vue'
import AdminPortrait from '../views/Admin/AdminPortrait.vue'
import VolunteerInfo from '../views/Volunteer/VolunteerInfo.vue'
import VolunteerPortrait from '../views/Volunteer/VolunteerPortrait.vue'
import VolunteerStatistic from '../views/Volunteer/VolunteerStatistic.vue'
import ElderInfo from '../views/Elder/ElderInfo.vue'
import ElderPortrait from '../views/Elder/ElderPortrait.vue'
import ElderStatistic from '../views/Elder/ElderStatistic.vue'
import EventInfo from '../views/Event/EventInfo.vue'
import Camera from '../views/Video/Camera.vue'
import CameraInfo from '../views/Video/CameraInfo.vue'
import EventStatistic from '../views/Event/EventStatistic.vue'
import CanvasArea from '../views/Video/CanvasArea.vue'
import Hello from '../views/hello.vue'

Vue.use(VueRouter)

// 解决重复路由，重复点击导航时，控制台报错的问题NavigationDuplicated
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: '登录界面',
    component: Login
  },
  {
    path: '/index',
    name: '后台',
    component: Index,
    redirect: '/adminInfo',
    children: [
      {
        path: '/adminInfo',
        name: '管理员信息列表',
        component: AdminInfo
      },
      {
        path: '/adminPortrait',
        name: '头像管理',
        component: AdminPortrait
      },
      {
        path: '/adminStatistic',
        name: '报表统计',
        component: AdminStatistic
      },
      {
        path: '/volunteerInfo',
        name: '义工信息',
        component: VolunteerInfo
      },
      {
        path: '/volunteerPortrait',
        name: '头像采集',
        component: VolunteerPortrait
      },
      {
        path: '/volunteerStatistic',
        name: '实时报表',
        component: VolunteerStatistic
      },
      {
        path: '/elderInfo',
        name: '老年人信息',
        component: ElderInfo
      },
      {
        path: '/elderPortrait',
        name: '头像采集',
        component: ElderPortrait
      },
      {
        path: '/elderStatistic',
        name: '实时报表',
        component: ElderStatistic
      },
      {
        path: '/eventInfo',
        name: '事件信息',
        component: EventInfo
      },
      {
        path: '/cameraInfo',
        name: '摄像头基本信息',
        component: CameraInfo
      },
      {
        path: '/camera',
        name: '查看视频',
        component: Camera
      },
      {
        path: '/eventStatistic',
        name: '事件报表统计',
        component: EventStatistic
      },
      {
        path: '/hello',
        component: Hello
      },
      {
        path: '/area',
        component: CanvasArea
      }

    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
