(function() {
  var marquees =
  Array.from(document.querySelectorAll(".layout.marquee-video"))
    .map(function(l,i,a) {
      return new Vue({
        el: l,
        data: {
          player: null,
          playing: false,
          cover: true,
        },
        watch: {
          playing: function(val, oldVal) {
            if (val && !oldVal) {
              this.cover = false
              this.player.play()
            }
          },
        },
        mounted: function() {
          this.player = new Vimeo.Player("vimeo_" + l.querySelector(".embed").getAttribute("data-vimeo-id"))
          var playBtn = l.querySelector(".ctrl .play")
          // console.log(playBtn)
          // playBtn.addEventListener("click", function() {
          //   console.log("play")
          // })
          this.player.on("play", function() {
            console.log("blug")
          })
        },
        methods: {
          handlePlay: function(e) {
            this.playing = true
          }
        },
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
