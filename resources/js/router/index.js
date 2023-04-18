import {createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'

const routes = [
    { path: '/', component: Home, name: 'Home', meta: {title: 'Home'}},
]

const router = createRouter({
    history: createWebHistory(process.env.APP_URL),
    routes
})

router.beforeEach(async (toRoute, fromRoute, next) => {
    window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';
    next()
})

export default router
