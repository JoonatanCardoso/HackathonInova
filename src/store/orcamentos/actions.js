import Firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
/**
 * get all murais
 * @param dispatch
 * @returns {Promise<void>}
 */
export const getOrcamentos = ({ dispatch }) => {
  const getOrcamentos = Firebase.firestore()
    .collection('orcamentos')

  return getOrcamentos
    .get()
    .then(snapshot => {
      const Orcamentos = []
      snapshot.forEach(doc => {
        // Esse foreach percorre todos os docs de uma Collection e cria um Objeto contendo o docId e os dados.
        Orcamentos.push({
          docid: doc.id,
          ...doc.data()
        })
      })
      dispatch('setOrcamentos', Orcamentos)
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
export const getOrcamentoById = ({ dispatch }, { docid }) => {
  return Firebase.firestore()
    .collection('orcamentos')
    .doc(docid)
    .get()
    .then(snapshot => {
      const dados = {
        docid: snapshot.id,
        ...snapshot.data()
      }
      dispatch('setOrcamento', dados)
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
export const addOrcamento = ({ dispatch }, { dados }) => {
  return new Promise((resolve, reject) => {
    dados.create_at = moment().format()
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('orcamentos')
      .add(dados)
      .then(function (docRef) {
        dispatch('getOrcamentos')
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
export const putOrcamentosMerge = ({ dispatch }, { dados, docid }) => {
  return new Promise((resolve, reject) => {
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('orcamentos')
      .doc(docid)
      .set(dados, { merge: true })
      .then(function (docRef) {
        dispatch('getOrcamentos')
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
export const delOrcamentos = ({ dispatch }, { docid }) => {
  return new Promise((resolve, reject) => {
    Firebase.firestore()
      .collection('orcamentos')
      .doc(docid)
      .delete()
      .then(function () {
        dispatch('getOrcamentos')
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
export function setOrcamentos ({ commit }, val) {
  commit('setOrcamentos', val)
}

/**
 * set usuário com os seus dados caso necessário
 * @param commit
 * @param val
 */
export function setOrcamento ({ commit }, val) {
  commit('setOrcamento', val)
}
