(function() {
  var doc = document.documentElement
  var vm = new Vue({
    el: "#content.work",
    data: {
      shared: {
        ui: doc._store.state.ui,
        work: doc._store.state.work
      }
    },
    mounted: function() {
      window.scrollTo(this.shared.work.scroll[0], this.shared.work.scroll[1])
    },
    methods: {
      setCols: function(e) {
        doc._store.actions.work.setCols(e.target.getAttribute("data-cols"))
      },
      setFilterOpen: function(v) {
        doc._store.actions.work.setFilterOpen(v)
      },
      setFilter: function(v) {
        doc._store.actions.work.setFilter(v)
      },
    }
  })
})()
