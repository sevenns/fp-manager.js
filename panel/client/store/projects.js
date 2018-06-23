import axios from '~/plugins/axios'

export const state = () => ({
  detailed: {},
  list: {},
  launched: {}
})

export const mutations = {
  SET_DETAILED (state, data) {
    state.detailed = data
  },

  SET_LIST (state, data) {
    state.list = data
  },

  SET_LAUNCHED (state, data) {
    state.launched = data
  }
}

export const getters = {
  GET_DETAILED (state) {
    return state.detailed
  },

  GET_LIST (state) {
    return state.list
  },

  GET_LAUNCHED (state) {
    return state.launched
  }
}

export const actions = {
  async fetchDetailed ({ commit }) {
    const { data } = await axios.get('/api/v1/projects')
    const dataObject = {}

    data.forEach((project) => {
      dataObject[project.name] = project
    })

    commit('SET_DETAILED', dataObject)
  },

  async fetchList ({ commit }) {
    const { data } = await axios.get('/api/v1/projects')
    const list = {}

    data.map((project) => {
      list[project.name] = project

      return project
    })

    commit('SET_LIST', list)
  },

  async fetchLaunched ({ commit }) {
    const { data } = await axios.get('/api/v1/projects/list')
    const launched = {}

    data.map((item) => {
      launched[item.name] = {
        name: item.name,
        port: item.pm2_env.PORT
      }

      return item
    })

    commit('SET_LAUNCHED', launched)
  }
}
