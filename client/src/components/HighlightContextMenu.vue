<template lang="html">
    <div class="context-menu-parent">
      <div class="context-menu-items">
        <ul>
          <li @click="removeButtonClicked">Remove</li>
          <li>Color</li>
        </ul>
      </div>
      <div class="pointer"></div>
    </div>
</template>

<script>
export default {
  mounted: function() {
    // this.$el.onmouseleave = this.onMouseLeave;
    const listener = event => {
      if (event.target.closest(".nb-user-highlight") === null && event.target.closest(".context-menu-parent") === null) {
        // removeListener();
        this.hide();
      }
    }

    document.addEventListener('click', listener);

  },
  methods: {
    hide (e) {
      this.$el.style.display = 'none';
      // this.$destroy();
      // this.$el.parentNode.removeChild(this.$el);
    },
    removeButtonClicked (event) {
      this.$emit('removeClicked');
      this.hide();
    }
  }
}
</script>

<style scoped>
    .context-menu-parent {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }
    .context-menu-items {
        user-select: none;
        box-shadow: 0 12px 22px -3px rgba(0, 0, 0, 0.39);
        background-color: #424242;
        border-radius: 8px;
    }
    .context-menu-items ul {
      list-style: none;
      padding: 0px;
    }
    .context-menu-items ul li {
      color: white;
      border-bottom: 1px solid gray;
      padding: 10px;
    }

    .context-menu-items ul li:first-of-type {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .context-menu-items ul li:last-of-type {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .context-menu-items ul li:hover {
      color: white;
      border-bottom: 1px solid gray;
      background-color: #4a90e2;
    }

    .pointer {
      top: 4px;
      border-color: transparent transparent #424242;
      border-width: 0 12px 12px;
      position: absolute;
      left: 50%;
      display: block;
      width: 0;
      height: 0;
      margin-left: -12px;
      border-style: solid;
    }
</style>
