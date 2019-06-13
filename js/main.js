(function() {
  var doc = document.documentElement
  doc._data = {}
  doc._activeListeners = []
  doc._registerEventListener = function(type, target, fn) {
    target.addEventListener(type, fn)
    doc._activeListeners.push({type: type, target: target, fn: fn})
  }
  doc._unregisterEventListeners = function() {
    doc._activeListeners.forEach(function(l) {
      l.target.removeEventListener(l.type, l.fn)
    })
  }
})()
