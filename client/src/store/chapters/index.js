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
  ADD_SCROLLYTELL: "ADD_SCROLLYTELL",
  SET_TITLE: "SET_TITLE",
  SCROLL_TO: "SCROLL_TO"
}

function filteredChildren (element) {
  const exclude = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  return Array.from(element.children).filter(el => !exclude.includes(el.tagName.toUpperCase()))
}

function findParentSection (element, sections) {
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
  const subsection = Array.prototype.indexOf.call(filteredChildren(parent), curr);
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
    scrollTo: 0,
    highlightSpanCount: 0,
    unmatchedVis: [],
    unmatchedScrolly: []
  },
  getters: {
    currChapterTitle: state => state.currChapter.title,
    currChapterSections: state => state.currChapter.sections,
    lastUpdated: state => state.currChapter.lastUpdated,
    offsets: state => {
      /*Register dependency:*/ state.currChapter.lastUpdated;
      return state.currChapter.sections.reduce((obj, section, secIndex) => {
        section.offsets.forEach((offset, subsecIndex) => {
          obj[offset] = { section: secIndex, subsection: subsecIndex };
        });
        return obj;
      }, {})
    },
    closestPastOffset: (state, getters) => (currOffset) =>
      Object.keys(getters.offsets)
        .filter(offset => offset <= currOffset)
        .sort( (a, b) => b - a)[0]
  },
  mutations: {
    [Mutations.ADD_SECTION] (state, {id}) {
      //Presumes this mutation gets called in section order
      const el = document.getElementById(id);
      const children = filteredChildren(el);
      const subsections = children.length;
      const highlights = Array.from({length: subsections}).fill(0);
      const vis = Array.from({length: subsections}).fill(0);
      const offsets = Array.from({length: subsections});

      window.addEventListener('load', event => {
        for (let i = 0; i < subsections; i++) {
          const child = children[i];
          let top = child.offsetTop;
          let curr = child.offsetParent;
          while (curr) {
            top += curr.offsetTop;
            curr = curr.offsetParent;
          }
          offsets[i] = top;
          state.currChapter.lastUpdated = Date.now();
        }
      })
      for (let i = 0; i < subsections; i++) {
        const child = children[i];
        if (child.tagName.toUpperCase() === "IMG") {
          vis[i] = VisTypes.IMAGE;
        }
      }
      const setVisType = visType => visEl => {
        const results = findParentSection(visEl, [...state.currChapter.sections, {id}]);
        if (!results || results.section !== state.currChapter.sections.length) return;
        vis[results.subsection] = visType;
      }

      state.unmatchedVis.forEach(setVisType(VisTypes.VISUALIZATION));
      state.unmatchedScrolly.forEach(setVisType(VisTypes.INTERACTION));

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
    },
    [Mutations.ADD_SCROLLYTELL] (state, {element}) {
      state.unmatchedScrolly.push(element);
      state.currChapter.lastUpdated = Date.now();
    },
    [Mutations.SET_TITLE] (state, {title}) {
      state.currChapter.title = title;
      state.currChapter.lastUpdated = Date.now();
    },
    [Mutations.SCROLL_TO] (state, {offset}) {
      state.scrollTo = offset;
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
    registerVisualization({commit}, {element}) {
      if (element) {
        commit(Mutations.ADD_VIS, {element});
      }
    },
    registerScrollytell({commit}, {element}) {
      if (element) {
        commit(Mutations.ADD_SCROLLYTELL, {element});
      }
    },
    incrementHighlightSpans({state}) {
      state.highlightSpanCount++;
    },
    scrollTo({commit, getters}, {section, subsection}) {
      const offset = getters.currChapterSections[section].offsets[subsection];
      commit(Mutations.SCROLL_TO, { offset });
    }
  },
}

export {VisTypes, store as default}
