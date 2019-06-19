window.addEventListener('load', function() {
  Barba.Pjax.start()
  Barba.Prefetch.init()
  var lastElementClicked
  var doc = document.documentElement
  var nav = document.querySelector("#site-navigation")
  var menu = document.querySelector("#primary-menu")
  var siteUrl = document.body.getAttribute("data-site-url")

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el
    doc._store.actions.nav.setSlug(el.getAttribute("data-dest"))
  })

  var DefaultTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading]).then(this.transition.bind(this))
    },
    transition: function() {
      var _this = this;
      window.scrollTo(0,0)
      doc._unregisterEventListeners()
      var el = this.newContainer
      var theme = el.querySelector("#content").getAttribute("data-theme") == "dark" ? 1 : 0
      doc._store.actions.ui.setTheme(theme)
      doc._store.actions.nav.setTheme(theme)
      _this.done()
    }
  })

  var ProjectEnterTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading])
        .then(this.overIn.bind(this));
    },
    overIn: function() {
      var _this = this
      var el = _this.newContainer
      _this.newContainer.style.visibility = "visible"
      _this.newContainer.style.display = "none"
      var tl = new TimelineMax()
      var wipe = document.getElementById("pageWipe")
      // document.body.className += " trans"
      // console.log(window.getComputedStyle(_this.newContainer))
      wipe.style.transform = "translateY(0)"
      wipe.style.transition = "all 0.5s ease"
      window.setTimeout(function() {
        doc._store.actions.ui.setTheme(0)
        wipe.style.opacity = 0
        window.setTimeout(function() {
          wipe.style.transition = ""
          wipe.style.transform = "translateY(-100%)"
        }, 500)
        // document.body.className = document.body.className.replace(" trans", "")
        _this.oldContainer.style.display = "none"
        _this.newContainer.style.display = "block"
      }, 500)
    }
  })

  var ProjectExitTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading])
        .then(this.overOut.bind(this));
    },
    overOut: function() {
      var _this = this
      var el = _this.newContainer
      doc._store.actions.ui.setTheme(0)
      var wipe = document.getElementById("pageWipe")
    }
  })

  var MenuTransition = Barba.BaseTransition.extend({
    start: function() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading])
        .then(this.menuOut.bind(this))
    },

    menuOut: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this
      var el = this.newContainer
      doc._store.actions.ui.setTheme(
        el.querySelector("#content").getAttribute("data-theme") == "dark" ? 1 : 0
      )
      doc._data['scroll-position'] = [0,0]

      this.oldContainer.style.display = "none"
      el.style.visibility = "visible"
      doc._unregisterEventListeners()
      doc._store.actions.nav.setNavClosed().then(function() {
        _this.done()
      })
    }
  });
  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function() {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */
      return nav.className.match("toggled")
        ? MenuTransition
        : lastElementClicked && lastElementClicked.className === "project"
          ? ProjectEnterTransition
          : DefaultTransition
  };

  // TODO: need to adjust scroll

  Barba.Dispatcher.on("newPageReady", function() {
    // TODO: this whole function is jank...
    var href = window.location.href.replace(/\/+$/, "")
    if (href == siteUrl) {
      que_script(siteUrl + "/wp-content/themes/paperplanes/js/home.js")
    }
    if (href == siteUrl+"/work") {
      que_script(siteUrl + "/wp-content/themes/paperplanes/js/projects.js")
    }
    if ( lastElementClicked.className === "project" ||
         lastElementClicked.parentNode.className === "post-navigation" ) {
      que_script("https://player.vimeo.com/api/player.js", function() {
        que_script(siteUrl + "/wp-content/themes/paperplanes/js/project.js")
      })
      doc._store.actions.nav.setSlug("work")
    }
  })

  function que_script(scriptSrc, onLoad) {
    Array.from(document.querySelectorAll("body script")).forEach(function(s) {
      if (s.src == scriptSrc) {
        document.body.removeChild(s)
      }
    })
    var newScript = document.createElement('script')
    newScript.type = 'text/javascript'
    newScript.addEventListener("load", onLoad)
    newScript.src = scriptSrc
    document.body.appendChild(newScript)
  }

})
