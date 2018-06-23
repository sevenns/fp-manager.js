import axios from '~/plugins/axios'

export const state = () => ({
  token: null,
  username: null
})

export const mutations = {
  SET (state, data) {
    state.token = data.token
    state.username = data.username
  }
}

export const getters = {
  GET (state) {
    return {
      token: state.token,
      username: state.username
    }
  },

  GET_TOKEN (state) {
    return state.token
  },

  GET_USERNAME (state) {
    return state.username
  }
}

export const actions = {
  async signin ({ commit }, payload) {
    const { data, status } = await axios.post('/api/v1/auth/signin', payload)
    const isOk = status === 200

    if (isOk) {
      commit('SET', data)
    }

    return isOk
  }
}
