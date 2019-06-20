(function() {
  var doc = document.documentElement
  var animQuery = "*[class^=anim-]:not(.anim-active), *[class*= anim-]:not(.anim-active)"
  var vm = new Vue({
    el: "#content.team",
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
        var anims = Array.from(this.$el.querySelectorAll(animQuery))
        var firstObserve = false
        doc._actions.ui.registerObserver(
          anims,
          { rootMargin: "0px", threshold: 0.2, },
          function(entries, observer) {
            var tops = entries.map(function(entry) {
              return entry.boundingClientRect.top
            }).sort(function(a,b) { return a < b }).filter(function(t,i,a) {
              if (a[i] !== a[i-1]) {return t}
            })
            var ct = 0
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                if (!firstObserve) {
                  var ti = tops.indexOf(entry.boundingClientRect.top)
                  ct = ti !== -1 ? ti : 0
                }
                entry.target.className += " anim-active"
                entry.target.style.transitionDelay = 0.5*ct + "s"
                observer.unobserve(entry.target)
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
    }
  })
})()
