import Vue                   from "vue"
import Project__Slideshow    from "./Project__Slideshow"
import Project__Gallery      from "./Project__Gallery"
import store                 from "../store"
import {siteUrl, animQuery}  from "../config"
import {masonrifyGallery}    from "../utils/projects"
import {initAnims}           from "../utils/anims"
import {
  initPhotoSwipeFromDOM,
} from "../helpers"

export default (root) => {
  // TEMP: Redundant with router.js BUT in case initial load...
  console.log(store.getters["ui/loaded"])

  store.dispatch("ui/setTheme", 1)
  store.dispatch("ui/setTrans", true)
  store.dispatch("nav/setEscape", siteUrl + "/work")

  initPhotoSwipeFromDOM(".layout.gallery")
  initAnims(root)


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
}
