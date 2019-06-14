(function() {
  var doc = document.documentElement
  var siteNav = document.getElementById( 'site-navigation' )
  var content = document.querySelector("#content.home .page")
  var close = document.querySelector("#content.home .close")
  close.onclick = function(e) {
    siteNav.setAttribute("data-theme", "dark")
    content.style.display = "none"
  }

  new Vue({
    el: "#content.home",
    data: {
      fade: 1,
      intro: true,
      runIntro: false,
      introExitDur: 2000,
      ui: doc._store.state.ui,
    },
    watch: {
      ui: {
        handler: function(val, oldVal) {
          if (val.loaded && !this.runIntro) {this.init()}
        },
        deep: true,
      }
    },
    mounted: function() {
      doc._registerEventListener("scroll", window, this.handleScroll)
      if (this.ui.loaded && !this.runIntro) {this.init()}
    },
    methods: {
      init: function() {
        _this = this
        _this.runIntro = true
        window.setTimeout(function() {
          _this.intro = false
        }, this.introExitDur)
      },
      handleScroll: function(e) {
        var amt = window.scrollY / (document.body.clientHeight - window.innerHeight)
        this.fade = (1 - amt).toFixed(2)
        doc._store.actions.nav.setTheme(amt)
        doc._store.actions.ui.setTheme(amt)
      },
      forceEnter: function(e) {
        window.scrollTo(0, document.body.clientHeight - window.innerHeight)
      },
    },
  })
})()
