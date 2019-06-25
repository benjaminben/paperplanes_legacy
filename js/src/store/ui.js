const initTheme = document.body.getAttribute("data-theme") === "dark" ? 1 : 0
const initSlug = document.body.getAttribute("data-slug")

const m = {
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
    theme(state, value) => {
      state.theme = value
    },
    loaded(state) => {
      state.loaded = true
    },
    runIntro(state, value) => {
      state.runIntro = value
    },
    trans(state, value) => {
      state.trans = value
    },
    scrollPosition(state, value) => {
      state.scrollPosition = value
    },
    previousOverflow(state, value) => {
      state.previousOverflow = value
    },
  },
  actions: {
    registerEventListener(context, o) {
      target.addEventListener(o.type, o.fn)
      const l = state.activeListeners.concat([{type, target, fn}])
      context.commit("activeListeners", l)
    },
    unregisterEventListeners(context) {
      context.activeListeners.forEach(l => {
        l.target.removeEventListener(l.type, l.fn)
      })
      context.commit("activeListeners", [])
    },
    registerObserver(context, config) {
      const options = config.options || {
        rootMargin: "0px",
        threshold: 1.0,
      }
      const callback = config.callback || function(entries, observer) {
        console.log("OOPS: Did you forget to pass an observer callback?")
      }
      const observer = new IntersectionObserver(callback, options)
      Array.from(config.nodes).forEach(function(n,i,a) {observer.observe(n)})

      const o = context.activeObservers.concat([observer])
      context.commit("activeObservers", o)
    },
    unregisterObservers(context) {
      context.activeObservers.forEach(function(io) {
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
      context.commit("previousOverflow", "hidden")
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo(position[0], position[1])
    },
    unlockScroll(context) {
      const {scrollPosition, previousOverflow} = context
      document.documentElement.style.overflow = previousOverflow
      window.scrollTo(scrollPosition[0], scrollPosition[1])
    },
  },
}

export default m
