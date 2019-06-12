(function() {
  var marquees =
  Array.from(document.querySelectorAll(".layout.marquee-video"))
    .map(function(l,i,a) {
      return new Vue({
        el: l
      })
    })

  var slideshows =
  Array.from(document.querySelectorAll(".layout.slideshow"))
    .map(function(l,i,a) {
      return new Vue({
        el: l,
        data: {
          active: 0,
        },
        methods: {
          navPrev: function() {
            var dest = this.active - 1
            if (dest < 0) { dest = this.$refs.items.childElementCount - 1 }
            this.active = dest
          },
          navNext: function() {
            var dest = this.active + 1
            if (dest >= this.$refs.items.childElementCount) { dest = 0 }
            this.active = dest
          },
        },
      })
    })
})()
