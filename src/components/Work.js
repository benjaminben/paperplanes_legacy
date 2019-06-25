import Vue from "vue"
import { mapState, mapActions } from "vuex"
import store from "../store"

export default (root) => {
  return new Vue({
    store,
    el: root,
    data: {},
    computed: {
      ...mapState({
        trans: state => state.ui.trans,
        filter: state => state.work.filter,
        filterOpen: state => state.work.filterOpen,
        gridStyle: state => state.work.gridStyle,
      })
    },
    mounted: function() {
      // TODO: Should actually be doing this in component based on trans flag(?)
      // window.scrollTo(this.shared.work.scroll[0], this.shared.work.scroll[1])
    },
    methods: {
      ...mapActions("work", {
        dispatchCols: "setCols",
        setFilterOpen: "setFilterOpen",
        setFilter: "setFilter",
      }),
      setCols: function(e) {
        this.dispatchCols(e.currentTarget.getAttribute("data-cols"))
      },
    }
  })
}
