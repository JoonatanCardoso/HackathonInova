const routes = [
  {
    path: '/administrador/hom',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('src/pages/admin/HomeAdm.vue')
      },
      {
        path: '/administrador/mural',
        name: 'mural',
        component: () => import('src/pages/admin/Mural.vue')
      },
      {
        path: '/administrador/servicos',
        name: 'servicos',
        component: () => import('src/pages/admin/ServicosADM.vue')
      },
      {
        path: '/administrador/gerenciar-acessos',
        name: 'acesso',
        component: () => import('src/pages/admin/GerenciarAcessos.vue')
      }
    ]
  },
  {
    path: '/empresa/noticias',
    component: () => import('layouts/LayoutEmpresa.vue'),
    children: [
      {
        path: '',
        name: 'noticiasUser',
        component: () => import('src/pages/empresa/NoticiasUser.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LayoutClean.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('src/pages/auth/Login.vue')
      },
      {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import('src/pages/auth/CadastroEmp.vue')
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
