import Vue                      from "vue"
import { mapState, mapActions } from "vuex"
import { animQuery }            from "../config"
import { initAnims }            from "../utils/anims"
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
        initAnims(this.$el)
      },
    },
    mounted() {
      if (this.loaded) { this.init() }
    },
  })
}
