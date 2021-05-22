const routes = [
  {
    path: '/administrador/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'index',
        component: () => import('src/pages/admin/HomeAdm.vue')
      },
      {
        path: 'mural',
        name: 'mural',
        component: () => import('src/pages/admin/Mural.vue')
      },
      {
        path: 'servicos',
        name: 'servicos',
        component: () => import('src/pages/admin/ServicosADM.vue')
      },
      {
        path: 'gerenciar-acessos',
        name: 'acesso',
        component: () => import('src/pages/admin/GerenciarAcessos.vue')
      }
    ]
  },
  {
    path: '/empresa/',
    component: () => import('layouts/LayoutEmpresa.vue'),
    children: [
      {
        path: 'mural',
        name: 'noticiasUser',
        component: () => import('src/pages/empresa/NoticiasUser.vue')
      },
      {
        path: 'orcamentos',
        name: 'orcamentos',
        component: () => import('src/pages/empresa/Orcamentos.vue')
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
