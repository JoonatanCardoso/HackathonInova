import Firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
import Axios from 'axios'
/**
 * get de todos os usuários cadastrado no sistema
 * @param dispatch
 * @param where
 * @returns {Promise<void>}
 */
export const getUsuarios = ({ dispatch }) => {
  const getUsuarios = Firebase.firestore().collection('usuarios')
  return getUsuarios
    .get()
    .then(snapshot => {
      const Usuarios = []
      snapshot.forEach(doc => {
        // Esse foreach percorre todos os docs de uma Collection e cria um Objeto contendo o docId e os dados.
        Usuarios.push({
          docid: doc.id,
          ...doc.data()
        })
      })
      console.log('usuarios', Usuarios)
      dispatch('setUsuarios', Usuarios)
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

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
 * get de Usuarios pelo seu id
 * @param dispatch
 * @param docid
 * @returns {Promise<(*&{docid: string}) | void>}
 */
export const getUsuarioById = ({ dispatch }, { docid }) => {
  return Firebase.firestore()
    .collection('usuarios')
    .doc(docid)
    .get()
    .then(snapshot => {
      const dados = {
        docid: snapshot.id,
        ...snapshot.data()
      }
      dispatch('setUsuario', dados)
      return dados
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
}

/**
 * dados: {
 *  -email
 * -password
 * -tipo
 * -cpf
 * -telefone
 * }
 * adiciona um novo usuário
 * @param dispatch
 * @param dados
 * @returns {Promise<unknown>}
 */
export const addUsuarios = ({ dispatch }, { dados }) => {
  return new Promise((resolve, reject) => {
    // dados.data_cadastro = new Date()
    dados.create_at = moment().format()
    dados.update_at = moment().format()

    const password = Math.random()
      .toString(36)
      .slice(-6)

    Firebase.auth()
      .createUserWithEmailAndPassword(dados.email, password)
      .then(user => {
        Firebase.firestore()
          .collection('usuarios')
          .doc(user.user.uid)
          .set({ ...dados }, { merge: true })
          .then(function (docRef) {
            Axios.post('https://us-central1-hackathoninova-b8cef.cloudfunctions.net/sendPasswordNewUser', {
              destinatario: dados.email,
              password,
              nome: dados.nome,
              status: dados.status
            }).then(res => {
              this.$q.notify({
                position: 'bottom',
                color: 'secondary',
                textColor: 'white',
                icon: 'email',
                message: 'E-mail enviado!'
              })
            })
            dispatch('getUsuarios')
            resolve(docRef)
          })
          .catch(function (error) {
            reject(error)
            console.log('Error getting document:', error)
          })
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
export const putUsuariosMerge = ({ dispatch }, { dados, docid }) => {
  return new Promise((resolve, reject) => {
    dados.update_at = moment().format()

    Firebase.firestore()
      .collection('usuarios')
      .doc(docid)
      .set(dados, { merge: true })
      .then(function (docRef) {
        dispatch('getUsuarios')
        resolve(dados)
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
        reject(error)
      })
  })
}

/**
 * delete de usuário passando o seu DOCID
 * @param dispatch
 * @param docid
 * @returns {Promise<unknown>}
 */
export const delUsuarios = ({ dispatch }, { docid }) => {
  return new Promise((resolve, reject) => {
    Firebase.firestore()
      .collection('usuarios')
      .doc(docid)
      .delete()
      .then(function () {
        // delete acesso do authentication
        Firebase.auth().deleteUser(docid)
        dispatch('getUsuarios')
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
export function setUsuarios ({ commit }, val) {
  commit('SET_USUARIOS', val)
}

/**
 * set usuário com os seus dados caso necessário
 * @param commit
 * @param val
 */
export function setUsuario ({ commit }, val) {
  commit('SET_USUARIO', val)
}
