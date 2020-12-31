<template lang="html">
  <DocRenderer :docObj="docObj">

  </DocRenderer>
<!--  <DocRenderer docId="1_-FrAZVLYF74Kc1U-fpK6ugrIkqYisZEbI0Z2yVUb0I" :section-component="sectionComponent" :section-title-prop="'title'">-->
<!--    <template v-slot:TestSlot>-->
<!--      <b>Test slot!</b>-->
<!--    </template>-->
<!--    <template v-slot:AnotherSlot>-->
<!--      <p>Another slot goes here</p>-->
<!--    </template>-->
<!--    <template v-slot:InlineSlot="{inner}">-->
<!--      <TestInlineComponent :word="'a word'"></TestInlineComponent><b>{{inner}}</b>-->
<!--    </template>-->
<!--  </DocRenderer>-->
</template>

<script>

import Section from '@/components/chapters/Section';
import Picline from '@/components/vis/Picline'
import PicCollage from '@/components/vis/PicCollage'
import EventSquare from '@/components/vis/peabody/newpeabodygrid/EventSquare'
import PeabodyGrid from '@/components/vis/peabody/newpeabodygrid/PeabodyGrid'
import PeabodyMutable from "../components/vis/peabody/PeabodyMutable";
import { DocRenderer } from "doc-renderer";
import api from "../api";

export default {
  components: {
    DocRenderer,
    PeabodyGrid,
    PeabodyMutable,
    Picline,
    PicCollage,
    EventSquare,
  },
  data: () => ({
    sectionComponent: Section,
    newImgYear: 1858,
    newImgPic: "bad/badder",
    focusedImg: "0",
    docId: "1V6BiTxJw0vGc-AApW4PHAckbzqRKi8sJ6VT0bu7BBXU",
    docObj: null,
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
  created() {
    if (this.docId) {
      api.getDoc(this.docId).then(resp => {
        this.docObj = resp.data;
      }).catch(err => {
        console.error(err)
      })
    }
  },
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
