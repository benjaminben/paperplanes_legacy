(function() {
  var doc = document.documentElement
  doc._data = {}
  doc._activeListeners = []
  doc._registerEventListener = function(type, target, fn) {
    target.addEventListener(type, fn)
    doc._activeListeners.push({type: type, target: target, fn: fn})
  }
  doc._unregisterEventListeners = function() {
    doc._activeListeners.forEach(function(l) {
      l.target.removeEventListener(l.type, l.fn)
    })
  }

  var initTheme = document.body.getAttribute("data-theme") === "dark" ? 1 : 0
  var debugStore = false
  var state = {
    ui: {
      theme: initTheme, // 0 to 1 == black to white == dark to light
      loaded: false,
    },
    nav: {
      theme: initTheme,
      open: false,
      exiting: false,
    },
  }

  doc._store = {
    debug: true,
    state: state,
    actions: {
      ui: {
        setTheme: function(value) {
          if (debugStore) console.log("ui.setTheme triggered with", value)
          state.ui.theme = value
        },
        setLoaded: function() {
          state.ui.loaded = true
        },
      },
      nav: {
        setTheme: function (value) {
          if (debugStore) console.log("nav.setTheme triggered with", value)
          state.nav.theme = value
        },
        setNavOpen: function(value) {
          if (debugStore) console.log("nav.setNavOpen triggered with", value)
          state.nav.open = true
          var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop ]
          doc._data['scroll-position'] = scrollPosition
          doc._data['previous-overflow'] = doc.style.overflow
          doc.style.overflow = 'hidden'
          window.scrollTo(scrollPosition[0], scrollPosition[1])

          this.setTheme(1)
        },
        setNavClosed: function() {
          if (debugStore) console.log("nav.setNavClosed triggered")
          state.nav.exiting = true

          var scrollPosition = doc._data['scroll-position']
          doc.style.overflow = doc._data['previous-overflow']
          window.scrollTo(scrollPosition[0], scrollPosition[1])
          this.setTheme(state.ui.theme)

          return new Promise(function(rs,rj) {
            window.setTimeout(function() {
              state.nav.open = false
              state.nav.exiting = false
              rs()
            }.bind(this), 500)
          }.bind(this))
        },
      }
    },
  }

  window.addEventListener("load", doc._store.actions.ui.setLoaded)
  if (document.readyState === "complete") {
    window.removeEventListener("load", doc._store.actions.ui.setLoaded)
    doc._store.actions.ui.setLoaded()
  }
})()
