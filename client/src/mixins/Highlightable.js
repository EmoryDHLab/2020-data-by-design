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
      const startParent = range.startContainer.parentNode;
      const endParent = range.endContainer.parentNode;
      const sameParent = startParent.isEqualNode(endParent);
      console.log("Common Ansestor")
      if (sameParent && startParent.className == "user-highlight") {
    
      } else {
        range.insertNode(this.createHighlight(range.extractContents()));      
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
      span.childNodes.forEach( (value, key) => {
        if (value.className == "user-highlight") {
          value.replaceWith(value.innerHTML);
        }
      });
      return span;
    }

  }
}
export default Highlightable;