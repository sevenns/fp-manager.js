export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    const { token, username } = req.session

    if (token && username) {
      commit('user/SET', { token, username })
    }
  },

  nuxtClientInit (store, context) {
    console.log(store)
    console.log(context)
  }
}

