export const strict = false

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    const { token, username } = req.session

    if (token && username) {
      commit('user/SET', { token, username })
    }
  }
}

