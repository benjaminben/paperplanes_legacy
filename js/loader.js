(function() {
  var doc = document.documentElement
  var tl = new TimelineMax({repeat: -1})
  tl.repeatDelay(1)
  var n = new Vue({
    el: "#loader",
    data: {
      shared: doc._state.ui,
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
              doc._actions.ui.setLoaded()
              doc._actions.ui.unlockScroll()
            }
          })
        })
      }
    },
    mounted: function() {
      doc._actions.ui.lockScroll()
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
        strokeDashoffset: sL1*3 + "px",
        strokeDasharray: sL1 + "px",
      })

      TweenLite.set(this.$refs.l2, {
        opacity: 1,
        autoRound: false,
        strokeDashoffset: sL2 + "px",
        strokeDasharray: sL2 + "px",
      })

      tl.add([
        new TweenLite(this.$refs.l1, 0.75, {
          strokeDashoffset: sL1*2 + "px",
          autoRound: false,
        }),
        new TweenLite(this.$refs.l2, 0.75, {
          strokeDashoffset: sL2*2 + "px",
          autoRound: false,
        })
      ], 0)

      tl.add([
        new TweenLite(this.$refs.l1, 0.75, {
          strokeDashoffset: sL1 + "px",
          autoRound: false,
        }),
        new TweenLite(this.$refs.l2, 0.75, {
          strokeDashoffset: sL2*3 + "px",
          autoRound: false,
        }),
      ], 1.5)

      // tl.set({},{},1)
    }
  })
})()
