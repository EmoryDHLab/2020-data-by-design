import HighlightContextMenu from "../components/HighlightContextMenu";
import Vue from 'vue';
import { mapGetters } from 'vuex'

const highlightClass = "nb-user-highlight";
const overflowNextClass = "nb-overflow-next";
const overflowPrevClass = "nb-overflow-prev";

function Highlightable(rootElementSelector) {
  return {
    created: function() {
      this.log("Highlightable Mixin Initialized");
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
    computed: {
      ...mapGetters(["isLoggedIn"])
    },
    watch: {
      isLoggedIn (isLoggedIn) {
        if (isLoggedIn) {
          const notebook = this.$store.getters.notebook;
          notebook.map(obj => obj.metadata)
                  .filter(metadata => !metadata.startsWith("usernote"))
                  .map(metadata => this.deserializeRange(metadata))
                  .forEach(this.createHighlightFromRange);
        } else {
          this.removeAllHighlights();
        }
      }
    },
    methods: {
      log: text => {
        console.log(text);
      },
      onMouseUp(event) {
        if (event.button !== 0) {
            return;
        }
        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
          return;
        }
        const range = selection.getRangeAt(0);
        console.dir(range);
        if (range.startContainer === range.endContainer && range.startOffset === range.endOffset) {
          return;
        }
        this.createHighlightFromRange(range);
        selection.removeAllRanges();
      },
      onClick(event) {
        if (!this.clicked) {
          const componentClass = Vue.extend(HighlightContextMenu);
          const instance = new componentClass();
          instance.$mount();
          instance.$on('removeClicked', () => this.removeHighlightSpan(this.clicked));
          document.body.appendChild(instance.$el);
          this.contextMenu = instance;
        }
        this.clicked = event.target;
        let totalHeight = event.target.offsetTop + event.target.offsetHeight;
        let curr = event.target;
        while (curr.offsetParent) {
          curr = curr.offsetParent;
          totalHeight += curr.offsetTop;
        }
        const element = this.contextMenu.$el;
        element.style.display = 'block';
        element.style.left = event.clientX + "px";
        element.style.top = totalHeight + "px";
      },
      createHighlightFromRange(range) {
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
      },
      removeAllHighlights() {
        console.log("Got here");
        document.querySelectorAll(`.${highlightClass}`).forEach(this.removeHighlightSpan);
      },
      removeHighlightSpan (span) {
        const prevSibling = span.prevSibling;
        const nextSibling = span.nextSibling;
        const firstChild = span.firstChild;
        const lastChild = span.lastChild;

        const tag = elem => elem.outerHTML.slice(0, elem.outerHTML.indexOf(elem.innerHTML));

        if (prevSibling && firstChild
          && prevSibling.nodeType === Node.ELEMENT_NODE 
          && firstChild.nodeType === Node.ELEMENT_NODE 
          && tag(prevSibling) === tag(firstChild)) {
            prevSibling.innerHTML += firstChild.innerHTML;
            firstChild.remove();
        }

        if (nextSibling && lastChild
          && nextSibling.nodeType === Node.ELEMENT_NODE 
          && lastChild.nodeType === Node.ELEMENT_NODE 
          && tag(nextSibling) === tag(lastChild)) {
            nextSibling.innerHTML = lastChild.innerHTML + nextSibling.innerHTML;
            lastChild.remove();
        }
        
        span.outerHTML = span.innerHTML;
      },
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
          //We have event.target, which is the element that the user clicked on; let's make sure we get the full highlight span.
          // let currEl = event.target;
          // while (currEl.parentElement.id !== "app") {
          //   if (currEl.classList && currEl.classList.contains(highlightClass)) {
          //       break;
          //   }
          //   currEl = currEl.parentElement;
          // }
          let currEl = span;
          let metadata, html;
          //Let's make sure we get its connected spans in cases where a highlight overflows into consecutive paragraph(s)
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
                .map(strippedAttributes)
                .map(el => el.outerHTML) //grab the element's html
                .join(' ');
          } else {
            metadata = currEl.dataset.rangeData;
            html = strippedAttributes(currEl).outerHTML;
          }
          event.dataTransfer.setData("metadata", metadata);
          event.dataTransfer.setData("text/html", html);
          function strippedAttributes (el) {
            const clone = el.cloneNode(true);
            Array.from(clone.attributes).forEach(attr => clone.removeAttribute(attr.name));
            return clone;
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
            let currSibling = curr.previousSibling;
            while (currSibling !== null) {
              siblingIndex++;
              currSibling = currSibling.previousSibling;
            }
            parents.unshift(`${curr.nodeName}[${siblingIndex}]`);
            curr = curr.parentNode;
          }
          if (curr.id) parents.unshift("#" + curr.id);
          return parents.join('/');
        }
        let startPath = pathToElement(range.startContainer);
        let endPath = pathToElement(range.endContainer);
        console.log(`${startPath}-${range.startOffset};${endPath}-${range.endOffset}`);
        return `${startPath}-${range.startOffset};${endPath}-${range.endOffset}`
      },
      deserializeRange(string) {
          const startEnd = string.split(';');
          const startPath = startEnd[0].split(/\/|-/g);
          const endPath =   startEnd[1].split(/\/|-/g);
          const startOffset = startPath.pop();
          const endOffset = endPath.pop();

          const pathToNode = path =>
            path.slice(1).reduce((prev, curr) => {
              const split = curr.split(/\[|\]/g);
              const name = split[0];
              const index = split[1];
              const child = prev.childNodes[index];
              if (!child) {
                console.log("ERROR HERE");
                console.log(prev);
                console.log(prev.childNodes)
                console.log(curr);
              }
              if (child.nodeName.toUpperCase() !== name.toUpperCase()) {
                console.log(curr);
                console.dir(prev);
                console.warn(`Element ${curr} has changed since the last highlight`);
              }
              return child;
            }, document.querySelector(path[0]))

          const range = new Range();
          range.setStart(pathToNode(startPath), startOffset);
          range.setEnd(pathToNode(endPath), endOffset);
          return range;
      }
    }
  }
}
export default Highlightable;
