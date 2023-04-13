import {createRouter, createWebHistory } from 'vue-router'

const routes = [

]

const router = createRouter({
    history: createWebHistory(process.env.APP_URL),
    routes
})

router.beforeEach(async (toRoute, fromRoute, next) => {

})

export default router
