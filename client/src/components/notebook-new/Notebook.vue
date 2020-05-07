<template>
  <div class="notebook-container">
    <div class="notebook-header">
      <div class="notebook-header-flex">
        <div>
          <h2>Notebook</h2>
          <h4>Current Chapter Title</h4>
        </div>
        <div class="notebook-welcome-message" v-if="this.$store.getters.isLoggedIn">
          <div class="logout-button"><a href="#" @click="logout">Logout</a></div>
          <div>Welcome, {{this.$store.getters.username}}!</div>
        </div>
      </div>
      <p class="notebook-login-message" v-if="!this.$store.getters.isLoggedIn">
        <a href="#" @click="action = ACTIONS.LOG_IN">Log in</a> to your notebook account, or
        <a href="#" @click="action = ACTIONS.SIGN_UP">sign up</a> to save notes!
        <a href="#" class="right-arrow" :class="{ rotate: formToggle }" @click="toggleForm"></a>
      </p>
      <transition name="slide">
        <NotebookForm v-if="formToggle && !$store.getters.isLoggedIn" :action="action" @login="sendLogin" @signup="sendSignup"></NotebookForm>
      </transition>
    </div>
    <div class="notebook-body">
      <NodeList></NodeList>
    </div>
  </div>
</template>

<script>
import NodeList from "./NotebookNodeList"
import NotebookForm from "./NotebookForm"
import ACTIONS from "./form-actions"

export default {
  components: {
    NodeList,
    NotebookForm
  },
  data () {
    return {
      action: '',
      formToggle: false,
    }
  },
  computed: {
    ACTIONS () {
      return ACTIONS;
    }
  },
  mounted () {
    console.log(this.$store);
  },
  methods: {
    toggleForm() {
      if (!this.action) {
        this.action = ACTIONS.SIGN_UP;
      } else {
        this.formToggle = !this.formToggle;
      }
    },
    sendLogin(user) {
      this.$store.dispatch('login', user);
    },
    sendSignup(user) {
      this.$store.dispatch('register', user);
    },
    logout() {
      console.log("tryna log out")
      this.$store.dispatch('logout');
    }
  },
  watch: {
    action () {
      this.formToggle = true;
    }
  }
}

</script>

<style>

.notebook-header {
  margin-right: 60px;
}
.notebook-header-flex {
  display: flex;
  justify-content: space-between;
}
.notebook-header h4, h2 {
  margin: 0px;
}
.notebook-header {
  padding-top: 20px;
}

.notebook-welcome-message {
  font-size: 10pt;
}

.notebook-welcome-message .logout-button {
  display: inline-block;
  text-align: right;
}

.notebook-login-message {
  font-size: 10pt;
  font-weight: 400;
}
.notebook-login-message a, .notebook-welcome-message a {
  text-decoration: none;
  font-weight: 400;
  color: #4a90e2;
}
.notebook-login-message a:hover {
  filter: brightness(130%);
}
.notebook-container {
  user-select: none;
}
.notebook-body {
  margin-right: 60px;
}

.right-arrow {
  display: inline-block;
  margin-bottom: -2px;
  margin-left: 2px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;

  border-left: 10px solid #4a90e2;

  transform: rotate(0deg);
  transition: transform 0.2s ease;
}

.rotate {
  transform: rotate(90deg);
  transition: transform 0.2s ease;
}

.slide-leave-active {
  transition: margin-top 0.25s ease-in, opacity 0.1s
}

.slide-enter-active {
  transition: margin-top 0.4s, opacity 0.2s ease-out 0.2s
}

.slide-enter, .slide-leave-to {
  margin-top: -90px;
  opacity: 0;
}

</style>
