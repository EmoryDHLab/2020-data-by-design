<template lang="html">
  <main>
    <h1 class="title --text-center">Chapters</h1>
    <div class="slides">
      <ChapterCard
        chapterRouteName="PeabodyChapter"
        imageLink="https://cdn.britannica.com/s:300x300/37/21537-004-83DFAD79.jpg"
        class="main-slide">
        <template slot="tagline">An Investigation on Time</template>
        <template slot="title">Shape of History</template>
        Elizabeth Peabody's interactive approach to visualizing history
      </ChapterCard>
      <div class="minis">
        <ChapterMini class="mini" v-for="i in 3" :key="i"
          imageLink="https://cdn.britannica.com/s:300x300/37/21537-004-83DFAD79.jpg"
          chapterRouteName="PeabodyChapter"
          darken="0.3">
          <template slot="title">Shape of History</template>
          Elizabeth Peabody's interactive approach to visualizing history
        </ChapterMini>
      </div>
    </div>
  </main>
</template>

<script>
import ChapterCard from '@/components/ChapterCard'
import ChapterMini from '@/components/ChapterMini'
export default {
  components: {
    ChapterCard,
    ChapterMini
  }
}
</script>

<style scoped>
.slides {
  display: flex;
  height: 600px;
  padding: 0 15em;
}
.main-slide {
  flex: 4;
}
.minis {
  padding: 0 36px;
  flex: 2;
  overflow-y: auto;
  overflow-x: hidden;
}
.mini {
  width: 300px;
  margin-bottom: 20px;
}

</style>
