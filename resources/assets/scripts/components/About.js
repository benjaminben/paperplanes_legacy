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
        this.registerObserver({
          nodes: anims,
          options: { rootMargin: "0px", threshold: 0.2, },
          callback: (entries, observer) => {
            var ct = 0
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.className += " anim-active"
                entry.target.style.transitionDelay = 0.5*ct + "s"
                observer.unobserve(entry.target)
                if (!firstObserve) {ct += 1}
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
