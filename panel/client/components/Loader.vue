<template lang='pug'>

.loader-wrapper
  transition(name='loader')
    .loader(v-if='active')
      icon.loader__icon(name='fpm', height='24', color='#8bc34a')


</template>

<script>

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}

</script>

<style lang='sass' scoped>

.loader
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(255, 255, 255, .5)

.loader__icon
  animation: loader-rotate 1.5s linear infinite

  @keyframes loader-rotate
   to
     transform: rotate(360deg)


</style>
