import Firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
/**
 * get all murais
 * @param dispatch
 * @returns {Promise<void>}
 */
export const getMurais = ({ dispatch }) => {
  const getUsuarios = Firebase.firestore()
    .collection('murais')

  return getUsuarios
    .get()
    .then(snapshot => {
      const Murais = []
      snapshot.forEach(doc => {
        // Esse foreach percorre todos os docs de uma Collection e cria um Objeto contendo o docId e os dados.
        Murais.push({
          docid: doc.id,
          ...doc.data()
        })
      })
      dispatch('setMurais', Murais)
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

export const getCountMurais = ({ dispatch }) => {
  const getUsuarios = Firebase.firestore().collection('murais')

  return getUsuarios
    .get()
    .then(snapshot => {
      const mural = []
      const Murais = {
        geral: 0
      }
      snapshot.forEach(doc => {
        mural.push(doc.id)
        if (!Murais[doc.data().tipo]) {
          Murais[doc.data().tipo] = []
        }
        Murais[doc.data().tipo].push({
          docid: doc.id,
          ...doc.data()
        })
      })
      Murais.geral = mural.length
      dispatch('setEstatisticas', Murais)
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 * get de Mural pelo seu id
 * @param dispatch
 * @param docid
 * @returns {Promise<(*&{docid: string}) | void>}
 */
export const getMuralById = ({ dispatch }, { docid }) => {
  return Firebase.firestore()
    .collection('murais')
    .doc(docid)
    .get()
    .then(snapshot => {
      const dados = {
        docid: snapshot.id,
        ...snapshot.data()
      }
      dispatch('setMural', dados)
      return dados
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 * dados = {
 *  - titulo
 * - tipo
 * - link
 * - data_validade
 * }
 * @param {*} dados
 * @returns {Promise<unknown>}
 */
export const addMural = ({ dispatch }, { dados }) => {
  return new Promise((resolve, reject) => {
    dados.create_at = moment().format()
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('murais')
      .add(dados)
      .then(function (docRef) {
        dispatch('getMurais')
        resolve(docRef)
      })
      .catch(function (error) {
        reject(error)
        console.log('Error getting document:', error)
      })
  })
}

/**
 * altera apenas os dados que forem passados via parametro em DADOS
 * @param dispatch
 * @param dados
 * @param docid
 * @returns {Promise<unknown>}
 */
export const putMuraisMerge = ({ dispatch }, { dados, docid }) => {
  return new Promise((resolve, reject) => {
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('murais')
      .doc(docid)
      .set(dados, { merge: true })
      .then(function (docRef) {
        dispatch('getMurais')
        resolve(dados)
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
        reject(error)
      })
  })
}

/**
 * delete de mural passando o seu DOCID
 * @param dispatch
 * @param docid
 * @returns {Promise<unknown>}
 */
export const delMural = ({ dispatch }, { docid }) => {
  return new Promise((resolve, reject) => {
    Firebase.firestore()
      .collection('murais')
      .doc(docid)
      .delete()
      .then(function () {
        dispatch('getMurais')
        resolve()
      })
      .catch(function (error) {
        console.error('Error removing document: ', error)
        reject(error)
      })
  })
}

/**
 * set lista de usuários
 * @param commit
 * @param val
 */
export function setMurais ({ commit }, val) {
  commit('setMurais', val)
}

/**
 * set usuário com os seus dados caso necessário
 * @param commit
 * @param val
 */
export function setMural ({ commit }, val) {
  commit('setMural', val)
}

export function setEstatisticas ({ commit }, val) {
  commit('setEstatisticas', val)
}
