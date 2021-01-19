import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/down',
    name: 'DownFile',
    component: () => import('../views/DownFile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
const defaultTitle = "项目模板";

router.beforeEach((to, from, next) => {
  // 改变标题
  document.title = defaultTitle;
  // 判断用户登录是否再在有效期内
  const isAuthenticated = true;
  if (to.name !== 'LoginIn' && !isAuthenticated) {
    next({ name: 'LoginIn' });
  } else {
    next();
  }
});

export default router
