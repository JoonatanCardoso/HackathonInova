export const SET_USER = (state, val) => {
  state.user = val
}
export const RESET_USER = (state) => {
  state.user = null
}
export const SET_EMAIL_USER = (state, val) => {
  state.user.email = val
}
export const SET_NOME_USER = (state, val) => {
  state.user.displayName = val
}
export const SET_USERDADOS = (state, val) => {
  state.user.dados = val
}
