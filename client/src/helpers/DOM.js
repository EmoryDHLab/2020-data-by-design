const getBox = (el) => {
  const offsets = { x: window.scrollX, y: window.scrollY }
  const {top, left, bottom, right} = el.getBoundingClientRect();
  return {
    top: top + offsets.y,
    bottom: bottom + offsets.y,
    right: right + offsets.x,
    left: left + offsets.x,
  }
}

const getPosition = (el) => {
  var { top, left } = getBox(el);
  return { x: left, y: top }
}

const getY = (el) => {
  return getPosition(el).y;
}

export default {
  getPosition,
  getBox,
  getY
}
