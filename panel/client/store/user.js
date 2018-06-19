import axios from '~/plugins/axios'

export const state = () => ({
  data: null
})

export const mutations = {
  SET (state, data) {
    state.data = data
  }
}

export const getters = {
  GET (state) {
    return state.data
  }
}

export const actions = {
  async signin ({ commit }, payload) {
    const response = await axios.post('/api/v1/auth/signin', payload)
    // const { uuid } = response.data

    if (false) {
      const user = await axios.post('/api/v1/user/get', { response })

      commit('SET', user.data)
    }

    return response
  }
}
