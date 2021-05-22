import Firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
/**
 * get all servicos
 * @param dispatch
 * @returns {Promise<void>}
 */
export const getServicos = ({ dispatch }) => {
  const getUsuarios = Firebase.firestore()
    .collection('servicos')

  return getUsuarios
    .get()
    .then(snapshot => {
      const Servicos = []
      snapshot.forEach(doc => {
        // Esse foreach percorre todos os docs de uma Collection e cria um Objeto contendo o docId e os dados.
        Servicos.push({
          docid: doc.id,
          ...doc.data()
        })
      })
      dispatch('setServicos', Servicos)
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 * get de Servico pelo seu id
 * @param dispatch
 * @param docid
 * @returns {Promise<(*&{docid: string}) | void>}
 */
export const getServicoById = ({ dispatch }, { docid }) => {
  return Firebase.firestore()
    .collection('servicos')
    .doc(docid)
    .get()
    .then(snapshot => {
      const dados = {
        docid: snapshot.id,
        ...snapshot.data()
      }
      dispatch('setServico', dados)
      return dados
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 * dados = {
 * titulo:
 * descricao:
 * celular: (whatsapp)
 * email:
 * link: (optional)
 * }
 * @param {*} dados
 * @returns {Promise<unknown>}
 */
export const addServico = ({ dispatch }, { dados }) => {
  return new Promise((resolve, reject) => {
    dados.create_at = moment().format()
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('servicos')
      .add(dados)
      .then(function (docRef) {
        dispatch('getServicos')
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
export const putServicosMerge = ({ dispatch }, { dados, docid }) => {
  return new Promise((resolve, reject) => {
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('servicos')
      .doc(docid)
      .set(dados, { merge: true })
      .then(function (docRef) {
        dispatch('getServicos')
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
export const delMarcas = ({ dispatch }, { docid }) => {
  return new Promise((resolve, reject) => {
    Firebase.firestore()
      .collection('servicos')
      .doc(docid)
      .delete()
      .then(function () {
        dispatch('getServicos')
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
export function setServicos ({ commit }, val) {
  commit('SET_MURAIS', val)
}

/**
 * set usuário com os seus dados caso necessário
 * @param commit
 * @param val
 */
export function setServico ({ commit }, val) {
  commit('SET_MURAL', val)
}
