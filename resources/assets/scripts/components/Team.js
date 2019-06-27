import Vue                      from "vue"
import { mapState, mapActions } from "vuex"
import { animQuery }            from "../config"
import store                    from "../store"

export default (root) => {
  return new Vue({
    store,
    el: root,
    data: {
      initted: false,
    },
    computed: {
      ...mapState("ui", {
        loaded: state => state.loaded,
      })
    },
    watch: {
      loaded: {
        handler(val, oldVal) {
          if (val && !this.initted) { this.init() }
        },
      },
    },
    methods: {
      ...mapActions("ui", [
        "registerObserver",
      ]),
      init() {
        var anims = Array.from(this.$el.querySelectorAll(animQuery))
        var firstObserve = false
        const dly = 0;
        this.registerObserver({
          nodes: anims,
          options: { threshold: 0 },
          callback: (entries, observer) => {
            var tops = entries.map(entry => {
              return entry.boundingClientRect.top
            }).sort(function(a,b) { return a < b }).filter((t,i,a) => {
              if (a[i] !== a[i-1]) {return t}
            })
            var ct = 0
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                if (!firstObserve) {
                  var ti = tops.indexOf(entry.boundingClientRect.top)
                  ct = ti !== -1 ? ti : 0
                }
                var td = `${dly*ct}s`
                console.log(td)
                entry.target.className += " anim-active"
                entry.target.style.transitionDelay = td
                observer.unobserve(entry.target)
              }
            })
            if (!firstObserve) {firstObserve = true}
          }
        })
        this.initted = true
      },
    },
    mounted() {
      if (this.loaded) { this.init() }
    },
  })
}
