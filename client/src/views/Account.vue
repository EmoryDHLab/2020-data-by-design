<template lang="html">
  <main>
    <h1>{{ firstName }} {{ lastName }}'s Account</h1>
    <button @click="logout()">Log out</button>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH_LOGOUT } from '@/store/auth-old/types'
export default {
  computed: {
    ...mapGetters(['firstName', 'lastName'])
  },
  methods: {
    logout () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(_ => {
          this.$router.push('/signin')
        })
    },
  },
  created () {
    if (this.$store.state.user.loaded===false) {
      this.$store.dispatch('USER_REQUEST', 'me')
        .catch(err => {
          if (err.response.status === 401) {
            this.$notify({
              type: 'error',
              group: 'auth',
              title: 'You must login first',
            })
            this.$router.push('/signin')
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
