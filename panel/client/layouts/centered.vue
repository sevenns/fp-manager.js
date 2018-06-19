<template lang='pug'>

v-app
  v-toolbar(absolute, flat)
    v-btn(icon, to='/', nuxt, color='light-green', dark)
      v-icon mdi-chart-donut-variant
    v-toolbar-title Frontend projects manager
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        nuxt

</template>

<script>

import '~/assets/icons/dist'

export default {}

</script>
