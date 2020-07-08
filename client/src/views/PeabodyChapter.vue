<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Peabody'">
    <template slot='title'>
      Making History: Elizabeth Palmer Peabody’s Chronological Charts
    </template>
    <Section>
      <p>
        Elizabeth Palmer Peabody was born in Massachusetts in 1804. Today, she is most famous for her proximity to more well-known writers of the American Renaissance, such as Ralph Waldo Emerson and Nathaniel Hawthorne. (Hawthorne was actually married to her sister, Sophia). But Peabody had impact in her own right: the bookstore that she ran out of her home, in Boston, functioned as the de facto salon for the transcendentalist movement. She edited and published the first version of Henry David Thoreau’s essay on civil disobedience. And she was an educational innovator: she is credited with starting the first kindergarten in the United States.
      </p>
      <p>
        But in the 1850s, Peabody set off to ride the rails. She traveled as far north as
        <a class="blue-hover" href="#" @mouseover="mapPos=1" @mouseout="mapPos=0">Rochester, NY</a>;
        as far west as
        <a class="blue-hover" href="#" @mouseover="mapPos=2" @mouseout="mapPos=0">Louisville, KY</a>;
        and as far south as
        <a class="blue-hover" href="#" @mouseover="mapPos=3" @mouseout="mapPos=0">Richmond, VA</a>,
        in order to promote the US history textbook she had recently published, A Chronological History of the United States.
      </p>
      <MapScroller asset="railroadscaled.jpg" width="60vh"
                   :current-position="mapPos"
                   :positions="[
                     {left: 0, top: 0, width: 100, height: 100},
                     {left: -170, top: -50, width: 300, height: 300},
                     {left: -90, top: -120, width: 300, height: 300},
                     {left: -140, top: -110, width: 280, height: 280},
                  ]">
      </MapScroller>
      <p>
        Along with boxes of books, Peabody traveled with a fabric roll the size of a living room rug, which contained floor-sized versions of the chronological history charts that illustrated the book. Peabody identified the four charts—in their vibrant, full-color detail—as key components of her pedagogical approach. As she describes in her “Preface to Teacher,” the charts were designed to impress “a chronological outline of the chain of events” of US history “on the mind, by means of that natural memorizer, the sense of sight.” Like Willard, Playfair, and other early proponents of data visualization, Peabody understood the eyes as the most COMPLETE. But Peabody’s charts were not intended to serve as mere conduits of information--part of a one-way transfer of knowledge from teacher to student. Rather, Peabody hoped to encourage a process of exchange between the producer and the perceiver of the charts. The charts’ design “does not pretend to be what an outline can never be, namely: a perfect framework for history,” she wrote in COMPLETE. Rather, through the process of interpreting the chronological data represented on the charts, each student would be prompted to develop their own narrative of the past.
      </p>
      <img src="./img/peabodytitlepage.jpg" width="60%"/>
    </Section>
    <Section title="Multiplying Meaning through the Chronological Charts">
      <p>
        Peabody’s method of visualizing events of historical significance was inspired by a system developed in Poland in the 1820s, and popularized in subsequent decades by the military general (and erstwhile math teacher) Jósef Bem. The Polish System, as it was then called, employed a grid overlaid with shapes and colors to visually represent events in time. Peabody first encountered Bem’s system in 1845 almost by chance, through a traveling lecturer who briefly boarded with her family. The boarder, a man named Joseph Podbielski, had come from Poland with copies of Bem’s charts. Peabody became “captivated” by the charts, according to one of her biographers, Bruce Rhonda, as well as her nephew Julian Hawthorne, who served as her first student. By his own account, Hawthorne was a challenging student: “I was always most inapt and grievous, in dates and mathematics especially,” he recalled. But Peabody remained undaunted. She spent several years devoted to her own study of the Polish System, culminating with the development of her own modified version, which she published as The Polish-American System of Chronology in 1850.
      </p>
      <p>
        Peabody’s system, like Bem’s, is based off a numbered grid, with each year in a century marked out in its own box. Each box is then subdivided, with each of the nine smaller squares corresponding to a particular type of historical event. In the top left corner is the space for wars, battles, and sieges; in the top middle is the space for conquests and unions; in the top right is the space for losses and divisions, and so on. Shapes that take up the entire box indicate an event of such magnitude or complexity that the other events in that same year hardly matter. The events are also color-coded, indicating the various countries involved in a particular event.
      </p>
      <Scrollytell collect>
        <template v-slot:fixed="{ scrolled }">
          <PeabodyTutorial
            id="peabody-tutorial"
            :showIndicator="false"
            :showDots="false"
            :slideNumber="scrolled"
            width='45vh'
            height='45vh'/>
        </template>
        <template v-slot:1>
          <p>
            Peabody’s system, like the Polish one, is based on a numbered grid, with each year in a century marked out in its own box.
          </p>
        </template>
        <template v-slot:2>
          <p>
            Each box is then subdivided, with each of the nine smaller squares corresponding to a particular type of historical event.
          </p>
        </template>
        <template v-slot:3>
          <p>
            In the top left corner is the space for wars, battles, and sieges; in the top middle is the space for conquests and unions;
            in the top right is the space for losses and divisions, and so on.
          </p>
          <EventKey class="event-key" :colors="
                [false, false, 'rgb(50, 91, 103)',
                false, 'rgb(69, 136, 103)', false,
                'rgb(141, 43, 29)', false, false]"
                :style="{
                  width: '20vh',
                  marginLeft: '-5vh',
                  marginTop: '2vh',
                  zIndex: '100'
                 }"
                showLegend showNumbers dropShadow></EventKey>
          <svg v-if='slideNumber === 5' viewBox='0 0 300 200' :style='countriesStyles'>
            <g v-for="(color, index) in eventKeyColors.filter(color => color && color !== 'none')" :key='index'>
              <rect :width='`30`' :height='`30`' :fill=color x='30' :y='index * 45'/>
              <text v-text='colorToCountry[color]' x='70' :y='20 + index * 45'/>
            </g>
          </svg>
        </template>
        <template v-slot:4>
          <p>
            Shapes that take up the entire box indicate an event of such magnitude or complexity that the other events in that same year hardly matter.
          </p>
        </template>
        <template v-slot:5>
          <p>
            The events are also color-coded, indicating the various countries involved in a particular event.
          </p>
        </template>
      </Scrollytell>
      <p>
        As Peabody envisioned it—and described in her “Preface to Teacher”—the basic exercise was to read a chapter of the textbook, which contained a narrative account of the events of a century, and then convert the list of events that concluded the chapter into graphical form.
      </p>
      <p>
        Returning to one of Peabody’s original charts, such as this chart of the seventeenth century, we can now see England represented in red, the Americas in orange, and the Dutch in teal. Those are the three colors that dominate the image. The French are also peripherally involved, in blue. By cross-referencing the chart to the table of events, we can identify, for example, the founding of Jamestown in 1607; and the settlement of Plymouth in 1620. Significantly, Peabody also registers the first enslaved Africans arriving in Virginia in that same year. While scholars and critics now recognize 1619 as the true year of that catalyzing event, it is meaningful that Peabody—on the side of abolition but by no means its most radical proponent—chose to picture that event in her chart.
      </p>
      <div style="display:flex;">
        <peabody-grid
          :id="'peabody-vis-1'"
          style='flex: 1'
          width='45vh'
          height='45vh'
          :mutableDataset="'my-peabody'"
          :staticDataset='"1"'/>
        <peabody-mutable
          id='peabody-vis-2'
          style='flex: 1'
          :width="'45vh'"
          height='45vh'
          :staticDataset='"1"'
          :mutableDataset="'my-peabody'"
        />
      </div>
      <timeline-vis
        id='vis2'
        height='200px'
        width='100%'
        :mutableDataset="'my-peabody'"/>

      <div>
        <p>
          As this detailed explanation makes clear, few twenty-first-century viewers could have intuited the information conveyed by the chart without first taking the time--much more than visualizations today most often require--in order to learn how to decode it. For most contemporary visualization researchers and designers, who champion the clarifying capacity of visualization; or for those who believe that data visualization is best deployed to “amplify” existing thought processes, Peabody’s method would be a complete and utter failure.
        </p>
        <p>
          But for Peabody, this near-total abstraction was precisely the point. Her charts were intended to appeal to the senses directly, to provide what she called “outlines to the eye.” Her hope was that, by providing the outline of history, and only the outline, each student would be required to fill in the space that remained. The result would be a unique account of history--one that originated from the mind of each student--and that reflected their own process of producing historical knowledge.
        </p>
        <p>
          Peabody’s emphasis on facilitating multiple interpretations amongst her students, rather than transmitting to them a single historical account, stands in direct contrast to someone like William Playfair, who, as discussed in Chapter One, designed his visualizations for that latter aim. It also
          strongly anticipates a central tenet of contemporary feminist thought: namely, that the most complete knowledge is gained from bringing together multiple perspectives. Feminist philosophers such as Donna Haraway make the case that all knowledge is “situated,” meaning that it is produce by specific people in specific circumstances--cultural, historical, and geographic. In fact, Haraway uses the example of data visualization in order to elaborate her claim. She identifies a phenomenon she calls the “God Trick,” in which viewers are made to believe that they are seeing everything all at once, from up above, like a “god.” But it is a “trick” because the image only appears to show everything. What we as viewers too readily interpret as a neutral, third-party, or “godlike” perspective, is just as situated as any other.
        </p>
        <p>
          The situated nature of historical knowledge is what Peabody designed her charts in order to express. [conclusion cont'd]
        </p>
      </div>
    </Section>
    <Section title="Chart-Making as Method">
      <p>
        In addition encouraging each student to interpret the printed charts for themselves, Peabody also identified the process of visualization itself as a means of making historical knowledge. To this end, she also printed workbooks with sheets of blank charts--”blank centuries,” she called them--as in the image below. In this version of her pedagogical plan, she envisioned the exercise as not merely cross-referencing the list of events with their visual representation, but of enabling students to themselves create the visualizations they would then study.
      </p>
      <img src="./img/peabodyblank.png" width="60%">
      <div>

        <p>
          Having traveled to many archives in the process of conducting research for this project, I’ve concluded that Julian Hawthorne wasn’t the only student to experience difficulty with Peabody’s system. Paging through multiple copies of her Polish-American System of Chronology, which concludes with several pages of blank charts, they tend to follow a similar pattern: a page or two with squares filled out in earnest, then a series of attempts seemingly abandoned halfway, and then a shift in purpose from study to play, with the grid becoming a structured canvas for creating geometric abstractions.
        </p>
        <p>
          The difficulty of the Polish-American system seems to be both a liability of the form and also the point: Peabody developed her method at a time of national crisis—the decade leading up to the Civil War—and she recognized that the nation’s problems would be difficult to solve. More than that, she understood that solving these problems would require sustained effort and significant thought. Her goal with the Chronological History was to create a framework, both visual and intellectual, through which this difficult thinking could take place. And her hope was that her system might prompt an array of possible solutions—one coming from the creator of each chart. In other words, she hoped that by creating new narratives of the past, her students would also imagine alternate futures.
        </p>
        <p>
          The political crisis that motivated the Peabody to create her Chronological History is required context for understanding Peabody’s ideas about the uses of historical knowledge. In addition, it helps to underscore how the images she created, as well as the methods she employed, were also politically situated. As I argue throughout this project, the idea of data visualization at its most basic level is culturally and politically situated as well.
        </p>
        <p>
          While it requires a bit of background knowledge--or reading the textbook itself--for contemporary viewers to detect the politics of Peabody’s charts, other charts make their politics more explicit--for example, Emma Willard’s Temple of Time, which I explore in Chapter ##. In my analysis there, I discuss how Willard depicts the events of history as the pillars supporting her eponymous temple, with the present represented as an unfinished column, not yet secure enough to contribute to supporting the weight of the past. On the floor of the temple, she places the United States in the foreground, opening up towards the viewer, enfolding them in what was to come. Peabody explicitly identified Willard as a major source of inspiration for her own project, crediting Williard with creating “the most ingenious chart ever invented, besides (my own).”
        </p>
        <p>
          In Chapter ##, I also discuss how Willard’s own influences, which tended to be to more canonical (because more conventional) visualization examples—Joseph Priestley’s New Chart of History, from 1796, which scholars claim was the most circulated chart of this sort of its time; and William Playfair’s Commercial and Political Atlas, from 1786, which I discuss in Chapter ##. According to historian Susan Schulten, Willard appreciated the efficiency of the form of the chart, but felt that it gave “little sense of the dimension, such as the relative importance of periods or the subjective experience of time.” Sure enough, while these earlier charts fail to provide a sense of the subjective experience of time, they do offer images that we can very easily interpret today.
        </p>
      </div>
      <div>
        Conlusion goes here
      </div>
    </Section>
    <Section title="The Labor of Knowledge Production">
      <p>
        Certain aspects of Peabody’s scheme do in fact translate to the present, in the form of the object oriented way in which she structures the data that underlies her charts. This has prompted me to undertake a second project to implement a floor-size version of Peabody’s charts, which you can see here in its current state.
      </p>
      <p>
        And as I carefully align each strip of tape; and solder each part of the circuit together, I think back to Peabody’s <b>own</b> process of fabrication. When I mentioned that she made floor-sized versions of the charts as a sort of marketing ploy, what I didn’t mention was that, as an additional incentive, she promised a handmade mural chart to any classroom that purchased the book. Writing to a friend in 1850, Peabody revealed that she was “aching from the fatigue” of making the charts for each school.
      </p>
      <p>
        “Just now I am aching from the fatigue of making Charts for the Schools who will take the book… Every school must have a mural chart—& there is but one way of making them (until they can be made by ten thousands) & that is by stencilling [sic]… I can do one a day. But I must sell them cheap… To day I worked 15 hours—only sitting down to take my meals—& so I have done all week—so much fatigue stupefies one—but as soon as it is adopted in a few towns I shall be able to hire someone to do this drudgery for me.”
        <br>
        - Elizabeth Peabody, Letter to Samuel Gray Ward, September 1850
      </p>
      <p>
        She described how she would stencil shapes and colors onto a large piece of fabric. A single one took her 15 hours. As you can see from the text of the letter, she yearned for her book to become profitable so that she could hire someone to “do this drudgery for me.”
        It speaks both to poor book sales, and to the perceived lack of value of the charts, that none have been preserved. But what we do have, in letters like these, is evidence of the actual physical labor, as well as of the knowledge work  involved in producing the charts. And more specifically, with her reference to the fabric, and to the drudgery, it’s labor in feminized form.
      </p>
      <p>
        Let me take some time unpack this, because it’s this observation that I want to end with, as I bring us back to the present.
      </p>
      <p>
        A lot of people—or, well, the handful who have ever thought to comment on Peabody’s work—observe that Peabody’s charts look like Mondrian paintings. And it’s true that, in their abstraction, they evoke the Modernist grid. But thinking about the feminized labor of making the charts brings to mind a second point of reference, which is quilting.
      </p>
      <div>
        rest of section text
      </div>
    </Section>
    <Section title="Conclusion">
      <Scrollytell collect>


        <template v-slot:fixed="{ scrolled }">
          <img src="./img/_brookes.jpg" width="500px"/>
          <h1>Scrolled through: {{scrolled}}</h1>
        </template>


        <template v-slot:1>
          Scrolltext 1
          yadayadayada
        </template>

        <template v-slot:2>
          <p>
            Scrolltext 2
          </p>
          <p>
           yadayada
          </p>
        </template>

        <template v-slot:3>
          Scrolltext 3
        </template>
        <template v-slot:4>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium asperiores assumenda, blanditiis consequuntur, distinctio eius eum exercitationem fuga id ipsam maiores minima nisi nostrum porro quia rem rerum sunt.
        </template>
        <template v-slot:5>
          2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi aperiam autem, dolorum ex harum iste libero molestiae nemo quos rerum sed similique soluta voluptas voluptate! Aut incidunt vitae voluptas.
        </template>
      </Scrollytell>
      <p>
      And to me, there lies the principal lesson of Peabody’s charts—about what information constitutes knowledge, about how that knowledge is perceived, and about who is authorized to produce it. So that, to me, is why this project—the historical part and the technical one—is a humanistic one. Because it brings renewed attention to the role of interpretation, and to the modes of knowing outside of what we’d typically consider to be visualizable, such as intuition, or affect, or embodiment.
      </p>
      <p>
        As humanities scholars, we’re trained to recognize the value of these alternate forms of knowledge, just as we’re trained to look for the people, like Peabody, or the women of Gee’s Bend, who stand on the margins of the archive. These are often people whose stories we would otherwise lack sufficient evidence to be able to bring to light, whether it’s evidence in the form of data, or the archival record itself.
      </p>
      <p>
        And this is where I see a convergence in the historical and theoretical work of archive, and the more technical, but equally theoretical work relating to data and its visual display.  It’s where I think humanities scholars have real lessons to teach those who design visualizations—and those who work with data more generally. But it’s also a space where I think that we, as digital humanists, could make more of an intervention in our own scholarly fields. We can show how digital objects—like data visualization, or like the concept of data itself—can function as our primary objects of study, and not just means and methods we use, un-reflexively, to advance other claims.
      </p>
    </Section>

<!--        @hover-start="hoverStart"-->
<!--        @hover-end="hoverEnd"-->




  </chapter-scaffold>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChapterScaffold from '@/components/ChapterScaffold'
import TimelineVis from '@/components/vis/timeline/TimelineVis'
import PeabodyGrid from '@/components/vis/peabody/PeabodyGrid'
import PeabodyMutable from '@/components/vis/peabody/PeabodyMutable'
import PeabodyTutorial from '@/components/vis/peabody/PeabodyTutorial'
import EventKey from "../components/vis/peabody/EventKey";
import { EventBus } from '@/helpers/EventBus'
import mutations from '@/store/dataset/types'
import ch_mut from '@/store/chapters-old/types'
import Section from '@/components/chapters/Section'
import Highlightable from "@/mixins/Highlightable";
import Scrollytell from "../components/scrollytelling/Scrollytell";
import MapScroller from "../components/scrollytelling/MapScroller";

export default {
  name: "ThePeabodyChapter",
  components: {
    PeabodyGrid,
    PeabodyMutable,
    ChapterScaffold,
    PeabodyTutorial,
    EventKey,
    TimelineVis,
    Section,
    Scrollytell,
    MapScroller,
  },
  mixins: [Highlightable(".chapter__main")],
  data() {
    return {
      currentDataset: 0,
      scrolled: false,
      scrolledMax: 0,
      mapPos: 0,
      imposter: {
        color: "#ff00ff",
        year: 1570,
        desc: "imposter",
        eventType: 3,
        actor: "England",
        id: 300
      }
    };
  },
  methods: {
    ...mapActions("chapters", ["setChapter"]),
  },
  created () {
    this.setChapter({title: "Peabody"});
  },
  destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>

  .event-key {

  }
.left-float {
  float: left;
}
.right-float {
  float: right;
}
.left-float.aligned {
  padding-top: 0.5em;
  padding-right: 1em;
}
.right-float.aligned {
  padding-top: 0.5em;
  padding-left: 1em;
}
p {
  text-align: justify;
}
</style>
