(function() {
  var doc = document.documentElement
  var vm = new Vue({
    el: "#content.work",
    data: {
      shared: {
        ui: doc._state.ui,
        work: doc._state.work
      }
    },
    mounted: function() {
      // TODO: Should actually be doing this in component based on trans flag(?)
      // window.scrollTo(this.shared.work.scroll[0], this.shared.work.scroll[1])
    },
    methods: {
      setCols: function(e) {
        doc._actions.work.setCols(e.currentTarget.getAttribute("data-cols"))
      },
      setFilterOpen: function(v) {
        doc._actions.work.setFilterOpen(v)
      },
      setFilter: function(v) {
        doc._actions.work.setFilter(v)
      },
    }
  })
})()
