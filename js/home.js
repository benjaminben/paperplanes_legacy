(function() {
  var siteNav = document.getElementById( 'site-navigation' )
  var content = document.querySelector("#content")
  var close = document.querySelector("#content .close")
  close.onclick = function(e) {
    siteNav.setAttribute("data-theme", "dark")
    content.style.display = "none"
  }
})()
