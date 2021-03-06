import Vue                        from "vue"
import { mapState, mapActions }   from "vuex"
import { TimelineMax, TweenLite } from "gsap"
import { animQuery }              from "../config"
import { initAnims }              from "../utils/anims"
import store                      from "../store"

export default (root) => {
  var siteNav = document.getElementById( 'site-navigation' )
  var content = root.querySelector(".page")
  var close = root.querySelector(".close")
  var introTl = new TimelineMax()

  var paddingTop
  var cDims

  return new Vue({
    store,
    el: root,
    data: {
      fade: 1,
      intro: true,
      ready: false,
      display: false,
    },
    computed: {
      ...mapState("ui", {
        runIntro: state => state.runIntro,
        loaded: state => state.loaded
      })
    },
    watch: {
      loaded: {
        handler(val, oldVal) {
          if (val && this.runIntro) {this.init()}
          if (val && this.display) {
            this.displayContent()
          }
        }
      },
      intro: {
        handler(val, oldVal) {
          if (!val && oldVal) { this.ready = true }
        }
      }
    },
    mounted() {
      if (this.runIntro) {
        this.intro = true
        TweenLite.set(this.$refs.introLogo, {opacity: 0})
      } else {
        this.intro = false
      }

      if (this.loaded) { this.init() }
    },
    methods: {
      ...mapActions("ui", [
        "registerEventListener",
        "registerObserver",
        "clearIntro",
      ]),
      init() {
        this.handleResize()
        this.handleScroll()
        this.registerEventListener({
          type: "scroll",
          target: window,
          fn: this.handleScroll
        })
        this.registerEventListener({
          type: "resize",
          target: window,
          fn: this.handleResize
        })
        if (this.runIntro) {
          introTl.add(new TweenLite(this.$refs.introLogo, 0.5, {opacity: 1}))
          introTl.add(new TweenLite(this.$refs.intro, 1, {
            opacity: 0,
            onComplete: () => {
              this.clearIntro()
              this.intro = false
              this.displayContent()
            }
          }), "+=2")
        } else {
          this.displayContent()
        }
      },
      displayContent() {
        // initAnims(this.$el)
        console.log("DONE")
        this.display = true
      },
      handleResize() {
        cDims = this.$refs.content.getBoundingClientRect()
        paddingTop = parseFloat(
          window.getComputedStyle(this.$refs.frame, null)
          .getPropertyValue('padding-top'))
      },
      handleScroll(e) {
        var totalHeight = cDims.height + paddingTop
        var overflow = Math.max(totalHeight - window.innerHeight, 0)
        var comp = window.scrollY - overflow
        var amt = Math.max(0, comp) / (document.body.clientHeight - window.innerHeight - comp)
        if (amt === Infinity || amt < 0) {amt = 1}
        this.fade = (1 - amt).toFixed(2)
      },
      forceEnter(e) {
        scrollToY(document.body.clientHeight - window.innerHeight, 50, 'easeInOutQuint')
      },
    },
  })
}

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// TODO: Extract this
// main function
function scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.pageYOffset,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var PI_D2 = Math.PI / 2,
        easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}
