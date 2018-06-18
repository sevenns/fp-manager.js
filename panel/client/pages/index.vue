<template lang='pug'>

v-container.pl-0.pr-0(grid-list-xl)
  v-layout(row, wrap)
    v-flex(xs12, md6)
      h1 Frontend projects manager

  v-layout(row, wrap)
    v-flex(xs12, md6)
      v-select(
        :items='projects',
        v-model='project.name'
        label='Select project',
        item-text='name',
        item-value='name'
      )

      div(v-if='project.name')
        v-select(
          :items='ports',
          v-model='project.port'
          label='Select port'
        )

  v-layout(row, wrap)
    v-flex(xs12, md6)
      v-btn(
        depressed,
        @click='start',
        :loading='isStarting',
        :disabled='!project'
      ) Start test server

      v-btn(
        depressed,
        @click='stop',
        :loading='isStarting',
        :disabled='!project'
      ) Stop

      v-btn(
        depressed,
        @click='list'
      ) Get list

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
