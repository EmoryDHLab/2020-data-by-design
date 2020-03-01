<template lang="html">
    <div class="context-menu">
      <ul>
        <li> Remove</li>
        <li> Color</li>
      </ul>
      <!-- <div class="pointer"></div> -->
    </div>
</template>

<script>
export default {
  mounted: function() {
    // this.$el.onmouseleave = this.onMouseLeave;
    const listener = event => {
      if (event.target.closest(".user-highlight") === null && event.target.closest(".context-menu") === null) {
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
    }
  }
}
</script>

<style scoped>
    div{
        user-select: none;
        box-shadow: 0 12px 22px -3px rgba(0, 0, 0, 0.39);
        position: absolute;
        left: 50%;
        background-color: #424242;
        border-radius: 8px;
        transition: opacity 0.2s ease, transform 0.2s ease;
        transform: translateX(-50%);
    }
    div ul {
      list-style: none;
      padding: 10px;
    }
    div ul li {
      color: white;
    }
    div .pointer {
      top: -16px;
      border-color: transparent transparent #424242;
      border-width: 0 16px 16px;
      position: absolute;
      left: 50%;
      display: block;
      width: 0;
      height: 0;
      margin-left: -16px;
      border-style: solid;
      transition: border-color 0.2s ease;
    }
</style>
