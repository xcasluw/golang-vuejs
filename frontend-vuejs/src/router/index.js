import { createRouter, createWebHistory } from 'vue-router'
import Body from './../components/BodyComponent.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        components: Body
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router