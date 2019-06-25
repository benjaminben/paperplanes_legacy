const initTheme = document.body.getAttribute("data-theme") === "dark" ? 1 : 0
const initSlug = document.body.getAttribute("data-slug")

const initState = {
  
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

export default initState
