import { useCVStore } from '@/stores/cv-store';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/default/Templates.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/CVSearch.vue'),
  },
  {
    path: '/cv',
    name: 'cv-view',
    component: () => import('@/components/CVView.vue'),
    beforeEnter: () => {
      if (!storeToRefs(useCVStore()).cvAvailable.value) {
        return false;
      }
    },
  },
  {
    path: '/resume-creation',
    name: 'resume-creation',
    component: () => import('@/components/resume-creation/CvFormsPanel.vue'),
    beforeEnter: () => {
      if (storeToRefs(useCVStore()).cvAvailable.value) {
        return false;
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'cv-view' && !storeToRefs(useCVStore()).cvAvailable.value) {
    next({ name: 'resume-creation' });
  } else if (to.name === 'resume-creation' && storeToRefs(useCVStore()).cvAvailable.value) {
    next({ name: 'cv-view' });
  } else {
    next();
  }
});

export default router;
