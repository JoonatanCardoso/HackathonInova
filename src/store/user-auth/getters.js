export function getUser (state) {
  return state.user
}

export function isAuthenticated (state) {
  return !!Object.keys(state.user).length
}
