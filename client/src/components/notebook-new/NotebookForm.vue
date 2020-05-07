<template>
    <div class="notebook-login-form">
      <div class="input-flex">
        <input v-model="email" placeholder="Email">
        <span v-if="email && signingUp" class="validation-message" v-text="emailValidation"></span>
      </div>
      <div v-if="signingUp" class="input-flex">
        <input v-model="name" placeholder="Display name">
        <span v-if="name" class="validation-message" v-text="nameValidation"></span>
      </div>
       <div class="input-flex">
        <input type="password" v-model="password" placeholder="Password">
        <span v-if="password && signingUp" class="validation-message" v-text="passwordValidation"></span>
      </div>
       <div v-if="signingUp" class="input-flex">
        <input type="password" v-model="repeatedPasssword" placeholder="Repeat your password">
        <span v-if="repeatValidation" class="validation-message" v-text="repeatValidation"></span>
      </div>
      <div class="error-message" v-if="$store.getters.authError" v-text="$store.getters.authError"></div>
      <button type="button" @click="submit" :disabled="!allValid">Submit</button>
    </div>
</template>

<script>
import ACTIONS from "./form-actions.js"

//If this eventually gets long, feel free to stick it in a .js file and import it
const Validators = {
  mustBeValidEmail: {
    /*
      The idea here is just to make sure it kind of looks like an email.
      True email validation is impossible and shouldn't be done through Regex.
    */
    validator: email => /\S+@\S+\.\S+/g.test(email),
    message: "Must be a valid email"
  },
  mustBeAtLeastSixCharacters: {
    validator: string => string.length >= 6,
    message: "Must be at least six characters"
  },
  mustHaveTwoCases: {
    validator: string => /[A-Z][a-z]|[a-z][A-Z]/g.test(string),
    message: "Must have an uppercase letter and a lowercase letter"
  },
  mustMatchPassword (password) {
    return {
      validator: repeated => repeated === password,
      message: "Must be identical"
    }
  }
}

export default {
  props: {
    action: String
  },
  data () {
    return {
      email: '',
      password: '',
      repeatedPasssword: '',
      name: '',
    }
  },
  computed: {
    Validation () {
      return {
        email: [Validators.mustBeValidEmail],
        name: [Validators.mustBeAtLeastSixCharacters],
        password: [Validators.mustBeAtLeastSixCharacters, Validators.mustHaveTwoCases],
        repeated: [Validators.mustMatchPassword(this.password)]
      }
    },
    emailValidation() {
      return this.validate('email', this.email)
    },
    passwordValidation() {
      return this.validate('password', this.password)
    },
    nameValidation() {
      return this.validate('name', this.name)
    },
    repeatValidation() {
      return this.validate('repeated', this.repeatedPasssword)
    },
    allValid() {
      if (this.signingUp) {
        return !(this.emailValidation + this.nameValidation + this.passwordValidation + this.repeatValidation)
      }
      if (this.loggingIn) {
        return !this.emailValidation && this.password;
      }
    },
    loggingIn () {
      return this.action === ACTIONS.LOG_IN
    },
    signingUp () {
      return this.action === ACTIONS.SIGN_UP
    }
  },
  methods: {
    validate (name, value) {
      return this.Validation[name]
        .map(validatorObj =>
          validatorObj.validator(value) ? '' : validatorObj.message)
        .filter(string => string)
        .join('. ');
    },
    submit() {
      const user = {
        email: this.email,
        password: this.password,
      }
      if (this.loggingIn) {
        this.$emit('login', user)
      } else if (this.signingUp && this.allValid) {
        user.name = this.name;
        this.$emit('signup', user)
      }
    }
  }
}
</script>

<style>

  .notebook-login-form .input-flex {
    display: block;
    /* margin-left: 40px; */
    margin-bottom: 3px;
    display: flex;
    /* align-items: baseline; */
  }

  .input-flex input {
    max-height: 12pt;
    margin-right: 10px;
  }

  .notebook-login-form button {
    display: block;
    /* margin-left: 40px; */
  }

  .validation-message {
    font-size: 9pt;
    margin: auto 0px;
    min-width: 120px;
  }

  .notebook-login-form .error-message {
    font-size: 10pt;
  }

  .notebook-login-form button:disabled, .notebook-login-form button:hover {
   background-color: white;
   border: 2px solid gray;
   color: gray;
  }
</style>
