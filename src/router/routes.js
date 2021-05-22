const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      {
        path: '/mural',
        name: 'mural',
        component: () => import('pages/Mural.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LayoutClean.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') },
      {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import('pages/CadastroEmp.vue')
      }
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
