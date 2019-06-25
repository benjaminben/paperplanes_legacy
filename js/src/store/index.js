import Vuex from "vuex"

import ui from "./ui"
import nav from "./nav"
import work from "./work"
import private from "./private"

const store = new Vuex.Store({
  modules: {
    ui,
    nav,
    work,
    private,
  }
})
