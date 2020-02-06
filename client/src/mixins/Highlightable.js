import { select, create } from "d3";

const Highlightable = {
  created: function() {
    this.log("testing!");
  },
  mounted: function() {
    if (!this.$el) {
      console.error("Highlightable mixin doesn't see any HTML element");
    }
    this.$el.onmouseup = e => {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startParent = range.startContainer.parentNode;

      const endParent = range.endContainer.parentNode;
      const sameParent = startParent.isEqualNode(endParent);
      if (sameParent && startParent.className == "user-highlight") {
      } else {
        console.log("count: " + range.cloneContents().childElementCount)
        if (range.cloneContents().childElementCount < 2) {
          const highlight = this.createHighlight(range.extractContents());
          if (highlight) {  
            range.insertNode(highlight);
          }
        } else {
          const contents = range.extractContents();
          startParent.appendChild(this.createHighlight(contents.firstChild.innerHTML));
          endParent.prepend(this.createHighlight(contents.lastChild.innerHTML));
          if (contents.childElementCount > 2) {
            Array.from(contents.childNodes)
            .slice(1,contents.childNodes.length - 1)
            .forEach(element => {
              startParent.after(this.createHighlight(element));
            });
          }
        }
          // range.extractContents();
          
          // 1. Extract contents, delete all highlighted content.
          // 2.
        //   contents.childNodes.forEach(node => {
        //     //const fragment = document.createDocumentFragment();
        //     //node.childNodes.forEach((n) => fragment.appendChild(n));
        //     const highlightSpan = this.createHighlight(node);
        //     console.log("highlight span");
        //     console.dir(highlightSpan);
        //     range.insertNode(highlightSpan);
        //     console.log("New Node, after replacement:")
        //     console.dir(node);
        //  });
      }

      // const selection = window.getSelection();
      // const anchorHTML = selection.anchorNode.parentElement.innerHTML;
      // const openTag = "<mark>"
      // const closeTag = "</mark>"
      // const realLength =
      // const newAnchorHTML = anchorHTML.slice(0,selection.anchorOffset) + openTag +
      // anchorHTML.slice(selection.anchorOffset, selection.focusOffset) + closeTag +
      // anchorHTML.slice(selection.focusOffset);
      // selection.anchorNode.parentElement.innerHTML = newAnchorHTML;
    };
  },
  methods: {
    log: text => {
      console.log(text);
    },
    createHighlight(contents) {
        const span = this.createHighlightSpan(contents);
        span.childNodes.forEach((value, key) => {
          if (value.className == "user-highlight") {
            value.replaceWith(value.innerHTML);
          }
        });
        return span;
    },
    createHighlightSpan(contents) {
      if (!contents) {
        return;
      }
      let span = document.createElement("span");
      if (typeof contents === 'string') {
        span.innerHTML = contents;
      } else if (contents instanceof DocumentFragment) {
          span.appendChild(contents);
      } else if (contents.style) {
        span = contents;
      } else {
        return null;
      }
      span.style.backgroundColor = "yellow";
      span.classList.add("user-highlight");
      return span;
    }
  }
};
export default Highlightable;
