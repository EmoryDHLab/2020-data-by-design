export default {
  state () {
    return {
      footnotes: {
        updated: 0,
      }
    }
  },
  mutations: {
    amendFootnote (state, {index, refId, contentId, html}) {
      if (!state.footnotes[index]) {
        state.footnotes[index] = {};
      }
      if (refId) {
        state.footnotes[index].refId = refId;
      }
      if (contentId) {
        state.footnotes[index].contentId = contentId;
      }
      if (html !== null) {
        state.footnotes[index].html = html;
      }
      state.footnotes.updated = Date.now();
    }
  },
  actions: {
    registerFootnoteContent ({commit}, {index, contentId, html}) {
      if (index !== null && contentId && html !== null) {
        commit('amendFootnote', {index, contentId, html});
        return;
      }
      return console.error("Payload must have integer index and string html");
    },
    registerFootnoteRef ({commit}, {index, refId}) {
      if (index !== null && refId) {
        commit("amendFootnote", {index, refId});
        return;
      }
      return console.error("Payload must have integer index and string id");
    }
  },

}
