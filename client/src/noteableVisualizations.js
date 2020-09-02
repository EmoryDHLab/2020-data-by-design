import PeabodyGrid from "./components/vis/peabody/newpeabodygrid/PeabodyGrid";
import PeabodyMutable from "./components/vis/peabody/PeabodyMutable";
import MapScroller from "./components/scrollytelling/MapScroller";
import PeabodyQuiz from "./components/vis/peabody/quiz/PeabodyQuiz";

const registered = {
  "PeabodyGrid": PeabodyGrid,
  "PeabodyMutable": PeabodyMutable,
  "MapScroller": MapScroller,
  PeabodyQuiz
}

export default registered;
