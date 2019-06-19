(function() {
  var doc = document.documentElement
  var tl = new TimelineMax({repeat: -1})
  var n = new Vue({
    el: "#loader",
    data: {
      shared: doc._store.state.ui,
      private: {
        animLength: 3000,
      },
    },
    methods: {
      cleanUp: function() {
        tl.repeat(0)
        tl.eventCallback("onComplete", function() {
          TweenMax.to("#loader", 0.5, {
            opacity: 0,
            onComplete: function() {
              doc._store.actions.ui.setLoaded()
              doc._store.actions.ui.unlockScroll()
            }
          })
        })
      }
    },
    mounted: function() {
      doc._store.actions.ui.lockScroll()
      window.addEventListener("load", this.cleanUp)
      if (document.readyState === "complete") {
        window.removeEventListener("load", this.cleanUp)
        this.cleanUp()
      }

      var sL1 = this.$refs.l1.getTotalLength()
      var sL2 = this.$refs.l2.getTotalLength()
      TweenLite.set(this.$refs.l1, {
        opacity: 1,
        autoRound: false,
        strokeDashoffset: sL1 + "px",
        strokeDasharray: sL1 + "px",
      })

      TweenLite.set(this.$refs.l2, {
        opacity: 1,
        autoRound: false,
        strokeDashoffset: -1*sL2 + "px",
        strokeDasharray: sL2 + "px",
      })

      tl.add(new TweenLite(this.$refs.l1, 0.75, {
        strokeDashoffset: "0px",
      }), 0)

      tl.add(new TweenLite(this.$refs.l2, 0.75, {
        strokeDashoffset: "0px",
      }), 0)

      tl.add(new TweenLite(this.$refs.l1, 0.75, {
        strokeDashoffset: -1*sL1 + "px",
        autoRound: false,
      }), 1.5)

      tl.add(new TweenLite(this.$refs.l2, 0.75, {
        strokeDashoffset: sL2 + "px",
        autoRound: false,
      }), 1.5)

      // tl.set({},{},3)
    }
  })
})()
