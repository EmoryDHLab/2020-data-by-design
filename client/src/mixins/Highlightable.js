import { select } from "d3";

const Highlightable = {
  created: function() {
    this.log("testing!");
  },
   mounted: function() {
    if (!this.$el) {
      console.error("Highlightable mixin doesn't see any HTML element");
    }
    this.$el.onmouseup = (e) => { 
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      console.dir(selection)
      console.dir(selection.toString())
      console.log(range);
      console.log(range.getBoundingClientRect());
      console.log(range.startContainer.parentElement.innerHTML);
      range.insertNode(this.createHighlight(range.extractContents()));
      // const selection = window.getSelection();
      // const anchorHTML = selection.anchorNode.parentElement.innerHTML;
      // const openTag = "<mark>"
      // const closeTag = "</mark>"
      // const realLength = 
      // const newAnchorHTML = anchorHTML.slice(0,selection.anchorOffset) + openTag +
      // anchorHTML.slice(selection.anchorOffset, selection.focusOffset) + closeTag +
      // anchorHTML.slice(selection.focusOffset);
      // selection.anchorNode.parentElement.innerHTML = newAnchorHTML;
    }
  },
  methods: {
    log: (text) => {
      console.log(text);
    },
    createHighlight (contents) {
      const span = document.createElement("span");
      span.appendChild(contents);
      span.style.backgroundColor = "yellow";
      span.className = "user-highlight";
      console.dir(span);
      console.log(span.childNodes);
      for (let i = 0; i < span.childNodes.length; i++) {
        console.log(span.childNodes[i]);
        if (span.childNodes[i].className == "user-highlight") {
          span.childNodes[i].replaceWith(span.childNodes[i].textContent);
        }
      }
      return span;
    }

  }
}
export default Highlightable;