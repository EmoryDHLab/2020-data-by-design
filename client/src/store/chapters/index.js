const VisTypes = {
  IMAGE: 1,
  INTERACTION: 2,
  VISUALIZATION: 3,
}

const Mutations = {
  ADD_SECTION: "ADD_SECTION",
  ADD_HIGHLIGHT: "ADD_HIGHLIGHT",
  REMOVE_HIGHLIGHT: "REMOVE_HIGHLIGHT",
  ADD_VIS: "ADD_VIS",
  SET_TITLE: "SET_TITLE"
}

const findParentSection = (element, sections) => {
  console.log(element);
  const sectionIds = sections.map(section => section.id);
  const possibleIds = sectionIds.filter(id => id);
  if (!possibleIds) return false;
  let curr = element;
  let parent;
  while (curr.parentNode) {
    if (possibleIds.includes(curr.parentNode.id)) {
      parent = curr.parentNode;
      break;
    }
    curr = curr.parentNode;
  }
  if (!parent) {
    return false;
  }
  const section = sectionIds.indexOf(parent.id);
  const subsection = Array.prototype.indexOf.call(parent.children, curr);
  return {section, subsection}
}

const store = {
  state: {
    currChapter: {
      lastUpdated: null,
      title: "",
      sections: [] /*id:String, subsections:n, offsets:[n], highlights:[n], visualizations:[n]*/
    },
    // scrollProgress: 0,
    highlightSpanCount: 0,
    unmatchedVis: []
  },
  getters: {
    currChapterTitle: state => state.currChapter.title,
    currChapterSections: state => state.currChapter.sections,
    lastUpdated: state => state.currChapter.lastUpdated,
    offsets: state =>
      state.currChapter.sections.reduce((obj, section, secIndex) => {
        section.offsets.forEach((offset, subsecIndex) => {
          obj[offset] = { section: secIndex, subsection: subsecIndex };
        });
        return obj;
      }, {}),
    closestPastOffset: (state, getters) => (currOffset) =>
      Object.keys(getters.offsets)
        .filter(offset => offset <= currOffset)
        .sort( (a, b) => b - a)[0]
  },
  mutations: {
    [Mutations.ADD_SECTION] (state, {id}) {
      //Presumes this mutation gets called in section order
      const el = document.getElementById(id);
      const subsections = el.childElementCount;
      const highlights = Array.from({length: subsections}).fill(0);
      const vis = Array.from({length: subsections}).fill(0);
      const offsets = Array.from({length: subsections});
      for (let i = 0; i < subsections; i++) {
        const child = el.children[i];
        if (child.tagName.toUpperCase() === "IMG") {
          vis[i] = VisTypes.IMAGE;
        }
        offsets[i] = child.offsetTop;
      }
      state.unmatchedVis
        .forEach(visEl => {
          const results = findParentSection(visEl, [...state.currChapter.sections, {id}]);
          if (!results || results.section !== state.currChapter.sections.length) return;
          vis[results.subsection] = VisTypes.VISUALIZATION;
        })
      state.currChapter.sections.push ({
        id,
        subsections,
        offsets,
        highlights,
        visualizations: vis
      })
      state.currChapter.lastUpdated = Date.now();
    },
    [Mutations.ADD_HIGHLIGHT] (state, {sectionIndex, subsection}) {
      const section = state.currChapter.sections[sectionIndex];
      if (!section.highlights) {
        section.highlights = [];
        section.highlights[subsection] = 1;
      } else if (section.highlights[subsection]) {
        section.highlights[subsection]++;
      } else {
        section.highlights[subsection] = 1;
      }
      state.currChapter.lastUpdated = Date.now();
    },
    [Mutations.REMOVE_HIGHLIGHT] (state, {sectionIndex, subsection}) {

      state.currChapter.lastUpdated = Date.now();
    },
    [Mutations.ADD_VIS] (state, {element}) {
      state.unmatchedVis.push(element);
      state.currChapter.lastUpdated = Date.now();
      // const section = state.currChapter.sections[sectionIndex];
      // if (!section) return;
      // if (!section.visualizations) {
      //   section.visualizations = [];
      //   section.visualizations[subsection] = 1;
      // } else if (section.visualizations[subsection]) {
      //   section.visualizations[subsection]++;
      // } else {
      //   section.visualizations[subsection] = 1;
      // }
    },
    [Mutations.SET_TITLE] (state, {title}) {
      state.currChapter.title = title;
      state.currChapter.lastUpdated = Date.now();
    }
  },
  actions: {
    setChapter({commit}, {title}) {
      commit(Mutations.SET_TITLE, {title})
    },
    registerSection({commit}, {id}) {
      commit(Mutations.ADD_SECTION, {id})
    },
    registerHighlight({commit, getters}, {id}) {
      const highlightEl = document.getElementById(id);
      let { section, subsection } = findParentSection(highlightEl, getters.currChapterSections);
      if (section == null) {
        console.error("Highlight not in a Section!");
        return false;
      }
      commit(Mutations.ADD_HIGHLIGHT, { sectionIndex: section, subsection})
    },
    registerVisualization({commit, getters}, {element}) {
      if (element) {
        commit(Mutations.ADD_VIS, {element});
      }
      // let { section, subsection } = findParentSection(element, getters.currChapterSections);
      // if (!section) {
      //   console.error("Visualization not in a Section!");
      //   return false;
      // }
      // commit(Mutations.ADD_VIS, { sectionIndex: section, subsection})
    },
    incrementHighlightSpans({state}) {
      state.highlightSpanCount++;
    },
  },
}

export {VisTypes, store as default}
