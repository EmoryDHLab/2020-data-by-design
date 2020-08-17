<template lang="html">
  <chapter-scaffold v-bind:curChapter="'Peabody'">
    <template slot='title'>
      A Method of Making History: Elizabeth Palmer Peabody’s Chronological
      Charts
    </template>
    <!--    <div style="display:flex;">-->
    <!--      <peabody-grid-->
    <!--        :id="'peabody-vis-1'"-->
    <!--        style='flex: 1'-->
    <!--        width='45vh'-->
    <!--        height='45vh'-->
    <!--        :mutableDataset="'my-peabody'"-->
    <!--        :staticDataset='"1"'/>-->
    <!--    </div>-->
    <Section>
      <div>
        <p>
          Elizabeth Palmer Peabody was born in Massachusetts in 1804. Today, she
          is most famous for her proximity to more
          well-known writers of the American Renaissance, such as Ralph Waldo
          Emerson and Nathaniel Hawthorne. (Hawthorne
          was actually married to her sister, Sophia). But Peabody had impact in
          her own right: the bookstore that she ran
          out of her home, in Boston, functioned as the de facto salon for the
          transcendentalist movement. She edited and
          published the first version of Henry David Thoreau’s essay on civil
          disobedience. And she was an educational
          innovator: she is credited with starting the first kindergarten in the
          United States.
        </p>
        <p>
          But in the 1850s, Peabody set off to ride the rails. She traveled as
          far
          north as
          <a class="blue-hover" href="#" @mouseover="mapPos=1"
             @mouseout="mapPos=0">Rochester, NY</a>;
          as far west as
          <a class="blue-hover" href="#" @mouseover="mapPos=2"
             @mouseout="mapPos=0">Louisville, KY</a>;
          and as far south as
          <a class="blue-hover" href="#" @mouseover="mapPos=3"
             @mouseout="mapPos=0">Richmond, VA</a>,
          in order to promote the US history textbook she had recently
          published,
          A Chronological History of the United
          States. The book documented a new method of teaching history--one that
          had data visualization at its core.
        </p>
      </div>
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
        Along with boxes of her history textbook, Peabody traveled with a cloth
        and paper roll the size of a living room
        rug, which contained floor-sized versions of the chronological charts
        described in the book. Peabody identified
        the charts—in their vibrant, full-color detail—as key components of her
        visual pedagogy. As she describes in the
        “Advertisement” that begins the book, the charts were “intended to do
        for the science of history what maps do
        for that of geography; and they will make [it] easy to lay the
        foundations of historical knowledge
        in the minds of the young.”
        <FootnoteRef :number="1"></FootnoteRef>
        Like Willard, Playfair, and other early proponents of data
        visualization, Peabody understood the value of visual
        mnemonics. But she did not intend her students to simply memorize the
        charts. Rather, she hoped to encourage her
        students to participate in the process of knowledge production as they
        attempted to interpret the chronological
        data presented by the charts. The charts “do[] not pretend to be what an
        outline can never be, namely: a perfect
        frame work for history,”
        Peabody elsewhere explained.
        <FootnoteRef :number="2"></FootnoteRef>
        On the contrary, through the act of interpretation, each student would
        be prompted to develop their own
        framework for understanding the events of the past.
      </p>
      <img class="centered-image" src="./img/peabodytitlepage.jpg" width="50%"/>
    </Section>
    <Section title="Multiplying Meaning through the Chronological Charts">
      <p>
        Peabody’s method of visualizing events of historical significance was
        inspired by a system developed in Poland
        in the 1820s, and popularized in subsequent decades by the military
        general (and erstwhile math teacher) Jósef
        Bem. The Polish System, as it was then called, employed a grid overlaid
        with shapes and colors to visually
        represent events in time.
        <FootnoteRef :number="3"></FootnoteRef>
        Peabody first encountered the system in 1845 almost by chance, through a
        traveling
        lecturer who briefly boarded with her family. The boarder, a man named
        Joseph Podbielski, had come from Poland
        with copies of Bem’s charts. Peabody became “captivated” by them,
        according to one of her biographers, Bruce
        Rhonda, as well as her nephew Julian Hawthorne--Nathanial and Sophia’s
        son--who Peabody tapped to serve as her
        test subject. By his own admission, Hawthorne posed somewhat of a
        pedagogical challenge. “I was always most
        inapt and grievous, in dates and mathematics especially,” he later
        recalled.
        <FootnoteRef :number="4"></FootnoteRef>
        But Peabody was undeterred. She
        went on to devote several years to a study of the Polish System,
        culminating with the development of her own
        modified version--the Polish-American System that prompted her national
        tour.
      </p>
      <Scrollytell collect bottom-break :scrollSlots="5">
        <template v-slot:fixed="{ scrolled, progress }">
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
            Peabody’s system, like the Polish one, is based on a numbered grid,
            with each year in a century marked out
            in its own box.
          </p>
        </template>
        <template v-slot:2>
          <p>
            Each box is then subdivided, with each of the nine smaller squares
            corresponding to a particular type of
            historical event.
          </p>
        </template>
        <template v-slot:3="{ progress, scrolled }">
          <p>
            In the top left corner is the space for wars, battles, and sieges;
            in the top middle is the space for
            conquests and unions;
            in the top right is the space for losses and divisions, and so on.
          </p>
          <EventKey class="event-key" :colors=" scrolled > 4 ?
                [false, false, 'rgb(50, 91, 103)',
                false, 'rgb(69, 136, 103)', false,
                'rgb(141, 43, 29)', false, false] : Array(9)"

                    :style="{
                  width: '20vh',
                  opacity: d3.interpolate(0,1)(progress),
                  transform: d3.interpolateString('translateX(10vh)', 'translateX(-5vh)')(d3.easeQuadOut(d3.scaleLinear([0.5,1], [0,1])(progress))),
                  marginTop: '2vh',
                  zIndex: '100'
                 }"
                    showLegend showNumbers dropShadow></EventKey>
        </template>
        <template v-slot:4>
          <p>
            Shapes that take up the entire box indicate an event of such
            magnitude or complexity that the other events
            in that same year hardly matter.
          </p>
        </template>
        <template v-slot:5>
          <p>
            The events are also color-coded, indicating the various countries
            involved in a particular event.
          </p>
        </template>
      </Scrollytell>
      <p>
        While the Polish-American System took a broadly Western Judeo-Christian
        approach to history, and covered an enormous expanse of time--the period
        between 2500 BCE and 1849 CE (what was then the present)--Peabody also
        saw the need for a textbook that focused solely on the United States.
        And so, shortly after the release of the Polish-American System, she
        began working on a second book that would be published, in 1856, as A
        Chronological History of the United States. The book contained four
        full-color plates, one for each of the centuries since the first
        European colonizers set foot on Indigeous American land. As Peabody
        envisioned it, the basic exercise was to read a chapter of the textbook,
        which contained a narrative account of the events of a single century,
        and then match the list of events that concluded the chapter with their
        graphical form.
      </p>
      <div>
        <p :style="overlayIntroParagraphStyles">
          With this exercise in mind, we might examine one of the charts, such
          as this one depicting the seventeenth
          century, and we might begin to see how England is represented in
          <b :style="{color: actorColors.England}">red</b>,
          the Americas are represented in
          <b :style="{color: actorColors.Americas}">orange</b>,
          and the Dutch in
          <b :style="{color: actorColors.Holland}">teal</b>.
          Those are the three colors that dominate the image.

          The French are also peripherally involved, in
          <b :style="{color: actorColors.France}">blue</b>.

          By cross-referencing the chart to the table of events, as
          Peabody envisioned, we can identify, for example,
          <a class="blue-hover" href="#" @mouseover="overlayPos=7.5">
            the founding of Jamestown in 1607
          </a>
          and the
          <a class="blue-hover" href="#" @mouseover="overlayPos=20.1">
            settlement of Plymouth in 1620.
          </a>
          Significantly, Peabody also registers the
          <a class="blue-hover" href="#" @mouseover="overlayPos=20.6">
            first enslaved Africans arriving in Virginia
          </a>
          in that same year. While scholars and critics now recognize 1619 as
          the true year of that catalyzing event, it is
          meaningful that Peabody—on the side of abolition but by no means its
          most radical proponent—chose to picture
          that event in her chart.
          <FootnoteRef :number="5"></FootnoteRef>
        </p>
        <Scrollytell :scroll-slots="2"
                     :top="210"
                     :margin="'70vh'"
                     @scroll="onOverlayScroll">
          <template v-slot:fixed="{scrolled, progress}">
            <PeabodyCanvas v-model="overlayPos" :width="'40vh'"></PeabodyCanvas>
          </template>
          <template v-slot:1>
            <EventKey v-model="overlayEventKeyPos"
                      :colors="overlayEventKeyColors"
                      :style="{width: '20vh', position: 'relative', top: '15vh' }"></EventKey>

            <div class="event-box">
              <div class="event-box-year"> {{overlayCurrYear}}</div>
              <ul v-if="peabodyEvents && peabodyEvents[overlayCurrYear]">
                <li
                  v-for="[eventName, event] in Object.entries(peabodyEvents[overlayCurrYear])"
                  :key="eventName">
                  <EventSquare width="15" height="15"
                               :colors="event.actors.map(actor => actorColors[actor])"></EventSquare>
                  <span
                    :class="{ 'selected-event': event.squares.includes(overlayEventKeyPos) }">
                    {{ eventName }}
                  </span>
                </li>
              </ul>
            </div>

          </template>
          <template v-slot:2>
            <peabody-grid
              id='peabody-vis'
              style='transform: translateY(8px)'
              :width="'40vh'"
              height='40vh'
              :highlighted="overlayPos"
              @hover-start="onRecreatedGridHover"
              :staticDataset="staticDatasetId"/>
          </template>
        </Scrollytell>
      </div>

      <timeline-vis
        id='vis2'
        height='200px'
        width='100%'
        :highlighted="overlayPos"
        @hover="num =>this.overlayPos = Number(`${num}.1`)"
        :staticDataset="'1'"/>

      <div>
        <p>
          As this detailed explanation makes clear, few twenty-first-century
          viewers could have intuited the information conveyed by the chart
          without first taking the time to learn how to decode it. And for most
          contemporary visualization researchers and designers, who champion the
          clarifying capacity of visualization; or for those who believe that
          data visualization is best deployed to “amplify” existing thought
          processes, Peabody’s method would be viewed as a failure.
        </p>
        <p>
          In support of this perspective, consider this representation of the
          data of Peabody’s chart of the seventeenth century as a timeline,
          rather than a grid. The progression of events over the course of the
          century, culminating in a series of wars and rebellions in the late
          1680s and early 1690s, becomes much more immediately legible.
        </p>
        <p>
          But for Peabody, this near-total abstraction was precisely the point.
          Her charts were intended to appeal to
          the senses directly, to provide what she called “outlines to the eye.”
          <FootnoteRef :number="7"></FootnoteRef>
          Her hope was that, by providing the
          outline of history, and only the outline, each student would be
          required to fill in the space that remained.
          The result would be a unique account of history--one that originated
          from the mind of each student--and that
          reflected their own process of producing historical knowledge.
        </p>
        <p>
          Peabody’s emphasis on facilitating multiple interpretations amongst
          her students, rather than transmitting to
          them a single historical account, stands in direct contrast to someone
          like William Playfair, who, as
          discussed in Chapter One, designed his visualizations for that latter
          aim. It also
          strongly anticipates a central tenet of contemporary feminist thought:
          namely, that the most complete
          knowledge is gained from bringing together multiple perspectives.
          Feminist philosophers such as Donna Haraway
          make the case that all knowledge is “situated,” meaning that it is
          produce by specific people in specific
          circumstances--cultural, historical, and geographic.
          <FootnoteRef :number="8"></FootnoteRef>
          In fact, Haraway uses the example of data visualization
          in order to elaborate her claim. She identifies a phenomenon she calls
          the “God Trick,” in which viewers are
          made to believe that they are seeing everything all at once, from up
          above, like a “god.” But it is a “trick”
          because the image only appears to show everything. What we as viewers
          too readily interpret as a neutral,
          third-party, or “godlike” perspective, is just as situated as any
          other.
          <FootnoteRef :number="9"></FootnoteRef>
        </p>
        <p>
          The situated nature of historical knowledge is what Peabody designed
          her charts in order to express. She rejected the notion of a single
          account of history, preferring instead to facilitate the creation of
          multiple interpretive accounts. She saw her own role, both as teacher
          and as designer of the charts, as one of facilitator and guide. And
          she saw her charts as tools in this larger process of knowledge
          production. She deeply valued visual display--but not as means of
          presenting evidence or as proof of results. The value of her
          visualizations, instead, was to provide the “foundation of history,”
          upon which each viewer could construct their own interpretation of the
          past.
          <FootnoteRef :number="10"></FootnoteRef>
        </p>
        <PeabodyMutable
          :width="'40vh'"
          class="centered-image"
          :staticDataset="'1'"
          :mutableDataset="'my-peabody'"></PeabodyMutable>
      </div>
    </Section>
    <Section title="Making Knowledge by Making Charts">
      <p>
        In addition encouraging each student to interpret the printed charts for
        themselves, Peabody also identified the
        process of visualization itself as a means of making historical
        knowledge. To this end, she also printed
        workbooks with sheets of blank charts--”blank centuries,” she called
        them--as in the image below. In this
        version of her pedagogical plan, she envisioned the exercise as not
        merely cross-referencing the list of events
        with their visual representation, but of enabling students to themselves
        create the visualizations they would
        then study.
      </p>
      <img class="centered-image" src="./img/peabodyblank.png" width="40%"/>
      <div>
        <p>
          The prospect of creating a chronological chart is quite daunting, as
          I’ve learned both through my research and through my own experience.
          Having traveled to several archives over the course of conducting
          research for this project, I’ve paged through multiple copies of
          Peabody’s workbooks, and they each tend to follow a similar pattern: a
          page or two of grids filled out in earnest; then a series of attempts
          abandoned halfway; and then a shift in purpose from study to play, the
          grid becoming a canvas for geometric abstraction.
        </p>
        <p>
          The Polish-American system is, above all else, hard. But its
          difficulty seems to be both a liability of the form and also the
          point: Peabody developed her method at a time of national crisis—the
          decade leading up to the Civil War—and she recognized that the
          nation’s problems would also be difficult to solve. More than that,
          she understood that solving these problems would require sustained
          effort and significant thought. Her goal with the Chronological
          History was to create a framework, both visual and intellectual,
          through which this difficult thinking could take place.
          <FootnoteRef :number="11"></FootnoteRef>
          Her hope was
          that her system might prompt an array of possible paths out of the
          conflict—one coming from the creator of each chart. In other words,
          she hoped that by creating new narratives of the past, her students
          would also imagine alternate futures.
        </p>
      </div>
      <div>
        <p>
          The political crisis that motivated Peabody to publish her
          Chronological History is required context for understanding her ideas
          about the uses of historical knowledge. In addition, it helps to
          underscore how the images she created were themselves political. As I
          argue throughout this project, the idea of data visualization--at its
          most basic level--is culturally and politically situated as well.
        </p>
        <p>
          While it requires a bit of background knowledge--or taking the time to
          read the textbook--for contemporary viewers to detect the politics of
          Peabody’s charts, other charts make their politics more explicit--for
          example, Emma Willard’s Temple of Time, which I explore in Chapter ##.
          In my analysis there, I discuss how Willard depicts the events of
          history as the pillars supporting her eponymous temple, with the
          nineteenth century--then the present--represented as an unfinished
          column, not yet stable enough to support the weight of the past. On
          the ceiling of the temple, Willard catalogues key figures from each
          century, including statesmen, philosophers, discoverers, and poets. On
          the floor of the temple, she lays out the developments of major
          nation-states, their paths drawn as rivers subjected to the expansions
          and contractions of time. In the front and center of the floor,
          Willard places the path of the United States, opening up towards the
          viewer, enfolding them in the future to come. Although widely
          divergent from Peabody in terms of aesthetics, Peabody explicitly
          identified Willard as a major source of inspiration, crediting her
          with creating “the most ingenious chart ever invented, besides (my
          own).”
          <FootnoteRef :number="12"></FootnoteRef>
        </p>
        <p>
          In Chapter ##, I discuss Willard’s own influences: Joseph Priestley’s
          New Chart of History, from 1796, among the most circulated charts of
          its time; and William Playfair’s Commercial and Political Atlas, from
          1786, which I discuss in Chapter ##. According to historian Susan
          Schulten, Willard appreciated the efficiency of the form of Playfair’s
          charts, but felt that they gave “little sense of the dimension, such
          as the relative importance of periods or the subjective experience of
          time.” Sure enough, while these earlier charts fail to provide a sense
          of the subjective experience of time, they do offer images that we can
          very easily interpret today.
        </p>
        <p>
          But clarity and communicative value were not among Peabody’s primary
          goals. She understood the value of her charts as provoking
          questions--and provoking thought. The significance of the data
          represented on the charts--and, in the case of the workbooks, even the
          choice of which data to present at all--was determined by the creator
          of each chart. If there was a single message communicated by her
          visualizations, it was that their meaning was not fixed--nor should it
          be. Rather, Peabody hoped to impress upon her viewers a sense of
          responsibility for creating informed interpretations of the
          abstractions they perceived--and then designing a course for future
          action.
        </p>
      </div>
    </Section>
    <Section title="The Labor of Knowledge Production">
      <div>
        <p>
          Peabody consistently iterated upon her pedagogy. A third method by
          which she sought to communicate her method to her students was through
          large-scale versions of the charts--the cloth and paper rolls
          mentioned at the outset of this chapter. By all accounts, they were
          dazzling. They were painted in full color. (Peabody even commissioned
          a set of paints for this purpose). And the experience of sitting
          around the charts and contemplating the relationships between the
          colored squares was nothing short of transformative. “I have never
          known a system which placed the events of the history of all nations
          before the mind with such clearness, so little confusion, and so much
          permanency,” wrote Eliphalet Nott, then president of Union College.
          But because the “mural charts,” as Peabody termed them, were not
          valued as objects of knowledge in and of themselves, not a single one
          has been preserved.
        </p>
        <p>
          The evidence of their pedagogical power, combined with their absence
          from the archive, is what has prompted me to undertake a project, with
          my lab group, to reimagine Peabody’s missing mural charts for the
          present. By first creating a touch matrix made of strips of copper
          tape, and then overlaying strips of individually addressable LEDs, we
          attempted to amplify the haptic and experiential aspects of Peabody’s
          original method.
        </p>
      </div>
      <div>
        [ GUIDED WALKTHROUGH OF PHYSICAL CHART, LAYERS AND FEATURES ]
      </div>
      <div>
        <p>
          Several students, over the course of several years, have worked with
          me to carefully align each strip of copper tape, and solder (and
          resolder) each of Floor Chart’s connections--and there are hundreds.
          As we performed this work, I found myself thinking back to Peabody’s
          own process of fabrication. For Peabody did not only display her mural
          charts as part of her marketing pitch; as an additional incentive, she
          also promised one to any teacher who purchased copies of the book for
          their entire class. Writing to a friend in 1850, Peabody revealed that
          she was “aching from the fatigue” of making the charts for each
          school.
        </p>
        <blockquote>
          “Just now I am aching from the fatigue of making Charts for the
          Schools who will take the book… Every school must have a mural chart—&
          there is but one way of making them (until they can be made by ten
          thousands) & that is by stencilling [sic]… I can do one a day. But I
          must sell them cheap… To day I worked 15 hours—only sitting down to
          take my meals—& so I have done all week—so much fatigue stupefies
          one—but as soon as it is adopted in a few towns I shall be able to
          hire someone to do this drudgery for me.”
          <br>
          - Elizabeth Peabody, Letter to Samuel Gray Ward, September 1850
        </blockquote>
        <p>
          Here, Peabody describes how she would stencil shapes and colors onto a
          large sheet of paper or cloth, and how a single chart took her 15
          hours. She also discloses the intensity of her desire for her book to
          become profitable, not the least so that she could hire someone to “do
          this drudgery for me.” And while we no longer have access to any of
          the original mural charts, what we do have--in letters like these--is
          evidence both of the actual physical labor, as well as of the
          knowledge work that was involved in producing the charts. What this
          letter helps to underscore, with its reference to the “stecilling,”
          and to the “drudgery,” is how this is labor of a particular form: the
          labor of housework--labor that has, historically, been performed by
          women.
        </p>
        <p>
          It is not a coincidence that Peabody understood the labor of making
          her mural charts as women’s work, and that those same charts were not
          preserved. Women’s work--whether it be housework, education, or
          art-making--has been long undervalued not only in terms of financial
          compensation but also in terms of social prestige. This is among the
          primary reasons why women’s work is far less present in the archives
          that preserve our records of the past--and that serve as the sources
          for the stories we tell in the present. A significant aim of this
          project is to amplify the contributions of the women, and members of
          other minoritized groups, that are otherwise excluded from the
          standard narratives of the history of data visualization, as they are
          from the standard narratives of history more generally. In support of
          this aim, we might apply Peabody’s ideas about the benefits of
          creating new narratives of history to the work of Peabody herself.
        </p>
      </div>
    </Section>
    <Section title="Women’s Work as Knowledge and as Art">
      <p>
        Many contemporary viewers, when seeing Peabody’s charts for the first
        time, observe that they look like paintings by Piet Mondrian, the famous
        Dutch modernist. To be sure, Peabody’s charts strongly resemble
        Mondrian’s own colorful, geometric grid. But Peabody’s self-account of
        the work involved in making the charts as a form of domestic labor
        brings to mind a second point of reference, which is not painting but
        quilting--an artform traditionally practiced by women.
      </p>
      <img/>
      [ IMAGES OF GEE’S BEND QUILTS ]
      <p>
        Pictured above are two quilts from the area of Alabama known as Gee’s
        Bend, a small, rural Black community, 35 miles south of Selma, that can
        trace its roots to a cotton plantation that was established there in the
        early nineteenth century. Gee’s Bend was also the site of a voting drive
        led by Dr. Martin Luther King just weeks before Selma’s Bloody Sunday.
        And it was horses from Gee’s Bend that carried Dr. King’s coffin through
        the streets of Atlanta during his funeral procession a short three years
        after that.
      </p>
      <p>
        But the quilts created by the Women of the Bend are arguably the area’s
        most enduring legacy. While valued by the residents of Gee’s Bend for
        centuries--as well as others from the region who traveled to Gee’s Bend
        to purchase them--the quilts have only recently begun to be recognized
        by art historians as key contributors to the development of modernist
        art. Exhibitions at the Whitney Museum in New York, in 2002; the Turner
        Contemporary in London, in 2019; and others, have confirmed how the
        quilts “predate like-minded works by their more famous abstract art
        cousins,” as
        <a href="https://www.artsy.net/article/artsy-editorial-alabama-women-made-quilts-modern-art">
          art critic Ryan Leahey wrote in 2018</a>. And while the lived
        experiences of the Gee’s Bend quilters--Black women who lived “in the
        wake” of slavery--could not be farther from that of Elizabeth Palmer
        Peabody--a white women born into the Boston elite--their creative work
        can (and has) performs a similar function with respect to the dominant
        narrative of their respective fields. Considering the women of Gee’s
        Bend in relation to Mondrian, as art historians have begun to do; or
        considering Peabody in relation to figures like Playfair, as I propose,
        what becomes clear is how women’s work of all kinds, ranging from
        education to quilting, has much to contribute to larger narratives of
        academic disciplines and professional fields.
      </p>
      <p>
        To an even greater degree, the quilts of Gee’s Bend and the charts of
        Elizabeth Palmer Peabody converge in the systems of knowledge making
        that they represent. Both employ shape and color to represent events in
        the actual world--the quilts in order commemorate and uplift their
        ancestors and their stories; and the charts, as we have learned, to
        encourage creative responses to historical events. What’s more, both
        rely upon sense perception—and more specifically, the tactile
        experiences of the body—in order to assimilate those representations
        into knowledge. The embodied, experiential knowledge produced by the
        quilts, on the one hand; and the mural charts, on the other, resulted in
        a richer, more personal, and therefore more valuable form of knowledge
        than one which the work’s meaning was fixed by its creator. Through a
        comparison to the Gee’s Bend quilts, what emerges is the tri-part lesson
        of Peabody’s visualization scheme: the first about what forms of
        information constitute knowledge; the second about how that knowledge is
        produced; and the third about who is authorized to produce it.
      </p>
    </Section>
    <Section title="Expanding the Archive of Data Visualization">
      <p>
        Today, those who study history and culture are trained to recognize the
        value of alternate forms of knowledge, just as they are trained to look
        for the people, like Peabody, or like the women of Gee’s Bend, who might
        otherwise be viewed as outliers in relation to the dominant stories we
        tend to tell about the past. Theirs are the stories that we often lack
        sufficient evidence in order to tell completely, whether it’s evidence
        in the form of data, or evidence--like the lost mural charts--from the
        archive itself.
      </p>
      <p>
        Here, again, is where Peabody’s method becomes valuable. Because it
        authorizes us as viewers, as scholars, and as students, to color in the
        details of the stories that we can only perceive in the abstract.
        Peabody’s hope, which we might carry into the present, is that we might
        all, when presented with the outlines of history, take it upon ourselves
        to color them in.
      </p>
    </Section>
    <Footnotes>
      <template v-slot:1>
        Polish-American System 3.
        This is footnote #1
      </template>
      <template v-slot:2>
        “A Method of Laying the Foundation of History,” 172
      </template>
    </Footnotes>
    <!--        @hover-start="hoverStart"-->
    <!--        @hover-end="hoverEnd"-->


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
      PeabodyCanvas,
      MapScroller,
      EventSquare,
      Footnotes,
      FootnoteRef: FootnoteReference
    },
    mixins: [Highlightable(".chapter__main")],
    data() {
      return {
        d3: d3, //Makes the library accessible from within the template. (TODO: get rid of this, only access d3 from script)
        staticDatasetId: '1',
        century: 1600,
        scrolled: false,
        scrolledMax: 0,
        mapPos: 0,
        overlayPos: 1.1,
        overlayScroll: {
          scrolled: null,
          progress: null
        },
        actorColors
      };
    },
    computed: {
      peabodyData() {
        return this.$store.getters["dataset/getDatasetById"](this.staticDatasetId);
      },
      peabodyYears() {
        if (Array.isArray(this.peabodyData)) {
          return dataToYears(this.peabodyData);
        }
      },
      peabodyEvents() {
        if (Array.isArray(this.peabodyData)) {
          return this.peabodyData.reduce((yearObj, entry) => {
            let event = {
              event: entry.event,
              actors: entry.actors,
              squares: entry.squares == "full" ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : entry.squares
            };
            if (!yearObj[entry.year]) {
              yearObj[entry.year] = {};
            }
            const existingObj = yearObj[entry.year][event.event];
            if (!existingObj) {
              yearObj[entry.year][event.event] = event;
            } else {
              existingObj.squares = event.squares.concat(existingObj.squares);
              existingObj.actors = [...new Set([...existingObj.actors, ...event.actors])]
            }
            return yearObj;
          }, {})
        }
      },
      overlayCurrYear() {
        return Math.floor(this.overlayPos) + this.century;
      },
      overlayIntroParagraphStyles() {
        const styles = {
          position: 'sticky',
          top: '60px'
        };
        if (this.overlayScroll.scrolled == 1) {
          const scale = d3.scaleLinear()
            .domain([0.25, 0.7])
            .range([0, -350]);
          scale.clamp(true);
          const top = scale(this.overlayScroll.progress);
          if (top) styles.transform = `translateY(${top}px)`;
        } else if (this.overlayScroll.scrolled > 1) {
          styles.opacity = 0;
        }
        return styles;
      },
      overlayEventKeyPos: {
        get() {
          return Math.round(10 * (this.overlayPos - Math.floor(this.overlayPos)));
        },
        set(newVal) {
          this.overlayPos = Number(`${Math.floor(this.overlayPos)}.${newVal}`);
        }
      },
      overlayEventKeyColors() {
        if (this.peabodyYears) {
          const index = Math.floor(this.overlayPos);
          const yearData = this.peabodyYears[index + this.century];
          if (yearData) {
            return yearData.map(squareObj =>
              squareObj ? squareObj.actors.map(actor => actorColors[actor]) : [false]);
          }
        }
      },
    },
    methods: {
      onRecreatedGridHover({year, type, sub}) {
        this.overlayPos = Number(`${year - this.century}.${type}`);
      },
      onOverlayScroll({scrolled, progress}) {
        console.log("got to scroll handler");
        this.overlayScroll.scrolled = scrolled;
        this.overlayScroll.progress = progress;
      },
      ...mapActions("chapters", ["setChapter"]),
    },
    created() {
      this.setChapter({title: "Peabody"});
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
