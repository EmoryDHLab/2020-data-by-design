<template lang="html">
  <main>
    <h1 class="page-title">Sign Up</h1>
    <form @submit.prevent="signup">
      <p v-if="errors.length">
        <ul>
          <li v-for="(error, n) in errors" :key="n"> {{ error }}</li>
        </ul>
      </p>
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
      <submit-button>Join Now</submit-button>
    </form>
  </main>
</template>

<script>
import TextInput from './forms/TextInput'
import PasswordInput from './forms/PasswordInput'
import SubmitButton from './forms/SubmitButton'
export default {
  name: "TheSignUpPage",
  components: {
    TextInput,
    PasswordInput,
    SubmitButton
  },
  data: () => ({
    errors: [],
    user: {
      email: '',
      password: '',
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
      alert(`${lastName}, ${firstName}\n ${email}`);
    },
    validate () {
      const { email, password, firstName, lastName } = this.user
      this.errors = []
      if (!email) this.errors.push("Email cannot be blank")
      if (!this.validateEmail(email)) this.errors.push("Email is invalid")
      if (!firstName) this.errors.push("First name cannot be blank")
      if (!lastName) this.errors.push("Last name cannot be blank")
      if (!password) this.errors.push("Password cannot be blank")
      if (password.length < 8 || password.length > 20)
        this.errors.push("Password must be between 8 and 20 characters")
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
.form__input {

}
</style>
