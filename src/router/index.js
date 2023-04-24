import {createRouter,createWebHashHistory} from 'vue-router'
const Login=()=>import('../components/Login/login.vue')
const Edit=()=>import('../components/Edit/edit.vue')
const Project=()=>import('../components/Project/Project.vue')
const routes = [
    { path: '/login', component: Login },
    { path: '/edit', component: Edit },
    { path: '/project', component: Project},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router