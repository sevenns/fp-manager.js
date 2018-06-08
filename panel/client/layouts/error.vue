<template lang='pug'>

.error
  .error__item(v-if='error.statusCode === 404')
    .error__status 404
    .error__text Page not found
  .error__status(v-else) An error occurred

</template>

<script>

export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}

</script>
