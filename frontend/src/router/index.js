import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Dashboard from '../views/Dashboard.vue'
import Shell from '../views/Shell.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'shell',
                name: 'Shell',
                component: Shell
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const loggedIn = localStorage.getItem('token')
    if (!loggedIn && to.name !== 'Login') {
        next('/login')
    } else {
        if (to.name === 'Main') {
            next({ name: 'Dashboard' })
        } else {
            next()
        }
    }
})

export default router
