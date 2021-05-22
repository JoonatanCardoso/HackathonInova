import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import usuarios from './usuarios'
import empresas from './empresas'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      usuarios,
      empresas
    },
    plugins: [
      createPersistedState({
        storage: window.localStorage,
        key: 'acelera-ariguaina-vuex',
        paths: ['usuarios', 'empresas']
      })
    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
