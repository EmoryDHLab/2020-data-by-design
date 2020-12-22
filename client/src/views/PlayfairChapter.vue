<template lang="html" xmlns="http://www.w3.org/1999/html">
  <chapter-scaffold v-bind:curChapter="'Peabody'">
    <template slot='title'>
      Visualization as Argument: William Playfair and the View “Simple and
      Complete”
    </template>
    <Section>
      <div>
        <p>
          Once or twice a month, in a city like New York or Mountain View or
          Chicago, several hundred aspiring information designers—along with a
          fair number of already established ones—settle themselves into rows of
          conference center seats (or, at least, they did before the pandemic
          struck) in order to await the arrival of Edward Tufte, the “da Vinci”
          of data visualization, as he’s been dubbed by <i>The New York
          Times</i>.
          <FootnoteRef :number="1"></FootnoteRef>
          The audience members, each of whom has paid several hundred dollars to
          attend the daylong course, begin to grow quiet, although the lights
          never fully dim—Tufte famously does not use PowerPoint, only slides.
          And for six solid hours (there is no break for lunch), his devotees
          imbibe the lessons of his four canonical books: that visualizations of
          data should be “clear” and “efficient”; that they should present
          “accurate” representations of the data at hand; and that they should
          encourage the viewer to think about the “substance” of the data,
          rather than the “methodology” underneath.
          <FootnoteRef :number="2"></FootnoteRef>
          In this way, Tufte explains—in a phrase he recites from his most
          influential volume, <i>The Visual Display of Quantitative
          Information</i>—visualizations can be made to “<i>reveal</i>” the data
          on display (emphasis in the original).
          <FootnoteRef :number="3"></FootnoteRef>
        </p>
        <img class="centered-image" src="./img/ch1-1-tufte.jpg" width="80%"/>
        <p>
          But what, more precisely, does data visualization reveal? For Tufte,
          it’s any number of “complex qualitative ideas” that might be otherwise
          difficult to convey.
          <FootnoteRef :number="4"></FootnoteRef>
          Most scholars in the field of information visualization would agree;
          the graphical display of data reveals the “big picture,” they often
          say—the view from above that prompts a conclusion about a dataset too
          large, or too diffuse, to otherwise comprehend.
          <FootnoteRef :number="5"></FootnoteRef>
          In a recent interview, information visualization scholar Ben
          Schneiderman analogizes visualization to “a telescope or a microscope
          that increases your perceptual abilities,” allowing people to
          “understand complex processes so as to support better decisions.”
          <FootnoteRef :number="6"></FootnoteRef>
          And in <i>Readings in Information Visualization</i>, a now-classic
          textbook authored by Schneiderman along with Stuart Card and Jock
          Mackinlay, data visualization is described as a pathway to “insight.”
          <FootnoteRef :number="7"></FootnoteRef>
          And while acknowledging that both “designers of visualizations, and
          scholars who study them, have struggled to give a coherent definition
          of <i>insight</i>,” data journalist and visualization designer Alberto
          Cairo also maintains that clear and accurate images (and,
          increasingly, interactive graphics, like those featured in the <i>Times</i>),
          can lead to new knowledge about a subject—knowledge that would
          otherwise remain hidden from view.
          <FootnoteRef :number="8"></FootnoteRef>
        </p>
        <p>
          This belief in the clarifying and consolidating capacity of data
          visualization is often attributed to a single source: the Scottish
          political economist William Playfair (1759-1823), whose time series
          graphs, bar charts, and pie charts—many believed to be the first of
          their kind—provide today’s information designers with exemplary models
          of how visualization can indeed reveal the greater significance of the
          data at hand. In the opening lines of <i>The Visual Display of
          Quantitative Information</i>, Tufte positions Playfair as the
          progenitor of modern data visualization, describing his work as
          “remarkable.”
          <FootnoteRef :number="9"></FootnoteRef>
          Most other histories of visualization have followed suit.
          <FootnoteRef :number="10"></FootnoteRef>
          As an encapsulation of Enlightenment empiricism, and in particular, of
          the power of inductive reasoning, Playfair’s work endures as an
          ur-example of the composite process of knowledge production: ideas are
          first perceived by the senses, and then processed by the mind. “On
          inspecting any one of these Charts attentively,” Playfair himself
          explains, “a sufficiently distinct impression will be made, to remain
          unimpaired for a time, and the idea which does remain will be simple
          and complete.”
          <FootnoteRef :number="11"></FootnoteRef>
        </p>
        <img class="centered-image" src="./img/ch1-2-wheat.jpg" width="30%"/>
        <img class="centered-image" src="./img/ch1-3-northamerica.jpg"
             width="30%"/>
        <img class="centered-image" src="./img/ch1-4-pie.jpg" width="30%"/>
      </div>
    </Section>
    <Section title="The Value of Visual Knowledge">
      <div>
        <p>
          While Playfair is widely recognized today for his role in the
          development of modern data visualization, he remained “largely
          unacknowledged” in his own time.
          <FootnoteRef :number="12"></FootnoteRef>
          More to the point, he was almost always nearly broke.
          <FootnoteRef :number="13"></FootnoteRef>
          Thus while Playfair chose to commission one of the most skilled
          engravers in all of London, Samuel John Neele, to produce the plates
          for his <i>Commercial and Political Atlas</i>, he likely requested
          that Neele work at speed so as to minimize the costly detailing and
          other flourishes for which he was known. Neele thus engraved the
          charts’ decoration, framing, titles, and other lettering, leaving
          Playfair—who had trained as an engineer—to engrave the lines of
          imports and exports by himself.
          <FootnoteRef :number="14"></FootnoteRef>
        </p>
        <p>
          For the most part, this division of labor suited Playfair, who had a
          very clear view of what he wanted his data lines to display. Until he
          made a mistake. The tail end of the line of imports in chart of
          “Exports & Imports to and from all of North America” splits in half.
          For the final years of the century, there are two lines of imports,
          not one.
        </p>
        <!-- Could also be a zoom in on image 3 (above) as you scroll -->
        <img class="centered-image" src="./img/ch1-5-error.jpg" width="80%"/>
        <p>
          Playfair’s error was a common one—owing to the physical strength and
          endurance that is required of copperplate engraving, the process used
          to print “Exports & Imports to and from all of North America.”
          <FootnoteRef :number="15"></FootnoteRef>
          But its frequent occurrence would not have made it any more tolerable
          to Playfair. In the present, however, it offers tremendous value for
          how it provides a glimpse into the process by which Playfair printed
          his charts, as well as how he designed them. More specifically, it
          shows how Playfair’s charts did not directly depend on actual data.
          There is no evidence—including the evidence of this chart--to suggest
          that Playfair plotted any actual data points before engraving the
          actual data lines.
          <FootnoteRef :number="16"></FootnoteRef>
        </p>
        <p>
          In point of fact, Playfair did not intend to include the charts’
          underlying data in his book either. It was only after soliciting
          feedback from James Watt, inventor of the steam engine—and for whom
          Playfair worked in his youth—that he received the advice to include
          his charts’ data in tabular form.
          <FootnoteRef :number="17"></FootnoteRef>Playfair thus dutifully compiled
            statistical tables to accompany each of his charts, which he
            included in the first and second editions of the <i>Atlas</i>.
        </p>
        <img class="centered-image" src="./img/ch1-6-data.png" width="80%"/>
        <p>
          But by the book’s third edition, Playfair had gained enough confidence
          in the form and function of his charts that he no longer felt
          obligated to include the associated data tables, as Watt had initially
          advised. Indeed, Playfair understood the function of his charts as
          quite distinct from that of tables, or “figures,” as he termed them.
          In introduction to the Atlas, he <i>explains</i>:
        </p>
        <blockquote>
          The advantage proposed by this method, is not that of giving a more
          accurate statement than by figures, but it is to give a more simple
          and permanent idea of the gradual progress and comparative amounts, at
          different periods, by presenting to the eye a figure, the proportions
          of which correspond with the amount of the sums intended to be
          expressed.
          <FootnoteRef :number="18"></FootnoteRef>
        </blockquote>
        <p>
          In explicit contrast to the “more accurate” information conveyed
          through the form of the data table, Playfair understood the value of
          his charts as their ability to impart “simple and permanent”
          knowledge. In other words, the knowledge conveyed through the charts
          was different than the knowledge conveyed through the data, and
          explicitly so. It was admittedly more reductive, but it was also
          easier to understand—and, as a result, easier to remember.
        </p>
        <p>
          Playfair’s interest in presenting a “simple and permanent idea,” over
          and above any particular data point, is further born out in the
          liberties he took in interpolating his data. For example, his “Chart
          of Imports & Exports to and from all of North America” clearly depicts
          economic instability. But even if that instability could be confirmed
          by other sources, Playfair did not himself possess the data to support
          the line that he engraved.
          <FootnoteRef :number="19"></FootnoteRef>
        </p>
        <!-- Visualization that shows difference b/t data and chart -->

        <!--vis-->

        <Scrollytell collect bottom-break :scrollSlots="9">
          <template v-slot:fixed="{ scrolled, progress }">
            <d3Impl :slideNumber="scrolled"/>
          </template>
          <template v-slot:1>
            <p>
              Canvas
            </p>
          </template>
          <template v-slot:2>
            <p>
              X-axis
            </p>
          </template>
          <template v-slot:3>
            <p>
              Y-axis
            </p>
          </template>
          <template v-slot:4>
            <p>
              First Draft
            </p>
          </template>
          <template v-slot:5>
            <p>
              bumpy line
            </p>
          </template>
          <template v-slot:6>
            <p>
              smoother line
            </p>
          </template>
          <template v-slot:7>
            <p>
              shapding
            </p>
          </template>
          <template v-slot:8>
            <p>
              medallion
            </p>
          </template>
          <template v-slot:9>
            <p>
              original data
            </p>
          </template>
        </Scrollytell>

        <p>
          For Playfair, his lack of data was not of concern. His intention was
          to model a new “mode of painting to the eye,” one that—following John
          Locke and the dominant Enlightenment view—could be easily perceived by
          the senses and then converted into knowledge by the mind.
          <FootnoteRef :number="20"></FootnoteRef> In this way, Playfair intuits the capacity
            of visualization to produce insight in precisely the way that
            Schneiderman and others have described. And yet, Playfair’s charts
            are in no way dependent upon the data that informs them. His goal,
            instead, was to create an image <i>inspired</i> by the data—one that
            was intended to produce a visual impression that, in turn, could be
            converted into knowledge by the mind. This was not the “data-driven
            knowledge” that defines our current moment, but rather his own
            interpretation of the data that, through visualization, could become
            knowledge of a new kind.
        </p>
      </div>
    </Section>
    <Section title="The Politics of Playfair's Charts">
      <div>
        <p>
          Playfair created his charts in an era of intense political change. At
          the time that Playfair released the third (and most widely circulated)
          edition of his book, the French revolution had only just come to a
          halt, the result of a coup staged by Napoleon Bonaparte—himself an
          inspiration for another iconic visualization, Charles Minard’s map of
          Napoleon’s 1812 Russian campaign. The Haitian Revolution was still
          underway; it would not resolve until in 1804, with the founding of the
          Republic of Haiti. Meanwhile, the effects of the American Revolution
          still lingered in the minds of the European elite, as they continued
          to consider the possibility of additional colonial revolts. Thus when
          Playfair explains that he has “chosen the present moment” to rerelease
          his <i>Atlas</i> because of the “singularity of the situation in which
          Europe is now placed,” it was this revolutionary political “situation”
          to which he referred.
          <FootnoteRef :number="21"></FootnoteRef>
        </p>
        <img class="centered-image" src="./img/ch1-7-minard.png" width="80%"/>
        <p>
          Playfair understood his work as an active political intervention: a
          means of countering the instability that the so-called Age of
          Revolutions had brought about. Playfair was openly unsure about what
          the future might hold. In the <i>Atlas</i>, he speculates that “Europe
          may probably be convulsed with war for fifty years to come,” and
          professes uncertainty about whether he is witnessing the end of
          European cultural and economic dominance, or whether its “art and
          commerce” will prevail.
          <FootnoteRef :number="22"></FootnoteRef> But regardless of the outcome—or, I would
            contend, precisely <i>because</i> of the uncertainty of the
            outcome—Playfair identifies tremendous value in the clarity of
            perspective produced by his charts. As he explains:
        </p>
        <blockquote>
          “If [a future of war] turns out so, a picture of the past will be a
          valuable thing, if, on the contrary, commerce should still continue
          its progress, this will make the first part of a great whole, which,
          when completed on some future day, will be a most valuable work.”
          <FootnoteRef :number="23"></FootnoteRef>
        </blockquote>
        <p>
          From these lines, it seems that Playfair believes that his “simple and
          complete” images can not only capture the instability of his time, but
          also guard against the uncertainty of the future.
          <FootnoteRef :number="24"></FootnoteRef> His goal is to cut through complexity,
            guided by a belief that less detail—and not more—is what will enable
            more useful and enduring knowledge.
        </p>
        <p>
          But a pair of questions remains: for whom is this knowledge truly
          useful, and for what reasons is it necessary that this knowledge
          endure? As Playfair elaborates the impetus behind the “form and
          manner” of his charts, he makes clear that his intended audience is
          not “any person” in the world, but rather, the narrower world of “men
          of high rank, or active business.”
          <FootnoteRef :number="25"></FootnoteRef> These men, he continues, “can only pay
            attention to general outlines; nor is attention to particulars of
            use.”
          <FootnoteRef :number="26"></FootnoteRef>Their concerns are not with nuance, or
              with individual impact, because their rank and resources shield
              them from any personal fallout from the events pictured—or from
              their political source. This knowledge is valuable to them
              precisely because it is clear and efficient, and allows them to
              ignore any details that might cloud their view. The result is a
              further consolidation of political and economic power, one which
              follows from the consolidating capacity of the design of the
              charts.
        </p>
        <p>
          To be sure, very few of the myriad people who employ line graphs today
          do so with a stated aim of consolidating political or economic power.
          Indeed, line graphs are among the most ubiquitous visual typologies in
          circulation today. But as a consideration of Playfair’s writing about
          his charts makes clear, they carry very specific ideas about the uses
          of visualization, as well as about the specific people who are
          intended to make use of them. While we are no longer living in the Age
          of Revolutions, there remains a politics of knowledge embedded in
          visualization design, one which Playfair’s charts help us in the
          present more fully see.
        </p>
      </div>
    </Section>
    <Section title="Playfair’s Argument in the Present">
      <div>
        <p>
          The information studies scholar Johanna Drucker has argued
          persuasively for how certain “assumptions about what constitutes
          information” are embedded in contemporary visualization tools.
          <FootnoteRef :number="27"></FootnoteRef> But it is assumptions not only about what
            constitutes information, but also about visualization itself, that
            are embedded in the tools we employ. Consider the process of
            recreating one of Playfair’s charts with D3.js, as we did for this
            chapter. Unlike Playfair’s chart, which needed no actual data in
            order to be produced, we were required to begin with a dataset.
            These data were required not merely as a guide, but as the very
            foundation of the visualization itself. D3 is, after all, software
            library designed with data at its core. Its own innovation is not
            any new mode of graphical display, but instead the ease and
            efficiency with which a dataset can be visualized, on the web,
            according to any conceivable form.
        </p>
        <!-- Vis that shows Playfair's data as stacked bar chart and one other--coxcomb, maybe? -->
        <p>
          More than a practical issue, this structural dependency on the data
          points to an evolving understanding of the significance of data, and
          of the role of visualization in making this significance clear.
          Whereas Playfair was unfazed by the lack of data to support the lines
          that he engraved, a contemporary visualization designer would be
          shocked at the suggestion that a data line be drawn with only a mental
          image of its slope as a guide. Even more difficult to comprehend is
          the underlying idea that the dataset and the image are altogether
          distinct. Thus as Playfair continues to be positioned as the source of
          so many of the visual typologies that we encounter today, we would be
          well-served by attending to his “assumptions” about his images, and
          how they diverge—or not—from the images we encounter today.
        </p>
        <p>
          Consider the wide range of visualization libraries and platforms that
          make use of Playfair’s charts in order to demonstrate their own
          features. For instance, Arvind Satyanarayan and Jeffrey Heer center
          the product demo video for Lyra, their drag-and-drop visualization
          platform, around a recreation of Playfair’s 1822 bar chart comparing
          the price of wheat and worker’s wages. Michael Bostock, similarly,
          demonstrates the flexibility of Protovis, the visualization toolkit he
          developed before D3, with this example (among several others). Andy
          Cotgreave, the social content manager at Tableau Software, a
          commercial visualization platform, models its interactive capabilities
          by enhancing Playfair’s original import-export chart design.
          <FootnoteRef :number="28"></FootnoteRef> The list could go on. And while they make
            very different assumptions about the function of data and its
            relation to visual display, they express a view of the value of
            visualization that is inherited from Playfair himself. Indeed, in
            many ways, Playfair’s argument about the value of reducing
            complexity in the service of a “simple view” has become synonymous
            with the argument for the value of visualization itself.
        </p>
        <img class="centered-image" src="./img/ch1-8-McCune.png" width="30%"/>
        <img class="centered-image" src="./img/ch1-9-Camoes.png" width="30%"/>
        <img class="centered-image" src="./img/ch1-10-stevens.png" width="30%"/>
        <p>
          While this argument is not always made explicitly, or even
          intentionally, it is evident in the wide range of contexts in which
          Playfair’s visual typologies are deployed. On the one hand, this
          pervasiveness confirms Playfair’s own claims about the broad utility
          of his designs. But on the other, it elides the assumptions embedded
          in those designs: that the primary goal is of visualization is to
          reduce complexity, and to produce a simple, more comprehensible view.
        </p>
        <!-- Jianing's vis of multiple datasets that can be swapped out goes here -->
        <D3ImplCovid/>
        <p>
          What do these visualizations of incredibly varied data, each of which
          look roughly the same, tell us about the assumptions embedded in their
          form? To be sure, there are specific trends that can be discerned from
          each dataset—in the case of deaths from Covid-19, the waves of
          infection, and the comparative response between the US and the UK; in
          the case of comparative income levels, the increasingly tenacious grip
          of global neoliberalism; and in the case of women representatives in
          government, how much more work is to be done. But these are all
          general trends. How are we to be prompted to think about, for example,
          the uncertainty around how “death” from Covid-19 has been defined; how
          the average income level erases the widening gap rich and poor; or, in
          the case of political representation, how gradual change is often
          accelerated by specific events. These are each crucial questions to
          ask about their respective dataset, but their answers are not
          conveyed—or nor are the questions even prompted—by the simple view
          presented through Playfair’s form.
        </p>
        <p>
          Every visualization carries certain assumptions—what I’ve called an
          argument—about the knowledge that it conveys. This has to do not only
          with the value of that knowledge, or its intended recipient, but also
          about its source. As we will see throughout this site, this argument
          is by no means the same for each image, interaction, or other instance
          of data visualization that we encounter in the world. Thus while
          contemporary visualization researchers increasingly assert, as does
          Ben Schneiderman, that “the purpose of visualization is insight, not
          pictures,” we must continually ask ourselves about the nature of this
          insight—the basis for its knowledge claims, the utility it serves, and
          for whom its utility applies—lest we fall back into the passive mode
          of knowledge reception that characterized Playfair’s intention for his
          charts.
        </p>
      </div>
    </Section>
    <Section title="What Visualization Does Not Reveal">
      <div>
        <p>
          We know from Playfair’s own account that he was “long anxious” to be
          acknowledged as an innovator.
          <FootnoteRef :number="29"></FootnoteRef> We also know about his persistent financial
            pressures, as well as how much of his life he dedicated to the task
            of promoting visualization as a method.
          <FootnoteRef :number="30"></FootnoteRef> While outside the bounds of the image
              itself, this context informs its interpretation, as it does for
              any chart. What is not revealed on the surface of any particular
              visualization is contained within its depths.
        </p>
        <p>
          Yet unlike the error that Playfair inscribed in his chart of “Exports
          & Imports to and from all of North America,” any errors that are made
          en route to producing a data visualization today are far more
          difficult to detect. Among the array of visualization tools currently
          in use—from standalone platforms such as Adobe Illustrator or Tableau,
          to software libraries such as ggplot or D3, which we use for this
          site—each allows for easy revision. Errors in scale can be adjusted.
          Clashing colors can be swapped out. And data lines are generated
          automatically, interpolated from the data themselves. The finished
          product bears no trace of the process of its production—of the many
          revisions, the myriad design tweaks, and the edits to the code. We
          must therefore continue to attend to conditions of their making, and
          to the conceptual, political, and procedural arguments embedded in
          their design.
        </p>
      </div>
    </Section>
  </chapter-scaffold>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ChapterScaffold from '@/components/ChapterScaffold'
  import TimelineVis from '@/components/vis/timeline/TimelineVis'
  import PeabodyGrid from '@/components/vis/peabody/newpeabodygrid/PeabodyGrid'
  import PeabodyMutable from '@/components/vis/peabody/PeabodyMutable'
  import PeabodyTutorial from '@/components/vis/peabody/PeabodyTutorial'
  import EventKey from "../components/vis/peabody/EventKey";
  import Section from '@/components/chapters/Section'
  import Highlightable from "@/mixins/Highlightable";
  import Scrollytell from "../components/scrollytelling/Scrollytell";
  import MapScroller from "../components/scrollytelling/MapScroller";
  import PeabodyCanvas from "../components/vis/peabody/PeabodyCanvas";
  import Footnotes from "../components/general/Footnotes"
  import FootnoteReference from "../components/general/FootnoteReference";
  import EventSquare
    from "../components/vis/peabody/newpeabodygrid/EventSquare";
  import {actorColors, dataToYears} from "../helpers/PeabodyUtils";
  import * as d3 from "d3";
  import PeabodyQuiz from "../components/vis/peabody/quiz/PeabodyQuiz";
  import d3Impl from "../components/vis/playfair/creationProcess/D3Impl";
  import D3ImplCovid from "../components/vis/playfair/creationProcess/D3ImplCovid";

  export default {
    name: "PlayfairChapter",
    components: {
      D3ImplCovid,
      d3Impl,
      ChapterScaffold,
      EventKey,
      TimelineVis,
      Section,
      Scrollytell,
      PeabodyCanvas,
      MapScroller,
      Footnotes,
      FootnoteRef: FootnoteReference
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
    },
    created() {
      this.setChapter({title: "Playfair"});
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>

<style scoped>

  .event-box {
    position: relative;
    top: 14vh;
    left: 1.8vh;
    margin-bottom: -300px;
  }

  .event-box ul {
    list-style: none;
    margin-left: 1.4vh;
    padding-left: 0;
  }

  .event-box li {
    display: flex;
    align-items: center;
  }

  .event-box li svg {
    margin-right: 5px;
  }

  .event-box-year {
    font-family: monospace;
    font-size: 2vh;
  }

  .centered-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .multi-canvas {
    margin-left: auto;
    margin-right: auto;
    width: 40vh;
  }

  .multi-canvas ul {
    text-align: center;
  }

  .multi-canvas ul li {
    display: inline-block;
  }

  .multi-canvas ul li:not(:first-child)::before {
    content: '•';
    font-size: 20px;
    display: block;
    float: left;
    margin-left: 2px;
    margin-right: 2px;
    margin-top: -2px;
  }

  .selected-event {
    /*border-left: 5px solid yellow;*/
    /*background-color: yellow;*/
    text-decoration: underline;
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
