const actions = {
  ui: {
    registerEventListener: function(type, target, fn) {
      target.addEventListener(type, fn)
      state.private.activeListeners.push({type: type, target: target, fn: fn})
    },
    unregisterEventListeners: function() {
      state.private.activeListeners.forEach(function(l) {
        l.target.removeEventListener(l.type, l.fn)
      })
    },
    registerObserver: function(nodes, options, callback) {
      options = options || {
        rootMargin: "0px",
        threshold: 1.0,
      }
      callback = callback || function(entries, observer) {
        console.log("OOPS: Did you forget to pass an observer callback?")
      }
      var observer = new IntersectionObserver(callback, options)
      Array.from(nodes).forEach(function(n,i,a) {observer.observe(n)})
      state.private.activeObservers.push(observer)
    },
    unregisterObservers: function() {
      state.private.activeObservers.forEach(function(io) {
        io.disconnect()
      })
      state.private.activeObservers = []
    },
    setTheme: (context, value) => {
      if (debug) console.log("ui.setTheme triggered with", value)
      context.commit("theme", value)
    },
    setLoaded: (context) => {
      if (debug) console.log("ui.setLogo triggered")
      context.commit("loaded")
    },
    clearIntro: (context) => {
      if (debug) console.log("ui.clearIntro triggered")
      context.commit("runIntro", false)
    },
    setTrans: function(value) {
      if (debug) console.log("ui.setTrans triggered", value)
      context.commit("trans", value)
    },
    setScrollPosition: function(a) {
      state.ui["scroll-position"] = a
    },
    setPreviousOverflow: function(v) {
      state.ui["previous-overflow"] = v
    },
    lockScroll: function() {
      if (debug) console.log("ui.lockScroll triggered")
      var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop ]
      actions.ui.setScrollPosition(scrollPosition)
      actions.ui.setPreviousOverflow(doc.style.overflow)
      doc.style.overflow = 'hidden'
      window.scrollTo(scrollPosition[0], scrollPosition[1])
    },
    unlockScroll: function() {
      if (debug) console.log("ui.unlockScroll triggered")
      var scrollPosition = state.ui['scroll-position']
      doc.style.overflow = state.ui['previous-overflow']
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
      actions.ui.lockScroll()
      this.setTheme(1)
    },
    setNavClosed: function() {
      if (debug) console.log("nav.setNavClosed triggered")
      state.nav.exiting = true
      actions.ui.unlockScroll()
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
}

export default const
