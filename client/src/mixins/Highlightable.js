import HighlightContextMenu from "../components/HighlightContextMenu";
import Vue from 'vue';

const highlightClass = "nb-user-highlight";
const overflowNextClass = "nb-overflow-next";
const overflowPrevClass = "nb-overflow-prev";

function Highlightable(rootElementSelector) {
  return {
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
      let el = rootElementSelector ? document.querySelector(rootElementSelector) : this.$el;
      if (!el) {
        console.error("Highlightable mixin doesn't see any HTML element. Be sure to pass in an HTML Element to the Highlightable(element) constructor.");
      } else {
        el.onmouseup = this.onMouseUp;
      }
    },
    methods: {
      log: text => {
        console.log(text);
      },
      onMouseUp(event) {
        if (event.button !== 0 || window.getSelection().rangeCount === 0) {
            return;
        }
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const startParent = range.startContainer.parentNode;  
        const endParent = range.endContainer.parentNode;
        const sameParent = startParent.isEqualNode(endParent);

        const rangeData = this.serializeRange(range);

        if (!(sameParent && startParent.className == highlightClass)) {
          if (range.cloneContents().childElementCount < 2) {
            const highlight = this.createHighlight(range.extractContents());
            if (highlight) {
              highlight.dataset.rangeData = rangeData;
              range.insertNode(highlight);
            }
          } else {
            const contents = range.extractContents();
            const firstSection = this.createHighlight(contents.firstChild.innerHTML);
            firstSection.classList.add(overflowNextClass);
            firstSection.dataset.rangeData = rangeData;
            const lastSection = this.createHighlight(contents.lastChild.innerHTML);
            lastSection.classList.add(overflowPrevClass);
            startParent.appendChild(firstSection);
            endParent.prepend(lastSection);
            if (contents.childElementCount > 2) {
              Array.from(contents.childNodes)
              .slice(1,contents.childNodes.length - 1)
              .forEach(element => {
                const section = this.createHighlight(element);
                section.classList.add(overflowPrevClass, overflowNextClass);
                startParent.after(section);
              });
            }
          }
        }
        selection.removeAllRanges();
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
            if (value.className == highlightClass) {
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
        span.classList.add(highlightClass);
        span.onclick = this.onClick;
  

        //Draggability
        const onDragStart = (event) => {
          console.dir(event.target);
          console.dir(event);
          //We have event.target, which is the element that the user clicked on; let's make sure we get the full highlight span.
          let currEl = event.target;
          while (currEl.parentElement.id !== "app") {
            if (currEl.classList && currEl.classList.contains(highlightClass)) {
                break;
            }
            currEl = currEl.parentElement;
          }
          let metadata, html;
          //Now that we have the full highlight span, let's make sure we get its connected spans in cases where a highlight overflows into consecutive paragraph(s)
          if (currEl.classList.contains(overflowPrevClass) || currEl.classList.contains(overflowNextClass)) {
            //Treating a JavaScript array as a double-sided queue allows us to efficiently traverse above and below the clicked-on element to find the full flow
              let deque = [currEl];
              while (deque[0].classList.contains(overflowPrevClass)) {
                  let prevEl = deque[0].previousElementSibling;
                  if (prevEl == null) {
                    prevEl = deque[0].parentElement.previousElementSibling;
                  }
                  if (prevEl.classList.contains(highlightClass)) {
                      deque.unshift(prevEl);
                  } else if (prevEl.lastElementChild.classList.contains(highlightClass)) {
                      deque.unshift(prevEl.lastElementChild);
                  }
              }
              while (deque[deque.length - 1].classList.contains(overflowNextClass)) {
                let nextEl = deque[deque.length - 1].nextElementSibling;
                if (nextEl == null) {
                  nextEl = deque[deque.length - 1].parentElement.nextElementSibling;
                }
                if (nextEl.classList.contains(highlightClass)) {
                  deque.push(nextEl);
                } else if (nextEl.firstElementChild.classList.contains(highlightClass)) {
                  deque.push(nextEl.firstElementChild);
                }
              }

              metadata = deque[0].dataset.rangeData;
              html = deque
                .map(stripAttributes)
                .map(el => el.outerHTML) //grab the element's html
                .join(' ');
          } else {
            metadata = currEl.dataset.rangeData;
            html = stripAttributes(currEl).outerHTML;
          }
          event.dataTransfer.setData("metadata", metadata);
          event.dataTransfer.setData("text/html", html);
          function stripAttributes (el) {
            Array.from(el.attributes).forEach(attr => el.removeAttribute(attr.name));
            return el;
          }
        }
        span.setAttribute("draggable", "true");
        span.addEventListener("dragstart", onDragStart);
        return span;

      },
      serializeRange(range) {
        const pathToElement = (element) => {
          let parents = []
          let curr = element;
          while (!curr.id && curr !== document.body) {
            let siblingIndex = 0;
            let currSibling = curr.previousElementSibling;
            while (currSibling !== null) {
              siblingIndex++;
              currSibling = currSibling.previousElementSibling;
            }
            parents.unshift(`${curr.nodeName}[${siblingIndex}]`);
            curr = curr.parentElement;
          }
          if (curr.id) parents.unshift("#" + curr.id);
          return parents.join('/');
        }
        let startPath = pathToElement(range.startContainer);
        let endPath = pathToElement(range.endContainer);
        return `${startPath}-${range.startOffset};${endPath}-${range.endOffset}`
      },  
      deserializeRange() {

      }
    }
  }
}
export default Highlightable;
