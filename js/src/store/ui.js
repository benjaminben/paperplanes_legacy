const initTheme = document.body.getAttribute("data-theme") === "dark" ? 1 : 0
const initSlug = document.body.getAttribute("data-slug")

const m = {
  namespaced: true,
  state: {
    activeListeners: [], // TEMP: Should be objects
    activeObservers: [],
    theme: initTheme, // 0 to 1 == black to white == dark to light
    loaded: false,
    runIntro: initSlug === "home",
    trans: false,
    scrollPosition: [0,0],
    previousOverflow: "",
  },
  mutations: {
    activeListeners(state, value) {
      state.activeListeners = value
    },
    activeObservers(state, value) {
      state.activeObservers = value
    },
    theme(state, value) {
      state.theme = value
    },
    loaded(state, value) {
      state.loaded = value
    },
    runIntro(state, value) {
      state.runIntro = value
    },
    trans(state, value) {
      state.trans = value
    },
    scrollPosition(state, value) {
      state.scrollPosition = value
    },
    previousOverflow(state, value) {
      state.previousOverflow = value
    },
  },
  actions: {
    registerEventListener(context, o) {
      const {target, type, fn} = o
      target.addEventListener(type, fn)
      const l = context.state.activeListeners.concat([{type, target, fn}])
      context.commit("activeListeners", l)
    },
    unregisterEventListeners(context) {
      context.state.activeListeners.forEach(l => {
        l.target.removeEventListener(l.type, l.fn)
      })
      context.commit("activeListeners", [])
    },
    registerObserver(context, config) {
      const options = {
        rootMargin: "0px",
        threshold: 1.0,
        ...config.options
      }
      const callback = config.callback || function(entries, observer) {
        console.log("OOPS: Did you forget to pass an observer callback?")
      }
      const observer = new IntersectionObserver(callback, options)
      Array.from(config.nodes).forEach(function(n,i,a) {observer.observe(n)})

      const o = context.state.activeObservers.concat([observer])
      context.commit("activeObservers", o)
    },
    unregisterObservers(context) {
      context.state.activeObservers.forEach(function(io) {
        io.disconnect()
      })
      context.commit("activeObservers", [])
    },
    setScrollPosition(context, a) {
      context.commit("scrollPosition", a)
    },
    setPreviousOverflow(context, v) {
      context.commit("previousOverflow", v)
    },
    lockScroll(context, position) {
      position = position || [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop ]
      context.commit("scrollPosition", position)
      context.commit("previousOverflow", document.documentElement.style.overflow)
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo(position[0], position[1])
    },
    unlockScroll(context) {
      const {scrollPosition, previousOverflow} = context.state
      document.documentElement.style.overflow = previousOverflow
      window.scrollTo(scrollPosition[0], scrollPosition[1])
    },
    clearIntro(context) {
      context.commit("runIntro", false)
    },
    setLoaded(context) {
      context.commit("loaded", true)
    },
    setTheme(context, value) {
      context.commit("theme", value)
    }
  },
}

export default m
