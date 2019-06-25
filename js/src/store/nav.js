const initSlug = document.body.getAttribute("data-slug")

const m = {
  namespaced: true,
  state: {
    slug: initSlug,
    open: false,
    exiting: false,
    escape: null,
    trans: false,
  },
  mutations: {
    escape(state, value) { state.escape = value },
    trans(state, value) { state.trans = value },
    open(state, value) { state.open = value },
    slug(state, value) { state.slug = value },
    theme(state, value) { state.theme = value },
    exiting(state, value) { state.exiting = value },
  },
  actions: {
    setEscape(context, value) {
      context.commit("escape", value)
    },
    setSlug(context, value) {
      context.commit("slug", value)
    },
    setNavOpen(context, value) {
      context.commit("open", true)
      context.commit("theme", 1)
    },
    setNavClosed(context) {
      context.commit("exiting", true)

      return new Promise((rs, rj) => {
        window.setTimeout(() => {
          context.commit("open", false)
          context.commit("exiting", false)
          rs()
        }, 500)
      })
    },
  },
}

export default m
