import api from "../api";
import registeredComponents from "./registered-components";
import {register} from "register-service-worker";
import FootnoteReference from "../components/general/FootnoteReference";
import Section from "../components/chapters/Section";

export default {
  data() {
    return {
      docJson: null,
    }
  },
  props: {
    sectionRegex: {
      type: RegExp,
      default() {
        return /<b>Section:(.+)<\/b>/g
      }
    },
    sectionComponent: {
      type: Object,
      default: () => Section
    },
    sectionTitleProp: {
      type: String,
      default: "title"
    },
    footnoteRefComponent: {
      type: Object,
      default: () => FootnoteReference,
    },
    footnoteRefProp: {
      type: String,
      default: "number"
    },
    components: {
      type: Object,
      default: () => registeredComponents
    },
    docId: String
  },
  render(h) {
    if (!this.docJson) {
      return h("p", "Loading...")
    }

    const map = (arraylike, func) => Array.prototype.map.call(arraylike, func);

    const nodeToVDOM = node => {
      if (node.nodeType == Node.TEXT_NODE) {
        const footnoteMatches = node.data.matchAll(/\[\^(\d+)\]/g);
        const inlineSlotMatches = node.data.matchAll(/\[\^(\d*[a-zA-z]+\d*)\](?:(.+)\[\/\1\])*/g);
        const insertions = [];
        for (let match of footnoteMatches) {
          const number = Number(match[1]);
          insertions.push({
            start: match.index,
            end: match.index + match[0].length,
            insert: h(this.footnoteRefComponent, {props: {[this.footnoteRefProp]: number}})
          })
        }
        for (let match of inlineSlotMatches) {
          const slotName = match[1];
          const inner = match[2];
          const slot = (inner && this.$scopedSlots[slotName]) ? this.$scopedSlots[slotName]({inner}) : this.$slots[slotName];
          if (slot) {
            insertions.push({
              start: match.index,
              end: match.index + match[0].length,
              insert: slot
            })
          }
        }
        if (!insertions.length) return node.data
        const returnArr = [];
        let lastIndex = 0;
        insertions
          .sort((a, b) => a.start - b.start)
          .forEach(({start, end, insert}) => {
            if (lastIndex != start)
              returnArr.push(node.data.slice(lastIndex, start))
            returnArr.push(insert);
            lastIndex = end;
          })
        if (lastIndex != node.data.length)
          returnArr.push(node.data.slice(lastIndex));
        return returnArr;
      }
      const attrs = Object.fromEntries(
        map(node.attributes,
          (({name, value}) => ([name, value]))
        )
      );
      if (node.hasChildNodes) {
        return h(node.tagName, {attrs}, map(node.childNodes, nodeToVDOM));
      }
      return h(node.tagName, {attrs});
    }

    const parseInner = innerData => {
      if (innerData) {
        const dummy = document.createElement("template");
        dummy.innerHTML = innerData;
        return map(dummy.content.childNodes, nodeToVDOM);
      }
    }

    const createFromObj = (obj) => {
      const tag = Object.keys(obj)[0].toLowerCase();
      const data = obj[tag];
      if (tag == "table") {
        if (data.headers.length == 1 && data.rows.length == 0) {
          const slotName = data.headers[0];
          return this.$slots[slotName];
        }
        if (data.headers.length >= 1 && data.headers[0] == "Component") {
          const componentName = data.headers[1];
          if (componentName in this.components) {
            const component = registeredComponents[componentName];
            let props = {};
            data.rows.forEach(([propName, value]) => {
              if (propName in component.props) {
                const constructor = component.props[propName].type || component.props[propName];
                const coerced = constructor();
                props[propName] = coerced;
              }
            })
            return h(component, {
              props
            });
          }
        }
      }
      if (tag == "ol" || tag == "ul") {
        return h(tag, data.map(itemHTML => h("li", {domProps: {innerHTML: itemHTML}})));
      }
      if (tag == "img") {
        const {source, title, alt} = data;
        return h(tag, {attrs: {src: source, title, alt}});
      }
      if (typeof data == "string") {
        return h(tag, parseInner(data));
      }
    }

    if (this.docJson && this.docJson.content) {

      const content = this.docJson.content.filter(obj => obj.p !== "")

      if (this.sectionRegex && this.sectionComponent) {
        const sections = [];
        content.forEach((el, index) => {
          const [key, value] = Object.entries(el)[0];
          if (typeof value == "string") {
            const firstMatch = this.sectionRegex.exec(value);
            if (firstMatch && firstMatch.length >= 1) {
              let pushObj = {index};
              if (firstMatch.length == 2) {
                pushObj.title = firstMatch[1];
              }
              sections.push(pushObj);
            }
          }
        });
        if (sections.length > 0) {
          // if (sections[0].)
          console.log(sections);
          const renderArr = [];
          if (sections[0].index != 0) {
            renderArr.push(...(content.slice(0, sections[0].index).map(createFromObj)));
          }
          renderArr.push(...sections.map(({index, title}, arrIndex) =>
            (
              h(this.sectionComponent, {
                  props: {[this.sectionTitleProp]: title}
                },
                content
                  .slice(index + 1, sections[arrIndex + 1] ? sections[arrIndex + 1].index : content.length)
                  .map(createFromObj)
              )
            )
          ));
          return h('div', renderArr);
        }
      }

      return h('div', content.map(createFromObj))
    }
  },
  created() {
    if (this.docId) {
      api.getDoc(this.docId).then(resp => {
        this.docJson = resp.data;
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
  }
}
