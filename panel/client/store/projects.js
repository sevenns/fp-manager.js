import axios from '~/plugins/axios'

export const state = () => ({
  list: {},
  launched: {},
  stopped: {}
})

export const mutations = {
  SET_LIST (state, data) {
    state.list = data
  },

  SET_LAUNCHED (state, data) {
    state.launched = data
  },

  SET_STOPPED (state, data) {
    state.stopped = data
  }
}

export const getters = {
  GET_LIST (state) {
    return state.list
  },

  GET_LAUNCHED (state) {
    return state.launched
  },

  GET_STOPPED (state) {
    return state.stopped
  }
}

export const actions = {
  async fetchAll ({ dispatch }) {
    await dispatch('fetchList')
    await dispatch('fetchLaunched')
    dispatch('fetchStopped')
  },

  async fetchList ({ commit }) {
    const { data } = await axios.get('/api/v1/projects/get')
    const list = data.reduce((acc, p) => ({ ...acc, [p.name]: p }), {})

    commit('SET_LIST', list)
  },

  async fetchLaunched ({ commit }) {
    const { data } = await axios.get('/api/v1/projects/launched')

    const launched = data.reduce((acc, p) => ({
      ...acc,
      [p.name]: {
        name: p.name,
        port: p.pm2_env.PORT
      }
    }), {})

    commit('SET_LAUNCHED', launched)
  },

  fetchStopped ({ commit, getters }) {
    const list = Object.values(getters.GET_LIST).map(p => p.name)
    const launched = Object.values(getters.GET_LAUNCHED).map(p => p.name)

    const stopped = list.filter((project) => {
      return !launched.includes(project)
    })

    commit('SET_STOPPED', stopped)
  }
}
