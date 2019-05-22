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
          Year: {{point.year}} | Image: "{{point.img}}"
        </li>
      </ol>
    </div>
    <div class="">
      <h2>Timeline</h2>
      <Picline :points="points"/>
    </div>
  </div>
</template>

<script>
import Picline from '@/components/vis/Picline'
export default {
  components: {
    Picline
  },
  data: () => ({
    newImgYear: 1858,
    newImgPic: "bad/badder",
    points: [{
        img: "blah/blah",
        year: 1786
      },
      {
        img: "blah/blah",
        year: 1786
      },
      {
        img: "blah/blah",
        year: 1786
      },
      {
        img: "blah/blah",
        year: 1788
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1801
      },
      {
        img: "blah/blah",
        year: 1821
      },
      {
        img: "blah/blah",
        year: 1821
      },
      {
        img: "bleh/bleh",
        year: 1858
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/bleh",
        year: 1829
      },
      {
        img: "bleh/blrh",
        year: 1846
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bleh/blrh",
        year: 1856
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
      {
        img: "bloo/bloo",
        year: 1900
      },
    ]
  }),
  methods: {
    addDatapoint () {
      if (this.newImgPic != "" && this.newImgYear > 0)
        this.points.push({year: this.newImgYear, img: this.newImgPic})
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
