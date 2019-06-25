import Vue from "vue"
import Player from "@vimeo/player"

export default (root) => {
  return new Vue({
    el: root,
    data: {
      player: null,
      played: false,
      loading: false,
      cover: true,
    },
    watch: {
      played: function(val, oldVal) {
        if (val && !oldVal) {
          this.cover = false
        }
      },
    },
    mounted: function() {
      this.player = new Player("vimeo_" + this.$el.querySelector(".embed").getAttribute("data-vimeo-id"))
      this.player.on("play", () => {
        TweenLite.to(this.$refs.cover, 0.2, {
          opacity: 0,
          scale: 1.1,
          onComplete: () => {
            this.played = true
          }
        })
      })
    },
    methods: {
      handlePlay(e) {
        this.player.play()
        this.loading = true
      }
    },
  })
}
