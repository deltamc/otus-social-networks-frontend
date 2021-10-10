
const routes = [

  {
    path: '/login',
    meta: { auth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Login.vue')}
    ]
  },
  {
    path: '/sign-up',
    meta: { auth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {path: '', component: () => import('pages/SignUp.vue')}
    ]
  },
  {
    path: '/',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/people',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/People.vue') }
    ]
  },

  {
    path: '/friends',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Friends.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
