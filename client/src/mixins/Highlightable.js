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
      if (e.button !== 0 || window.getSelection().length === 0) {
          return;
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startParent = range.startContainer.parentNode;

      const endParent = range.endContainer.parentNode;
      const sameParent = startParent.isEqualNode(endParent);
      if (!(sameParent && startParent.className == "user-highlight")) {
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
      selection.removeAllRanges();
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
        document.body.appendChild(instance.$el);
        this.contextMenu = instance;
        this.clicked = true;
      }
      this.contextMenu.$el.style.display = 'block';
      this.contextMenu.$el.style.left = event.clientX + "px";
      this.contextMenu.$el.style.top = event.target.offsetTop + event.target.offsetHeight
        + this.contextMenu.$el.offsetHeight + 4 + "px";
      console.dir(event);

    },
    // onMouseLeave(e) {
    //   console.dir(e)
    //   if (this.contextMenu) {
    //     this.contextMenu.$el.parentNode.removeChild(this.contextMenu.$el);
    //     this.contextMenu.$destroy();
    //     this.contextMenu = null;
    //   }
    // },
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
      //Draggability
      const onDragStart = (event) => {
        console.dir(event.target);
        console.dir(event);
        //We have event.target, which is the element that the user clicked on; let's make sure we get the full highlight span.
        let currEl = event.target;
        while (currEl.parentElement.id !== "app") {
          if (currEl.classList && currEl.classList.contains("user-highlight")) {
              break;
          }
          currEl = currEl.parentElement;
        }
        event.dataTransfer.setData("metadata", "metadata/serialization info goes here");
        event.dataTransfer.setData("text/html", currEl.innerHTML);
      }
      span.setAttribute("draggable", "true");
      span.addEventListener("dragstart", onDragStart);
      return span;
    }
  }
};
export default Highlightable;
