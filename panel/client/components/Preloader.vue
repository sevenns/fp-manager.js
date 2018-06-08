<template lang='pug'>

.preloader__wrapper
  transition(name='preloader')
    .preloader(v-if='loading')
      .preloader__circle

</template>

<script>

export default {
  data () {
    return {
      loading: false
    }
  },

  methods: {
    start () { this.loading = true },
    finish () {
      setTimeout(() => { this.loading = false }, 500)
    }
  }
}

</script>
