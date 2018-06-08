<template lang='pug'>

v-container.pl-0.pr-0(grid-list-xl)
  v-layout(row, wrap)
    v-flex(xs12, md6)
      h1 Frontend projects manager

      v-btn(
        depressed,
        @click='start',
        :loading='isStarting'
      ) Start test server

      v-btn(
        depressed,
        @click='stop',
        :loading='isStarting'
      ) Stop

      v-btn(
        depressed,
        @click='list'
      ) Get list

      v-btn(
        depressed,
        @click='flush'
      ) Flush logs

</template>

<script>

import axios from '~/plugins/axios'

export default {
  data () {
    return {
      isStarting: false
    }
  },

  methods: {
    async start () {
      this.isStarting = true

      const process = await axios.post('/api/projects/start', {
        uid: 'test'
      })

      console.log(process)

      this.isStarting = false
    },

    async stop () {
      this.isStarting = true

      const process = await axios.post('/api/projects/stop', {
        uid: 'test'
      })

      console.log(process)

      this.isStarting = false
    },

    async list () {
      const process = await axios.get('/api/projects/list')

      console.log(process)
    },

    async flush () {
      const logs = await axios.post('/api/projects/flush', {
        uid: 'test'
      })

      console.log(logs)
    }
  }
}

</script>
