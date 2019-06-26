import Vue                   from "vue"
import Project__Slideshow    from "./Project__Slideshow"
import Project__Gallery      from "./Project__Gallery"
import store                 from "../store"
import {siteUrl, animQuery}  from "../config"
import {
  initPhotoSwipeFromDOM,
} from "../helpers"

export default (root) => {
  // TEMP: Redundant with router.js BUT in case initial load...
  store.dispatch("ui/setTheme", 1)
  store.dispatch("ui/setTrans", true)
  store.dispatch("nav/setEscape", siteUrl + "/work")

  initPhotoSwipeFromDOM(".layout.gallery")
  const masonrifyGalleries = () => {
    Array.from(root.querySelectorAll(".layout.gallery")).forEach(g => {
      masonrifyGallery(g)
    })
  }

  masonrifyGalleries(root)
  store.dispatch("ui/registerEventListener", {
    type: "resize",
    target: window,
    fn: masonrifyGalleries,
  })

  var anims = Array.from(root.querySelectorAll(animQuery))
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

function masonrifyGallery(root) {
  const compDistances = [0, 0]
  const items = Array.from(root.querySelectorAll(".item"))
  const em = parseFloat(getComputedStyle(root).fontSize)

  Promise.resolve().then(() => items.forEach(p => {
    p.style.transform = `translateY(0px)`
  })).then(() => {
    items.forEach((p,i,a) => {
      if (i < 2) { return }
      const currImg = p.children[0]
      const prevImg = a[i-2].children[0]
      const {top: currTop} = p.getBoundingClientRect()
      const prevBottom = a[i-2].getBoundingClientRect().top + prevImg.clientHeight
      const distance = currTop - prevBottom
      compDistances[i%2] += distance
      p.style.transform = `translateY(${-1 * (distance - em)}px)`
    })
  })
}
