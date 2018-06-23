<template lang='pug'>

v-container(grid-list-xl)
  v-layout
    v-flex(xs4)
      v-card
        v-card-text
          v-select(
            :items='projectsStoped',
            v-model='project.name'
            label='Project',
            color='light-green'
          )

          v-select(
            :items='ports',
            v-model='project.port'
            :disabled='!project.name',
            label='Port',
            color='light-green'
          )

        v-card-actions

          v-btn(
            outline,
            @click='check',
            color='light-green'
          ) Check

          v-spacer

          v-btn(
            outline,
            @click='start',
            :loading='isStarting',
            :disabled='!project.name',
            color='light-green'
          ) Start server

    v-flex(xs8)
      v-card
        v-card-title Launched projects

        v-card-text.launched-projects
          v-loader(:active='isStopping')
          v-data-table(
            :items='toArray(projectsLaunched)',
            hide-actions, hide-headers
          )
            v-progress-linear(
              slot='progress',
              color='light-green',
              indeterminate
            )
            template(slot='items', slot-scope='props')
              td {{ props.item.name }}
              td
                | PORT:
                |
                strong {{ props.item.port }}
              td.text-xs-right
                v-btn(
                  fab, flat, small,
                  color='red',
                  @click='stop(props.item.name)'
                )
                  v-icon mdi-stop-circle-outline


</template>

<script>

import toArray from '~/plugins/toArray'
import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

import Loader from '~/components/loader'

export default {
  components: {
    'v-loader': Loader
  },

  async fetch ({ store }) {
    await store.dispatch('projects/fetchDetailed')
    await store.dispatch('projects/fetchList')
    await store.dispatch('projects/fetchLaunched')
  },

  data () {
    return {
      ports: [3000, 3001, 3002],

      isStarting: false,
      isStopping: false,

      project: {
        name: '',
        port: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      projects: 'projects/GET_DETAILED',
      projectsLaunched: 'projects/GET_LAUNCHED',
      projectsList: 'projects/GET_LIST'
    }),

    projectsStoped () {
      const stoped = []
      const projectsListArray = toArray(this.projectsList)
      const projectsLaunchedArray = toArray(this.projectsLaunched, 'name')

      projectsListArray.map((project) => {
        if (!projectsLaunchedArray.includes(project.name)) {
          stoped.push(project.name)
        }

        return project
      })

      return stoped
    }
  },

  methods: {
    async start () {
      if (this.project.name) {
        this.isStarting = true

        try {
          const { data } = await axios.post('/api/v1/projects/start', {
            project: this.project
          })

          this.projectsLaunched[data.name] = {
            name: data.name,
            port: data.port
          }

          const deleteId = this.projectsStoped.findIndex(x => x === data.name)

          this.projectsStoped.splice(deleteId, 1)
        } catch (error) {
          console.error(error)
        } finally {
          this.isStarting = false
        }
      }
    },

    async stop (name) {
      this.isStopping = true

      await axios.post('/api/v1/projects/stop', { name })

      this.isStopping = false
    },

    async list () {
      const process = await axios.get('/api/v1/projects/list')

      console.log(process)
    },

    async check () {
      if (this.project.name) {
        const { dispatch } = this.$store
        const isLaunched = await dispatch('projects/check', this.project.name)

        console.log(isLaunched)
      }
    },

    toArray (obj) {
      return toArray(obj)
    }
  }
}

</script>

<style lang='sass' scoped>

.launched-projects
  position: relative

</style>

