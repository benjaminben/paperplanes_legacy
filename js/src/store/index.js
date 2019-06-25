import Vue from "vue"
import Vuex from "vuex"
import logger from "vuex/dist/logger"

import ui from "./ui"
import nav from "./nav"
import work from "./work"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    nav,
    work,
  },
  plugins: [logger()],
})
