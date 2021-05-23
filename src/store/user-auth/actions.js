import { Notify } from 'quasar'
import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

/**
 * login do usuário
 * Passar um obj com emial e senha
 * {
 *   email: '',
 *   password: ''
 * }
 * @param dispatch
 * @param dados
 * @returns {Promise<unknown>}
 */
export const loginUser = ({ commit }, { dados }) => {
  console.log(dados.email, dados.password)
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .signInWithEmailAndPassword(dados.email, dados.password)
      .then(async (user) => {
        let dadosuser
        dadosuser = await Firebase.firestore()
          .collection('usuarios')
          .doc(user.user.uid)
          .get()
          .then((querySnapshot) => {
            return querySnapshot.data()
              ? {
                  operationType: user.operationType,
                  displayName: user.user.providerData[0].displayName,
                  email: user.user.providerData[0].email,
                  phoneNumber: user.user.providerData[0].phoneNumber,
                  photoURL: user.user.providerData[0].photoURL,
                  providerId: user.user.providerData[0].providerId,
                  uid: user.user.uid,
                  data: querySnapshot.data()
                }
              : { status: false }
          })
          .catch((error) => { return { error, status: false } })
        dadosuser.typeUser = 'usuario'
        console.log('🚀 ~ file: actions.js ~ line 44 ~ .then ~ dadosuser', dadosuser)

        if (!dadosuser.status) {
          dadosuser = await Firebase.firestore()
            .collection('empresas')
            .doc(user.user.uid)
            .get()
            .then(querySnapshot => {
              return querySnapshot.data()
                ? {
                    operationType: user.operationType,
                    displayName: user.user.providerData[0].displayName,
                    email: user.user.providerData[0].email,
                    phoneNumber: user.user.providerData[0].phoneNumber,
                    photoURL: user.user.providerData[0].photoURL,
                    providerId: user.user.providerData[0].providerId,
                    uid: user.user.uid,
                    data: querySnapshot.data()
                  }
                : { status: false }
            })
            .catch(error => {
              return { error, status: false }
            })
          dadosuser.typeUser = 'empresa'
          console.log('🚀 ~ file: actions.js ~ line 69 ~ .then ~ dadosuser', dadosuser)
        }

        if (!dadosuser.status) {
          commit('SET_USER', dadosuser)
          resolve(dadosuser)
        } else {
          commit('SET_USER', null)
          console.log('Error getting documents: ', dadosuser.error)
          reject(dadosuser.error)
        }
      })
      .catch((error) => {
        const message =
          error.code === 'auth/user-not-found'
            ? 'Usuário não encontrado'
            : 'Usuário ou senha inválidos'
        Notify.create({
          message: message,
          position: 'top',
          color: 'red-10',
          actions: [
            {
              icon: 'close',
              color: 'white'
            }
          ]
        })
        reject(error)
      })
  })
}

/**
 * set dados do user-auth em state
 * @param commit
 * @param val
 */
export function setUser ({ commit }, val) {
  commit('SET_USER', val)
}

/**
 * realiza o logout do user-auth via firebase
 * @param commit
 * @returns {Promise<unknown>}
 */
export function logoutUser ({ commit }) {
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .signOut()
      .then((data) => {
        commit('SET_USER', null)
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * reset senha do user-auth, encaminha um email para redefinição de senha do mesmo
 * @param commit
 * @param email
 * @returns {Promise<unknown>}
 */
export function esqueciSenhaUser ({ commit }, { email }) {
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
        resolve({
          status: true,
          message:
            'Email enviado com sucesso para iniciar o processo de recuperação de senha!',
          email
        })
      })
      .catch(function (error) {
        // An error happened.
        reject({ status: false, error })
      })
  })
}

/**
 * verifica o token da url do firebase para verificar se é válido para relaizar a alteração de senha
 * - caso for validado é retornado o EMAIL da pessoa
 * @param commit
 * @param code
 * @returns {Promise<String>}
 */
export function verificaTokenRedefinirSenha ({ commit }, { code }) {
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .verifyPasswordResetCode(code)
      .then((email) => {
        console.log(email)
        resolve(email)
      })
      .catch(function (error) {
        // An error happened.
        reject(error)
      })
  })
}

/**
 * resetar seha do usuário após validação do code na função (verificaTokenRedefinirSenha)
 * @param commit
 * @param novaSenha
 * @param code
 * @returns {Promise<unknown>}
 */
export function resetarSenha ({ commit }, { novaSenha, code }) {
  return new Promise((resolve, reject) => {
    const auth = Firebase.auth()
    console.log(novaSenha, code)
    auth
      .verifyPasswordResetCode(code)
      .then((email) => {
        console.log(email)
        auth
          .confirmPasswordReset(code, novaSenha)
          .then(function (resp) {
            resolve(resp)
          })
          .catch(function (error) {
            reject(error)
          })
      })
      .catch(function (error) {
        // An error happened.
        reject(error)
      })
  })
}

/**
 * Alera NOME do usuário logado
 * @param dispatch
 * @param nome
 * @returns {Promise<void>}
 */
export const putNomeUserAuth = ({ commit }, { nome }) => {
  return new Promise((resolve, reject) => {
    const user = Firebase.auth().currentUser
    Firebase.firestore()
      .collection('usuarios')
      .doc(user.uid)
      .set({ nome: nome }, { merge: true })
      .then(function (docRef) {
        Firebase.auth()
          .currentUser.updateProfile({
            displayName: nome
          })
          .then(() => {
            commit('SET_NOME_USER', nome)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
        resolve(docRef)
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
        reject(error)
      })
  })
}

/**
 * Alera EMAIL do usuário logado
 * @param commit
 * @param email
 * @returns {Promise<unknown>}
 */
export const putEmailUserAuth = ({ commit }, { email }) => {
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .currentUser.updateEmail(email)
      .then(() => {
        commit('SET_EMAIL_USER', email)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Altera SENHA do usuário logado
 * @param commit
 * @param senha
 * @returns {Promise<unknown>}
 */
export const putSenhalUserAuth = ({ commit }, { senha }) => {
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .currentUser.updatePassword(senha)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}
