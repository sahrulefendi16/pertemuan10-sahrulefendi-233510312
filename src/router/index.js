import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import UKMList from '../views/UKMList.vue'
import UKMDetail from '../views/UKMDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/ukm', name: 'UKMList', component: UKMList },
  { path: '/ukm/:nama', name: 'UKMDetail', component: UKMDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
