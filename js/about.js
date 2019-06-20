(function() {
  var doc = document.documentElement
  var vm = new Vue({
    el: "#content.about",
    data: {
      ui: doc._state.ui,
      initted: false,
    },
    watch: {
      ui: {
        handler: function(val, oldVal) {
          if (val.loaded && !this.initted) {
            this.init()
          }
        },
        deep: true,
      },
    },
    methods: {
      init: function() {
        var _this = this
        var anims = Array.from(this.$el.querySelectorAll(".anim"))
        var firstObserve = false
        doc._actions.ui.registerObserver(
          anims,
          { rootMargin: "0px", threshold: 0.2, },
          function(entries, observer) {
            var ct = 0
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.setAttribute("data-observed", true)
                entry.target.style.transitionDelay = 0.5*ct + "s"
                observer.unobserve(entry.target)
                if (!firstObserve) {ct += 1}
              }
            })
            if (!firstObserve) {firstObserve = true}
          }
        )
        _this.initted = true
      },
    },
    mounted: function() {
      if (this.ui.loaded) { this.init() }
    },
  })
})()
