;
if (!this.enabled) {
  return
}
if (this.callback) {
  this.callback.apply(this, args)
}
}

/* Public */
/* http://imakewebthings.com/waypoints/api/destroy */
Waypoint.prototype.destroy = function() {
  this.context.remove(this)
  this.group.remove(this)
  delete allWaypoints[this.key]
}

/* Public */
/* http://imakewebthings.com/waypoints/api/disable */
Waypoint.prototype.disable = function() {
  this.enabled = false
  return this
}

/* Public */
/* http://imakewebthings.com/waypoints/api/enable */
Waypoint.prototype.enable = function() {
  this.context.refresh()
  this.enabled = true
  return this
}

/* Public */
/* http://imakewebthings.com/waypoints/api/next */
Waypoint.prototype.next = function() {
  return this.group.next(this)
}

/* Public */
/* http://imakewebthings.com/waypoints/api/previous */
Waypoint.prototype.previous = function() {
  return this.group.previous(this)
}

/* Private */
Waypoint.invokeAll = function(method) {
  var allWaypointsArray = []
  for (var waypointKey in allWaypoints) {
    allWaypointsArray.push(allWaypoints[waypointKey])
  }
  for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
    allWaypointsArray[i][method]()
  }
}

/* Public */
/* http://imakewebthings.com/waypoints/api/destroy-all */
Waypoint.destroyAll = function() {
  Waypoint.invokeAll('destroy')
}

/* Public */
/* http://imakewebthings.com/waypoints/api/disable-all */
Waypoint.disableAll = function() {
  Waypoint.invokeAll('disable')
}

/* Public */
/* http://imakewebthings.com/waypoints/api/enable-all */
Waypoint.enableAll = function() {
  Waypoint.Context.refreshAll()
  for (var waypointKey in allWaypoints) {
    allWaypoints[waypointKey].enabled = true
  }
  return this
}

/* Public */
/* http://imakewebthings.com/waypoints/api/refresh-all */
Waypoint.refreshAll = function() {
  Waypoint.Context.refreshAll()
}

/* Public */
/* http://imakewebthings.com/waypoints/api/viewport-height */
Waypoint.viewportHeight = function() {
  return window.innerHeight || document.documentElement.clientHeight
}

/* Public */
/* http://imakewebthings.com/waypoints/api/viewport-width */
Waypoint.viewportWidth = function() {
  return document.documentElement.clientWidth
}

Waypoint.adapters = []

Waypoint.defaults = {
  context: window,
  continuous: true,
  enabled: true,
  group: 'default',
  horizontal: false,
  offset: 0
}

Waypoint.offsetAliases = {
  'bottom-in-view': function() {
    return this.context.innerHeight() - this.adapter.outerHeight()
  },
  'right-in-view': function() {
    return this.context.innerWidth() - this.adapter.outerWidth()
  }
}

window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1
    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true
      Waypoint.windowContext = new Context(window)
    }

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    var isWindow = this.element == this.element.window
    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var
