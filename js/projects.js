(function() {
  var vm = new Vue({
    el: "#content.work",
    data: {
      gridStyle: {
        gridTemplateColumns: "1fr 1fr 1fr"
      },
      filter: null,
      filterOpen: false,
    },
    methods: {
      setCols: function(e) {
        this.gridStyle.gridTemplateColumns = e.target.getAttribute("data-cols")
      }
    }
  })
})()
