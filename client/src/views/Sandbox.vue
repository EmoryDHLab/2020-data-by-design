<template lang="html">
  <div class="half-w">
    <NoteBook/>
  </div>
</template>

<script>
import NoteBook from '@/components/notebook/NoteBook'
export default {
  components: {
    NoteBook
  }
}
</script>

<style scoped>
.wp {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */
  margin: 0;
}
.wp p {
  margin: 0;
}
.wp-image-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  align-items: center;
  display: flex;
}
.wp-image {
  display: block;
  flex: 0 1 90%;
}
.waypoint-section {
  box-sizing: border-box;
  border-bottom: 2px solid grey;
}
.half-w {
  width: 25%;
}
</style>
