const m = {
  namespaced: true,
  state: {
    gridStyle: {
      gridTemplateColumns: "1fr 1fr 1fr"
    },
    filter: null,
    filterOpen: false,
    scroll: [0,0],
  },
  mutations: {
    gridStyle(state, s) {
      state.gridStyle = s
    },
    filter(state, value) {
      state.filter = value
    },
    filterOpen(state, value) {
      state.filterOpen = value
    },
    scroll(state, vals=[0,0]) {
      state.scroll = vals
    },
  },
  actions: {
    setCols(context, value) {
      context.commit("gridStyle", {
        ...context.gridStyle,
        gridTemplateColumns: value
      })
    },
    setFilter(context, value) {
      context.commit("filter", value)
    },
    setFilterOpen(context, value) {
      context.commit("filterOpen", value)
    },
    setScroll(value) {
      context.commit("scroll", value)
    },
  },
}

export default m
