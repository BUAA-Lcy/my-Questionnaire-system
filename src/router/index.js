import {createRouter,createWebHashHistory} from 'vue-router'
const Login=()=>import('../components/Login/login.vue')
const Edit=()=>import('../components/Edit/edit.vue')
const Project=()=>import('../components/Project/Project.vue')
const Result=()=>import('../components/Result/Result.vue')
const Lcytest=()=>import('../components/Result/test.vue')
const Lcytest_about=()=>import('../components/Result/about.vue')
const Lcytest_contact=()=>import('../components/Result/contact.vue')
const Lcytest_statistic=()=>import('../components/Result/statistic.vue')
const Preview=()=>import('../components/Result/preview.vue')
const Home=()=>import('../components/Home/home.vue')
const change_test=()=>import('../components/Result/change_test.vue')


const routes = [
    { path: '/login', component: Login },
    { path: '/edit', component: Edit },
    { path: '/project', component: Project},
    { path: '/result', component: Result},
    { path: '/lcytest', component: Lcytest},
    { path: '/about', component: Lcytest_about},
    { path: '/contact', component: Lcytest_contact},
    { path: '/statistic', component: Lcytest_statistic},
    { path: '/preview', component: Preview},
    { path: '/home', component: Home},
    { path: '/change_test', component: change_test},


]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router