<template lang='pug'>

v-app
  v-toolbar(app, absolute, flat)
    v-btn(icon, to='/', nuxt, color='light-green', dark)
      icon(name='fpm', height='24')
    v-toolbar-title Frontend projects manager
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(flat) Link One
      v-btn(flat) Link Two
      v-btn(flat) Link Three
  v-content
    .inner-content
      nuxt

</template>

<script>

import '~/assets/icons/dist'

export default {}

</script>

