import api from "../api";
import registeredComponents from "./registered-components";
import {register} from "register-service-worker";

export default {
  data () {
    return {
      docJson: null,
    }
  },
  props: {
    sectionRegex: {
      type: RegExp,
      default () {
        return /<b>Section:(.+)<\/b>/g
      }
    },
    sectionComponent: {
      type: Object
    },
    sectionTitleProp: {
      type: String,
      default: "title"
    },
    footnoteRefComponent: {
      type: Object
    },
    footnoteRefProp: {
      type: String,
      default: "number"
    },
    components: {
      type: Object,
      default () {
        return registeredComponents;
      }
    },
    docId: String
  },
  render (h) {
    if (!this.docJson) {
      return h("p", "Loading...")
    }

    const parseInner = innerData => {
      if (innerData) {
        const dummy = document.createElement("template");
        dummy.innerHTML = innerData;
        const map = (arraylike, func) => Array.prototype.map.call(arraylike, func);
        const nodeToVDOM = node => {
          if (node.nodeType == Node.TEXT_NODE) {
            //Footnotes and inline components checking goes here
            return node.data;
          }
          const attrs = Object.fromEntries(
            map(node.attributes,
              (({name, value}) => ([name, value]))
            )
          );
          if (node.hasChildNodes) {
            return h(node.tagName, { attrs }, map(node.childNodes, nodeToVDOM));
          }
          return h(node.tagName, { attrs });
        }
        return map(dummy.content.childNodes, nodeToVDOM);
      }
    }

    const createFromObj = (obj) => {
      const tag = Object.keys(obj)[0].toLowerCase();
      const data = obj[tag];
      if (tag == "table") {
        if (data.headers.length == 1 && data.rows.length == 0) {
          const slotName = data.headers[0];
          return h('div', this.$slots[slotName]);
        }
        if (data.headers.length >= 1 && data.headers[0] == "Component") {
          debugger;
          const componentName = data.headers[1];
          if (componentName in this.components) {
            const component = registeredComponents[componentName];
            let props = {};
            data.rows.forEach( ([propName, value]) => {
              if (propName in component.props) {
                const typeFunc = component.props[propName].type || component.props[propName];
                const coerced = typeFunc();
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

      const content = this.docJson.content;

      if (this.sectionRegex && this.sectionComponent) {
        const sections = [];
        content.forEach( (el, index) => {
          const [key, value] = Object.entries(el)[0];
          if (typeof value == "string") {
            const firstMatch = this.sectionRegex.exec(value);
            if (firstMatch && firstMatch.length >= 1) {
              let pushObj = { index };
              if (firstMatch.length == 2) {
                pushObj.title = firstMatch[1];
              }
              sections.push(pushObj);
            }
          }
        });
        if (sections.length > 0) {
         return h('div',
           sections.map( ({index, title}, arrIndex)  =>
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
  }
}
