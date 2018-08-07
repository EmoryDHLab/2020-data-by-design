<template lang="html">
  <main>
    <h1 class="page-title">Sign Up</h1>
    <base-card class="signup-bg">
      <form @submit.prevent="signup">
        <text-input id="first-name-input" class="form__input"
          v-model="user.firstName"
          placeholder="First Name">First Name: </text-input>
        <text-input id="last-name-input" class="form__input"
          v-model="user.lastName"
          placeholder="Last Name">Last Name: </text-input>
        <text-input id="email-input" class="form__input"
          v-model="user.email"
          placeholder="Email">Email: </text-input>
        <password-input id="password-input" class="form__input"
          v-model="user.password"
          placeholder="Password">Password: </password-input>
        <password-input id="password-confirmation-input" class="form__input"
          v-model="user.passwordConfirmation"
          placeholder="Confirm Password">Confirm Password: </password-input>
        <p v-if="errors.length">
          <ul>
            <li v-for="(error, n) in errors" :key="n"> {{ error }}</li>
          </ul>
        </p>
        <submit-button class="join-button">Sign Up</submit-button>
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
export default {
  name: "SignUp",
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
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
    }
  }),
  computed: {
    isValid () {
      return this.errors.length === 0
    }
  },
  methods: {
    signup (p) {
      const { email, password, firstName, lastName } = this.user
      if (!this.validate()) return;
      this.$store.dispatch('AUTH_CREATE', this.user);
    },
    validate () {
      const { email, password, passwordConfirmation, firstName, lastName } = this.user
      this.errors = []
      if (!firstName) this.errors.push("First name cannot be blank")
      if (!lastName) this.errors.push("Last name cannot be blank")
      if (!email) this.errors.push("Email cannot be blank")
      if (!this.validateEmail(email)) this.errors.push("Email is invalid")
      if (!password) this.errors.push("Password cannot be blank")
      if (password.length < 8 || password.length > 20)
        this.errors.push("Password must be between 8 and 20 characters")
      if (password !== passwordConfirmation)
        this.errors.push("Passwords do not match")
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

.signup-bg {
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
