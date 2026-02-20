import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView,
         children: [
            {
               path: '',
               name: 'main',
               component: () => import('../views/Main.vue'),
            },
         ]
      },

      {
         path: '/account',
         name: 'Account',
         component: () => import('../views/Account.vue'),
      },
      {
         path: '/merchant',
         name: 'merchant',
         component: () => import('../views/merchant/LoginMerchant.vue'),
      },
      {
         path: '/client',
         name: 'client',
         component: () => import('../views/merchant/LoginMerchant.vue'),
      },
      {
         path: '/dashboard',
         name: 'dashboard',
         component: () => import('../views/Dashboard.vue'),
      },
   ],
})

export default router
