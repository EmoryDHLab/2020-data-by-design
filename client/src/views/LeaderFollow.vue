<template lang="html">
  <div class="columns">
    <div class="first-column">
      <div class="1">
        <p>
          <b>These two paragraphs form a block that is associated with one image. The image will transition in with the paragraph, stick to the center, and transition out with it. </b>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at blanditiis eius ex iste iusto magni molestiae necessitatibus, omnis pariatur sunt tempora ut voluptatem! Ab commodi dolore excepturi itaque tenetur?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut blanditiis debitis dolores ducimus iusto, libero numquam, perferendis, provident quas quidem recusandae sequi. Distinctio eligendi error et, facilis id nostrum?
        </p>
      </div>
      <div>
        <p>
          <b>This block isn't associated with any image, but that's okay. It will automatically join the previous block.</b>
        </p>
      </div>
      <div class="2">
        <p>
          This block of text is associated with three images. It's smaller than those three images, so they'll be the scroll "leader" and this text block will stick.
        </p>
      </div>
    </div>
    <div class="second-column">
      <div class="1">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
      </div>
      <div class="2">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
  }),
  methods: {
  },
  created () {
  },
  mounted () {
    console.log("see me")
  }
}
</script>

<style scoped>

.columns {
  width: 900px;
  margin-left: 200px;
  display: flex;
  gap: 100px;
  border: 1px solid gray;
  padding: 1100px 50px 50px 50px;
}

.first-column, .second-column {
  width: 50%;
}

img {
  margin: 10px 0px;
}
</style>
