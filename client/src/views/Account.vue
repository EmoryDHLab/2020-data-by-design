<template lang="html">
  <main>
    <h1>{{ firstName }} {{ lastName }}'s Account</h1>
    <button @click="logout()">Log out</button>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH_LOGOUT } from '@/store/auth/types'
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
    }
  }
}
</script>

<style scoped>
</style>
