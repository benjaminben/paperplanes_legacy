(function() {
  var siteNav = document.getElementById( 'site-navigation' )
  var content = document.querySelector("#content.home .page")
  var close = document.querySelector("#content.home .close")
  close.onclick = function(e) {
    siteNav.setAttribute("data-theme", "dark")
    content.style.display = "none"
  }
})()
