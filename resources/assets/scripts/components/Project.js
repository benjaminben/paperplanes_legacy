import Vue                   from "vue"
import Project__Slideshow    from "./Project__Slideshow"
import Project__Gallery      from "./Project__Gallery"
import store                 from "../store"
import {siteUrl, animQuery}  from "../config"
import {masonrifyGallery}    from "../utils/projects"
import {
  initPhotoSwipeFromDOM,
} from "../helpers"

export default (root) => {
  // TEMP: Redundant with router.js BUT in case initial load...
  store.dispatch("ui/setTheme", 1)
  store.dispatch("ui/setTrans", true)
  store.dispatch("nav/setEscape", siteUrl + "/work")

  initPhotoSwipeFromDOM(".layout.gallery")


  function masonrifyGalleries() {
    Array.from(root.querySelectorAll(".layout.gallery")).forEach(g => {
      masonrifyGallery(g)
    })
  }
  masonrifyGalleries(root)
  const masonryListener = {
    type: "resize",
    target: window,
    fn: masonrifyGalleries,
  }

  store.dispatch("ui/registerEventListener", masonryListener)
  function clearHooks() {
    store.dispatch("ui/unregisterEventListener", masonryListener)
    window.removeEventListener("_routerEvent_leave", clearHooks)
  }
  window.addEventListener("_routerEvent_leave", clearHooks)

  var anims = Array.from(root.querySelectorAll(`${animQuery}`))
  // var firstObserve = false
  store.dispatch("ui/registerObserver", {
    nodes: anims,
    options: { rootMargin: "0px", threshold: 0.2, },
    callback: (entries, observer) => {
      var tops = entries.map(entry => {
        return entry.boundingClientRect.top
      }).sort(function(a,b) { return a < b }).filter(function(t,i,a) {
        if (a[i] !== a[i-1]) {return t}
      })
      var ct = 0
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // if (!firstObserve) {
            var ti = tops.indexOf(entry.boundingClientRect.top)
            ct = ti !== -1 ? ti : 0
          // }
          entry.target.className += " anim-active"
          entry.target.style.transitionDelay = 0.5*ct + "s"
          observer.unobserve(entry.target)
        }
      })
      // if (!firstObserve) {firstObserve = true}
    }
  })
}
