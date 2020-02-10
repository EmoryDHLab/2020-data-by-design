import HighlightContextMenu from "../components/HighlightContextMenu";
import Vue from 'vue';

const Highlightable = {
  created: function() {
    this.log("testing!");
  },
  data: function () {
    return {
      clicked: false,
      contextMenu: null
    }
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
      }
    };
  },
  methods: {
    log: text => {
      console.log(text);
    },
    onClick(event) {
      if (!this.clicked) {
        const componentClass = Vue.extend(HighlightContextMenu); 
        const instance = new componentClass();
        instance.$mount();
        event.target.appendChild(instance.$el);
        this.contextMenu = instance;
        this.clicked = true;
      }
    },
    onMouseOut() {
      if (this.contextMenu) {
        
      }
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
      span.onclick = this.onClick;
      return span;
    }
  }
};
export default Highlightable;
