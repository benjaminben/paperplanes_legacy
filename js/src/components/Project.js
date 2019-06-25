import Vue from "vue"
import store from "../store"
import {siteUrl} from "../config"
import {
  initPhotoSwipeFromDOM,
} from "../helpers"

export default (root) => {
  console.log("No vue defined for Project")
  store.dispatch("ui/setTheme", 1)
  store.dispatch("nav/setEscape", siteUrl + "/work")
  initPhotoSwipeFromDOM(".layout.gallery")
}
