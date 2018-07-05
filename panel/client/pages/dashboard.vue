<template lang='pug'>

v-container(grid-list-xl)
  v-layout
    v-flex(xs4)
      v-card
        v-card-text
          v-select(
            :items='projectsStopped',
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
          v-spacer

          v-btn(
            outline,
            @click='start',
            :loading='isStarting',
            :disabled='!project.name || !project.port',
            color='light-green'
          ) Launch

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
    await store.dispatch('projects/fetchAll')
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
      projects: 'projects/GET_LIST',
      projectsLaunched: 'projects/GET_LAUNCHED',
      projectsStopped: 'projects/GET_STOPPED'
    })
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

          const deleteId = this.projectsStopped.findIndex(x => x === data.name)

          this.projectsStopped.splice(deleteId, 1)
          this.project = { name: '', port: '' }
        } catch (error) {
          console.error(error)
        } finally {
          this.isStarting = false
        }
      }
    },

    async stop (name) {
      this.isStopping = true

      try {
        await axios.post('/api/v1/projects/stop', { name })

        this.projectsStopped.push(this.projectsLaunched[name].name)
        delete this.projectsLaunched[name]
      } catch (error) {
        console.error(error)
      } finally {
        this.isStopping = false
      }
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

