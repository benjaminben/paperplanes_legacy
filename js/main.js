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
  var initSlug = document.body.getAttribute("data-slug")
  var debug = false
  var state = {
    ui: {
      theme: initTheme, // 0 to 1 == black to white == dark to light
      loaded: false,
      runIntro: initSlug === "home",
      trans: false,
    },
    nav: {
      theme: initTheme,
      slug: initSlug,
      open: false,
      exiting: false,
      escape: null,
      trans: false,
    },
    work: {
      gridStyle: {
        gridTemplateColumns: "1fr 1fr 1fr"
      },
      filter: null,
      filterOpen: false,
      scroll: [0,0],
    }
  }

  doc._store = {
    state: state,
    actions: {
      ui: {
        setTheme: function(value) {
          if (debug) console.log("ui.setTheme triggered with", value)
          state.ui.theme = value
        },
        setLoaded: function() {
          if (debug) console.log("ui.setLogo triggered")
          state.ui.loaded = true
        },
        clearIntro: function() {
          if (debug) console.log("ui.clearIntro triggered")
          state.ui.runIntro = false
        },
        setTrans: function(value) {
          if (debug) console.log("ui.setTrans triggered", value)
          state.ui.trans = value
          state.nav.trans = value
        },
        lockScroll: function() {
          if (debug) console.log("ui.lockScroll triggered")
          var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop ]
          doc._data['scroll-position'] = scrollPosition
          doc._data['previous-overflow'] = doc.style.overflow
          doc.style.overflow = 'hidden'
          window.scrollTo(scrollPosition[0], scrollPosition[1])
        },
        unlockScroll: function() {
          if (debug) console.log("ui.unlockScroll triggered")
          var scrollPosition = doc._data['scroll-position']
          doc.style.overflow = doc._data['previous-overflow']
          window.scrollTo(scrollPosition[0], scrollPosition[1])
        },
      },
      work: {
        setCols: function(value) {
          if (debug) console.log("work.setCols triggered with:", value)
          state.work.gridStyle.gridTemplateColumns = value
        },
        setFilter: function(value) {
          if (debug) console.log("work.setFilter triggered with:", value)
          state.work.filter = value
        },
        setFilterOpen: function(value) {
          if (debug) console.log("work.setFilterOpen triggered with:", value)
          state.work.filterOpen = value
        },
        setScroll: function(value) {
          if (debug) console.log("work.setScroll triggered with:", value)
          state.work.scroll = value
        },
      },
      nav: {
        setEscape: function(value) {
          if (debug) console.log("nav.setEscape triggered with", value)
          state.nav.escape = value
        },
        setTheme: function (value) {
          if (debug) console.log("nav.setTheme triggered with", value)
          state.nav.theme = value
        },
        setSlug: function (value) {
          if (debug) console.log("nav.setSlug triggered with", value)
          state.nav.slug = value
        },
        setNavOpen: function(value) {
          if (debug) console.log("nav.setNavOpen triggered with", value)
          state.nav.open = true
          doc._store.actions.ui.lockScroll()
          this.setTheme(1)
        },
        setNavClosed: function() {
          if (debug) console.log("nav.setNavClosed triggered")
          state.nav.exiting = true
          doc._store.actions.ui.unlockScroll()
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
})()
