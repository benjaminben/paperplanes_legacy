(function() {
  var doc = document.documentElement
  var animQuery = "*[class^=anim-]:not(.anim-active), *[class*= anim-]:not(.anim-active)"
  var siteNav = document.getElementById( 'site-navigation' )
  var content = document.querySelector("#content.home .page")
  var close = document.querySelector("#content.home .close")
  var introTl = new TimelineMax()

  var paddingTop
  var cDims

  new Vue({
    el: "#content.home",
    data: {
      fade: 1,
      intro: true,
      ready: false,
      display: false,
      ui: doc._state.ui,
    },
    watch: {
      ui: {
        handler: function(val, oldVal) {
          if (val.loaded && this.ui.runIntro) {this.init()}
          if (val.loaded && this.display) {this.displayContent()}
        },
        deep: true,
      },
      intro: {
        handler: function(val, oldVal) {
          if (!val && oldVal) { this.ready = true }
        }
      }
    },
    mounted: function() {
      if (this.ui.runIntro) {
        this.intro = true
        TweenLite.set(this.$refs.introLogo, {opacity: 0})
      } else {
        this.intro = false
      }

      if (this.ui.loaded) {
        this.init()
      }
    },
    methods: {
      init: function() {
        var _this = this
        _this.handleResize()
        _this.handleScroll()
        doc._actions.ui.registerEventListener("scroll", window, _this.handleScroll)
        doc._actions.ui.registerEventListener("resize", window, _this.handleResize)
        if (this.ui.runIntro) {
          introTl.add(new TweenLite(this.$refs.introLogo, 0.5, {opacity: 1}))
          introTl.add(new TweenLite(this.$refs.intro, 1, {
            opacity: 0,
            onComplete: function() {
              doc._actions.ui.clearIntro()
              _this.intro = false
              _this.displayContent()
            }
          }), "+=2")
        } else {
          this.displayContent()
        }
      },
      displayContent: function() {
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
        _this.display = true
      },
      handleResize: function() {
        cDims = this.$refs.content.getBoundingClientRect()
        paddingTop = parseFloat(
          window.getComputedStyle(this.$refs.frame, null)
          .getPropertyValue('padding-top'))
      },
      handleScroll: function(e) {
        var totalHeight = cDims.height + paddingTop
        var overflow = Math.max(totalHeight - window.innerHeight, 0)
        var comp = window.scrollY - overflow
        var amt = Math.max(0, comp) / (document.body.clientHeight - window.innerHeight - comp)
        if (amt === Infinity || amt < 0) {amt = 1}
        this.fade = (1 - amt).toFixed(2)
      },
      forceEnter: function(e) {
        scrollToY(document.body.clientHeight - window.innerHeight, 100, 'easeInOutQuint')
      },
    },
  })
})()

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
