import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/shop',
            name: 'shop',
            component: () => import('../views/ProductsView.vue')
        },
        {
            path: '/posts/:id',
            name: 'post',
            component: () => import('../views/PostView.vue')
        }
    ]
});

export default router;
