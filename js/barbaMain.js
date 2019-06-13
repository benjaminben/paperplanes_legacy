window.addEventListener('load', function() {
  Barba.Pjax.start()
  Barba.Prefetch.init()
  var lastElementClicked
  var nav = document.querySelector("#site-navigation")
  var doc = document.documentElement

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });
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
      return MenuTransition;
  };

})
