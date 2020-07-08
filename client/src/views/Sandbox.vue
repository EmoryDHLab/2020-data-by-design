<template lang="html">
  <div class="two-col-flex">
    <div class="">
      <h2>Data manipulator</h2>
      <div class="">
        <div class="flex-input">
          <label>Year</label>
          <input type="text" name="" v-model="newImgYear">
        </div>
        <div class="flex-input">
          <label>Image Link</label>
          <input type="text" name="" v-model="newImgPic">
        </div>
        <div class="flex-input">
          <button type="button" @click="addDatapoint">Add Data</button>
        </div>
      </div>
      <ol style="max-height: 300px; overflow-y: auto;">
        <li v-for="point in points">
          Year: {{ point.year }} | Image: "{{ point.img }}"
        </li>
      </ol>
    </div>
    <div class="">
      <h2>Timeline</h2>
      <Picline id="pic-line"
        :dataset="images"
        @focus-image="changeFocus"/>
    </div>
    <div class="">
      <PicCollage id="pic-collage"
        :dataset="images"
        :focusedImg="focusedImg"/>
    </div>
  </div>
</template>

<script>
import Picline from '@/components/vis/Picline'
import PicCollage from '@/components/vis/PicCollage'

export default {
  components: {
    Picline,
    PicCollage
  },
  data: () => ({
    newImgYear: 1858,
    newImgPic: "bad/badder",
    focusedImg: "0",
    images: {
      0: {
        id: 0,
        href: '/img/cat1.jpeg',
        year: 1800,
        width: 259,
        height: 194,
        x: 0,
        y: 0,
      },
      1: {
        id: 1,
        href: '/img/cat2.jpeg',
        year: 1820,
        width: 275,
        height: 183,
        x: 259,
        y: 0,
      },
      2: {
        id: 2,
        href: '/img/cat3.jpeg',
        year: 1850,
        width: 275,
        height: 183,
        x: 0,
        y: 194,
      },
    }
  }),
  methods: {
    addDatapoint () {
      if (this.newImgPic != "" && this.newImgYear > 0)
        this.points.push({year: this.newImgYear, img: this.newImgPic})
    },
    changeFocus (newFocus) {
      this.focusedImg = newFocus;
    }
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
.flex-input {
  display: flex;
  max-width: 250px;
}
.flex-input label {
  flex: 1;
}

.two-col-flex {
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
}
</style>
