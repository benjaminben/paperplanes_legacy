(function() {
  console.log("blurb")
  var doc = document.documentElement
  var n = new Vue({
    el: "#loader",
    data: doc._store.state.ui,
  })
})()
