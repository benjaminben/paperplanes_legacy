window.addEventListener('load', function() {
  Barba.Pjax.start()
  Barba.Prefetch.init()
  var lastElementClicked
  var nav = document.querySelector("#site-navigation")


  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });
  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */

      return new Promise(function(rs,rj) {
        window.setTimeout(rs, 1000)
      })
    },

    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var el = this.newContainer

      this.oldContainer.style.opacity = 0

      el.style.visibility = 'visible'

      nav.className += " exiting"


      window.setTimeout(function() {
        nav.className = nav.className.replace(/toggled|exiting/g, "")
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */
        _this.done()
      }, 500)
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
      return FadeTransition;
  };

})
