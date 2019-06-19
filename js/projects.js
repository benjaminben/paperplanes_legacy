(function() {
  var doc = document.documentElement
  var vm = new Vue({
    el: "#content.work",
    data: {
      gridStyle: {
        gridTemplateColumns: "1fr 1fr 1fr"
      },
      filter: null,
      filterOpen: false,
      shared: {
        ui: doc._store.state.ui
      }
    },
    methods: {
      setCols: function(e) {
        this.gridStyle.gridTemplateColumns = e.target.getAttribute("data-cols")
      }
    }
  })
})()
