import Firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
/**
 * get all empresas
 * @param dispatch
 * @returns {Promise<void>}
 */
export const getEmpresas = ({ dispatch }) => {
  const getUsuarios = Firebase.firestore()
    .collection('empresas')

  return getUsuarios
    .get()
    .then(snapshot => {
      const Empresas = []
      snapshot.forEach(doc => {
        // Esse foreach percorre todos os docs de uma Collection e cria um Objeto contendo o docId e os dados.
        Empresas.push({
          docid: doc.id,
          ...doc.data()
        })
      })
      console.log('Empresas', Empresas)
      dispatch('setEmpresas', Empresas)
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 * get de Empresa pelo seu id
 * @param dispatch
 * @param docid
 * @returns {Promise<(*&{docid: string}) | void>}
 */
export const getEmpresaById = ({ dispatch }, { docid }) => {
  return Firebase.firestore()
    .collection('empresas')
    .doc(docid)
    .get()
    .then(snapshot => {
      const dados = {
        docid: snapshot.id,
        ...snapshot.data()
      }
      dispatch('setEmpresa', dados)
      return dados
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 *
 * @param {*} dados
 * @returns {Promise<unknown>}
 */
export const addEmpresa = ({ dispatch }, { dados }) => {
  dados.create_at = moment().format()
  dados.update_at = moment().format()

  return new Promise((resolve, reject) => {
    Firebase.auth()
      .createUserWithEmailAndPassword(dados.email, dados.password)
      .then(user => {
        delete dados.password
        dados.uid = user.user.uid
        resolve(dados)
      })
      .catch(error => {
        reject({ error, status: false, message: 'Não foi possivel cadastrar a empresa, verifique o email!' })
      })
  })
}

export const addEmpresaData = ({ dispatch }, { dados }) => {
  dados.create_at = moment().format()
  dados.update_at = moment().format()

  console.log('🚀 ~ file: actions.js ~ line 80 ~ addEmpresaData ~ dados', dados)
  return new Promise((resolve, reject) => {
    if (!dados.email) {
      reject()
    } else {
      Firebase.firestore()
        .collection('empresas')
        .doc(dados.uid)
        .set(dados)
        .then(function (docRef) {
          resolve(docRef)
        })
        .catch(function (error) {
          reject(error)
          console.log('Error getting document:', error)
        })
    }
  })
}

/**
 * altera apenas os dados que forem passados via parametro em DADOS
 * @param dispatch
 * @param dados
 * @param docid
 * @returns {Promise<unknown>}
 */
export const putEmpresasMerge = ({ dispatch }, { dados, docid }) => {
  return new Promise((resolve, reject) => {
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('empresas')
      .doc(docid)
      .set(dados, { merge: true })
      .then(function (docRef) {
        dispatch('getEmpresas')
        resolve(dados)
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
        reject(error)
      })
  })
}

/**
 * set lista de usuários
 * @param commit
 * @param val
 */
export function setEmpresas ({ commit }, val) {
  commit('SET_EMPRESAS', val)
}

/**
 * set usuário com os seus dados caso necessário
 * @param commit
 * @param val
 */
export function setEmpresa ({ commit }, val) {
  commit('SET_EMPRESA', val)
}
