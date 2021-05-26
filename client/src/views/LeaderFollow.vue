<template lang="html">
  <div class="columns">
    <div ref="first" class="first-column">
      <div class="first-1">
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
      <div class="first-2">
        <p>
          This block of text is associated with three images. It's smaller than those three images, so they'll be the scroll "leader" and this text block will stick.
        </p>
      </div>
    </div>
    <div ref="second" class="second-column">
      <div class="second-1">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
      </div>
      <div class="second-2">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
        <img src="https://static01.nyt.com/images/2020/10/20/science/30TB-PENGUINS04/30TB-PENGUINS04-superJumbo.jpg" width="300">
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import Vue, {nextTick} from "vue"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

    const groups = {};

    let last = undefined;
    for (const block of this.$refs.first.children) {
      const cls = Array.from(block.classList).find(cls => cls.includes("first-"));
      if (!cls) {
        if (last) {
          groups[last].first.push(block);
        }
        continue;
      }
      const number = Number(cls.split("-")[1]);
      last = number;
      if (!groups[number]) {
        groups[number] = {number, first: [block]};
        continue;
      }
      groups[number].first.push(block);
      // console.log(block, cls, number);
    }

    Object.keys(groups).forEach(keyNum => {
      const group = groups[keyNum];
      const blocks = this.$refs.second.querySelectorAll(`.second-${keyNum}`);
      group.second = Array.from(blocks);
    })

    let laidOutTill = 0;

    Object.keys(groups).forEach(keyNum => {
      const group = groups[keyNum];
      const blocksToDiv = blocks => {
        if (blocks.length == 1 && blocks[0].tagName == "DIV") {
          return blocks[0];
        }
        // const div = document.createElement("div");
        // blocks[0].parentNode.insertBefore(div, blocks[0]);
        // div.append(...blocks);
        blocks[0].append(...blocks.splice(1));
        return blocks[0];
      }
      const firstDiv = blocksToDiv(group.first);
      const secondDiv = blocksToDiv(group.second);
      // const reduceHeight = (acc, curr) => acc + curr.scrollHeight;
      // const firstHeight = group.first.reduce(reduceHeight, 0);
      // const secondHeight = group.second.reduce(reduceHeight, 0);

      console.log(firstDiv.scrollHeight, secondDiv.scrollHeight);
      const byHeight = [firstDiv, secondDiv].sort((a, b) => b.scrollHeight - a.scrollHeight);
      const leader = byHeight[0];
      const follower = byHeight[1];
      if (!laidOutTill) {
        laidOutTill = leader.offsetTop;
      }
      leader.style.top = laidOutTill + "px";
      // follower.style.top = laidOutTill + leader.scrollHeight / 2 + - follower.scrollHeight / 2 + "px";
      follower.style.top = laidOutTill + "px";
      laidOutTill += leader.scrollHeight;

      // gsap.from(follower, {
      //   top: leader.style.top,
      //   scrollTrigger: {
      //      trigger: leader,
      //      scrub: true,
      //      markers: true,
      //      end: `${leader.scrollHeight / 2}px bottom`
      //   }
      // });
      Vue.nextTick( () => {

        ScrollTrigger.create({
          trigger: follower,
          start: "bottom bottom",
          pin: true,
          // endTrigger: leader,
          end: `${leader.scrollHeight / 2 + follower.scrollHeight / 2}px bottom`,
          markers: true
        })

        // ScrollTrigger.create({
        //   trigger: leader,
        //   start: "top 50px",
        //   pin: true,
        //   endTrigger: follower,
        //   end: "top 50px",
        //   // end: `${leader.scrollHeight / 2 + follower.scrollHeight / 2}px bottom`,
        //   // markers: true
        // })
      })
    })

  }
}
</script>

<style scoped>


.columns {
  width: 900px;
  height: 3000px;
  margin-left: 200px;
  display: flex;
  gap: 100px;
  /*border: 1px solid gray;*/
  padding: 1100px 50px 50px 50px;
}

.first-column, .second-column  {
  width: 50%;
}
.first-column div, .second-column div {
  position: absolute;
  width: 45%;
}

img {
  margin: 10px 0px;
}

.second-1 img {
 border: 1px solid red;
}

.second-2 img {
  border: 1px solid blue;
}
</style>
