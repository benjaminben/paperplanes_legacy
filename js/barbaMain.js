window.addEventListener('load', function() {
  Barba.Pjax.start()
  Barba.Prefetch.init()
  var lastElementClicked
  var nav = document.querySelector("#site-navigation")
  var menu = document.querySelector("#primary-menu")
  var doc = document.documentElement
  var siteUrl = document.body.getAttribute("data-site-url")

  Barba.Dispatcher.on('linkClicked', function(el) { lastElementClicked = el })

  var DefaultTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading]).then(this.transition.bind(this))
    },
    transition: function() {
      var _this = this;
      var el = this.newContainer
      nav.setAttribute("data-theme", el.querySelector("#content").getAttribute("data-theme"))
      _this.done()
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
        .then(this.menuOut.bind(this));
    },

    menuOut: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var el = this.newContainer
      doc._data["menu-theme"] = el.querySelector("#content").getAttribute("data-theme")

      this.oldContainer.style.display = "none"
      el.style.visibility = "visible"
      nav.className += " exiting"
      nav._toggleClosed().then(function() {
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
      return nav.className.match("toggled") ? MenuTransition : DefaultTransition
  };

  // TODO: need to adjust scroll

  Barba.Dispatcher.on("newPageReady", function() {
    if (window.location.href == siteUrl) {
      que_script(siteUrl + "/wp-content/themes/paperplanes/js/home.js")
    }
    if (window.location.href == siteUrl+"/work/") {
      que_script(siteUrl + "/wp-content/themes/paperplanes/js/projects.js")
    }
    if (lastElementClicked.className === "project") {
      que_script(siteUrl + "/wp-content/themes/paperplanes/js/project.js")
    }
  })

  function que_script(scriptSrc) {
    Array.from(document.querySelectorAll("body script")).forEach(function(s) {
      if (s.src == scriptSrc) {
        document.body.removeChild(s)
      }
    });
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = scriptSrc;
    document.body.appendChild(newScript);
  }

})
