<template lang="html">
  <main>
    <h1 class="page-title">Sign In</h1>
    <base-card class="sign-in-bg">
      <form @submit.prevent="signin">
        <text-input id="email-input" class="form__input"
          v-model="user.email"
          placeholder="Email">Email: </text-input>
        <password-input id="password-input" class="form__input"
          v-model="user.password"
          placeholder="Password">Password: </password-input>
        <p v-if="errors.length">
          <ul>
            <li v-for="(error, n) in errors" :key="n"> {{ error }}</li>
          </ul>
        </p>
        <submit-button class="join-button">Log in</submit-button>
      </form>
      <div>
        {{ $store.state.auth.error }}
      </div>
    </base-card>
  </main>
</template>

<script>
import TextInput from '@/components/forms/TextInput'
import PasswordInput from '@/components/forms/PasswordInput'
import SubmitButton from '@/components/forms/SubmitButton'
import BaseCard from '@/components/general/BaseCard'
import { AUTH_REQUEST } from '@/store/auth/types'
export default {
  name: "SignIn",
  components: {
    TextInput,
    PasswordInput,
    SubmitButton,
    BaseCard
  },
  data: () => ({
    errors: [],
    user: {
      email: '',
      password: '',
    }
  }),
  computed: {
    isValid () {
      return this.errors.length === 0
    }
  },
  methods: {
    signin (p) {
      if (!this.validate()) return;
      const vm = this
      this.$store.dispatch(AUTH_REQUEST, this.user)
        .then(_ => {
          this.$router.push('/')
        })
    },
    validate () {
      const { email, password } = this.user
      this.errors = []
      if (!email) this.errors.push("Email cannot be blank")
      if (!this.validateEmail(email)) this.errors.push("Email is invalid")
      if (!password) this.errors.push("Password cannot be blank")
      return this.errors.length === 0
    },
    validateEmail (email) {
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email)
    }
  }
}
</script>

<style scoped>
.page-title {
  text-align: center;
  position: relative;
}

.sign-in-bg {
  max-width: 500px;
  min-width: 300px;
  width: 30vw;
  margin: auto;
  padding: 32px;
}

.join-button {
  margin: auto;
  margin-top: 32px;
  display: block;
}

</style>
