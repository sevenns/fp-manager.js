<template lang='pug'>

v-container(grid-list-xl)
  v-layout
    v-flex(xs6)
      v-card
        v-card-text
          v-select(
            :items='projects',
            v-model='project.name'
            label='Project',
            item-text='name',
            item-value='name',
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
            @click='list',
            color='light-green'
          ) Get list

          v-spacer

          v-btn(
            outline,
            @click='stop',
            :loading='isStarting',
            :disabled='!project.name',
            color='light-green'
          ) Stop

          v-btn(
            outline,
            @click='start',
            :loading='isStarting',
            :disabled='!project.name',
            color='light-green'
          ) Start server

</template>

<script>

import axios from '~/plugins/axios'

export default {
  async asyncData () {
    const projects = await axios.get('/api/projects')

    return {
      projects: projects.data
    }
  },

  data () {
    return {
      ports: [3000, 3001, 3002],

      isStarting: false,

      project: {
        name: '',
        port: ''
      }
    }
  },

  methods: {
    async start () {
      if (this.project.name) {
        this.isStarting = true

        await axios.post('/api/projects/start', {
          project: this.project
        })

        this.isStarting = false
      }
    },

    async stop () {
      if (this.project.name) {
        this.isStarting = true

        await axios.post('/api/projects/stop', {
          name: this.project.name
        })

        this.isStarting = false
      }
    },

    async list () {
      const process = await axios.get('/api/projects/list')

      console.log(process)
    }
  }
}

</script>
