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
      fade: 1
    },
    mounted: function() {
      doc._registerEventListener("scroll", window, this.handleScroll)
    },
    methods: {
      handleScroll: function(e) {
        var amt = window.scrollY / (document.body.clientHeight - window.innerHeight)
        this.fade = 1 - amt
      }
    },
  })
})()
