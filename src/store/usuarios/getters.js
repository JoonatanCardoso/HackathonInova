const cnaes = require('cnae.json')
export function getListaUsuarios (state) {
  return state.usuarios
}
export function getUserDados (state) {
  return state.usuario
}
export function getEmpresas (state) {
  return state.empresas
}
export function getEmpresa (state) {
  return state.empresa
}
export function getCnae (state) {
  return JSON.parse(cnaes)
}
