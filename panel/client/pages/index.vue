<template lang='pug'>

v-flex(xs4)
  v-card
    v-card-title
      .headline Sign in
      v-spacer
      v-btn(
        fab,
        outline,
        color='light-green',
        @click='signin',
        :loading='isLoading',
        :flat='!valid || !username || !password',
        :disabled='!valid || !username || !password'
      )
        v-icon mdi-login

    v-card-text
      v-form(
        v-model='valid',
        ref='form',
        lazy-validation,
        @keyup.native.enter='signin'
      )
        v-text-field(
          label='Username',
          v-model='username',
          color='light-green',
          required, :rules='rules.username'
        )

        v-text-field(
          label='Password', hint='At least 6 characters',
          v-model='password', min='6', maxlength='20',
          :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
          :append-icon-cb='() => (passwordHidden = !passwordHidden)',
          :type="passwordHidden ? 'password' : 'text'",
          counter='20', required,
          :rules='rules.password',
          color='light-green'
        )

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  layout: 'centered',

  data () {
    return {
      username: '',
      password: '',

      isLoading: false,
      valid: true,
      passwordHidden: true,
      rules: {
        username: [
          v => !!v || 'Username is required',
          v => /\w{4,16}/.test(v) || 'Username must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ]
      }
    }
  },

  computed: mapGetters({ user: 'user/GET' }),

  methods: {
    async signin () {
      if (this.$refs.form.validate()) {
        let result = null

        this.isLoading = true

        try {
          result = await this.$store.dispatch('user/signin', {
            username: this.username,
            password: this.password
          })
        } catch (error) {
          console.error(error)
        } finally {
          this.isLoading = false
        }

        if (result) {
          this.$router.push('/dashboard')
        }
      }
    }
  }
}

</script>
